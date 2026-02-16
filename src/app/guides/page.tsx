
import Link from 'next/link';
import { getAllGuides } from '@/lib/mdx';

export default async function GuideIndexPage() {
    const guides = await getAllGuides();
    const guidesByCategory = guides.reduce((acc, guide) => {
        const category = guide.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(guide);
        return acc;
    }, {} as Record<string, typeof guides>);

    return (
        <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold mb-2">한국어 기술 가이드</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                실무 중심의 한국어 기술 문서 모음입니다. 원하는 카테고리를 선택하세요.
            </p>
            <hr className="border-gray-200 dark:border-gray-800 mb-8" />

            {Object.entries(guidesByCategory).map(([category, categoryGuides]) => (
                <section key={category} className="mb-10">
                    <h2 className="text-lg font-semibold capitalize mb-3 not-prose">{category}</h2>
                    <ul className="not-prose space-y-2">
                        {categoryGuides.map((guide) => (
                            <li key={`${guide.category}/${guide.slug}`}>
                                <Link
                                    href={`/guides/${guide.category}/${guide.slug}`}
                                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all"
                                >
                                    <h3 className="font-medium text-base mb-1">{guide.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{guide.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            {Object.keys(guidesByCategory).length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    아직 등록된 가이드가 없습니다.
                </div>
            )}
        </article>
    );
}
