
import { getAllGuides } from '@/lib/mdx';
import GuideSidebar from '@/components/GuideSidebar';

export default async function GuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const guides = await getAllGuides();
    const guidesByCategory = guides.reduce((acc, guide) => {
        const category = guide.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(guide);
        return acc;
    }, {} as Record<string, typeof guides>);

    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-4 py-8">
            <GuideSidebar guidesByCategory={guidesByCategory} />
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}
