
import { getAllGuides, getGuideBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import AdBanner from '@/components/AdBanner';

export async function generateStaticParams() {
    const guides = await getAllGuides();
    return guides.map((guide) => ({
        category: guide.category,
        slug: guide.slug,
    }));
}

export default async function GuidePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const guide = await getGuideBySlug(category, slug);

    if (!guide) {
        notFound();
    }

    return (
        <article className="prose dark:prose-invert max-w-none">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight lg:text-4xl leading-tight lg:leading-snug">
                {guide.meta.title}
            </h1>
            <div className="text-gray-500 mb-6 text-right text-sm">
                {new Date(guide.meta.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} 수정됨
            </div>
            {guide.meta.description && (
                <div className="not-prose mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">📋 개요</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{guide.meta.description}</p>
                </div>
            )}
            <div>{guide.content}</div>
            <div className="mt-12">
                <AdBanner />
            </div>
        </article>
    );
}
