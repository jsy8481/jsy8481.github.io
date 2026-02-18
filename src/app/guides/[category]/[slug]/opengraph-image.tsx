import { ImageResponse } from 'next/og';
import { getGuideBySlug, getAllGuides } from '@/lib/mdx';

// IMPORTANT: force Node.js runtime because we use filesystem (fs) in getGuideBySlug
export const runtime = 'nodejs';

export const alt = 'Guide Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generate static params for SSG
export async function generateStaticParams() {
    const guides = await getAllGuides();
    return guides.map((guide) => ({
        category: guide.category,
        slug: guide.slug,
    }));
}

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const guide = await getGuideBySlug(category, slug);

    // Font Loading
    const fontData = await fetch(
        new URL('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Default fallback
    const title = guide?.meta.title || '한국어 기술 가이드';
    const date = guide?.meta.date
        ? new Date(guide.meta.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';
    const categoryName = category.toUpperCase();

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    padding: '80px',
                    justifyContent: 'space-between',
                    border: '24px solid #0070F3', // Brand Color Border
                    boxSizing: 'border-box',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {/* Category Capsule */}
                    <div
                        style={{
                            display: 'flex',
                            backgroundColor: '#eff6ff', // blue-50
                            color: '#0070F3',
                            padding: '12px 30px',
                            borderRadius: '50px',
                            fontSize: 32,
                            fontWeight: 700,
                            marginBottom: '40px',
                            // width: 'fit-content', // Unsupported in satori
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {categoryName}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: '#111',
                            lineHeight: 1.2,
                            wordBreak: 'keep-all',
                            fontFamily: 'Pretendard',
                        }}
                    >
                        {title}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    {/* Date */}
                    <div
                        style={{
                            fontSize: 36,
                            color: '#666',
                            fontWeight: 500,
                            fontFamily: 'Pretendard',
                        }}
                    >
                        {date}
                    </div>

                    {/* Branding */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#0070F3',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '20px',
                            }}
                        >
                            <div style={{ color: 'white', fontWeight: 900, fontSize: 34, marginTop: '-5px', fontFamily: 'Pretendard' }}>KG</div>
                        </div>
                        <div style={{ fontSize: 40, fontWeight: 800, color: '#0070F3', fontFamily: 'Pretendard' }}>
                            한국어 기술 가이드
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Pretendard',
                    data: fontData,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}
