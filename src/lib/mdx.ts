import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const contentDir = path.join(process.cwd(), 'content');

export interface GuideMeta {
    category: string;
    slug: string;
    title: string;
    description: string;
    date: string;
}

export interface GuidePost {
    meta: GuideMeta;
    content: React.ReactNode;
}

const prettyCodeOptions = {
    theme: {
        dark: 'github-dark',
        light: 'github-light',
    },
    keepBackground: true,
};

export async function getGuideBySlug(category: string, slug: string): Promise<GuidePost | undefined> {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(contentDir, category, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<{ title: string; description: string; date: string }>({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
        },
    });

    return {
        meta: {
            category,
            slug: realSlug,
            title: frontmatter.title,
            description: frontmatter.description,
            date: frontmatter.date,
        },
        content,
    };
}

export async function getAllGuides(): Promise<GuideMeta[]> {
    if (!fs.existsSync(contentDir)) return [];

    const categories = fs.readdirSync(contentDir).filter(file =>
        fs.statSync(path.join(contentDir, file)).isDirectory()
    );

    const posts: GuideMeta[] = [];

    for (const category of categories) {
        const categoryPath = path.join(contentDir, category);
        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (!file.endsWith('.mdx')) continue;

            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            posts.push({
                category,
                slug: file.replace(/\.mdx$/, ''),
                title: data.title,
                description: data.description,
                date: data.date,
            });
        }
    }

    return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}
