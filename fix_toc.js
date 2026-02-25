const fs = require('fs');
const path = require('path');
// github-slugger is a dependency of rehype-slug
const GithubSlugger = require('github-slugger');

const dir = path.join(__dirname, 'content/nestjs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Let's manually replace the TOC links based on what github-slugger generates for the headings
    const slugger = new GithubSlugger();

    // We need to find the 목차 section and replace the links
    const tocRegex = /## 📋 목차\n([\s\S]*?)\n---/m;
    const match = content.match(tocRegex);

    if (match) {
        let tocContent = match[1];

        // We will find all lines like `- [📌 이 문서를 읽기 전에](#이-문서를-읽기-전에)`
        // And we need to extract the text "📌 이 문서를 읽기 전에"
        // Then generate the slug for it.
        tocContent = tocContent.replace(/- \[([^\]]+)\]\(([^)]+)\)/g, (fullMatch, text, oldLink) => {
            // github-slugger needs fresh instance or reset to reset suffix counts?
            // actually github-slugger keeps state for `-1`, `-2`.
            // We shouldn't use a global state unless we process the whole file, but TOC usually has unique names.
            // Let's just create a new slugger for each string to simulate what the actual document parser will do for the first occurrence.
            const tempSlugger = new GithubSlugger();

            // Next.js / rehype-slug strips emojis, sometimes leaves trailing hyphens. Let's see what slugger generates.
            // Wait, standard `rehype-slug` uses `github-slugger`.
            let newSlug = tempSlugger.slug(text);

            return `- [${text}](#${newSlug})`;
        });

        content = content.replace(tocRegex, `## 📋 목차\n${tocContent}\n---`);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Processed ${file}, fixed TOC links using github-slugger.`);
    }
}
