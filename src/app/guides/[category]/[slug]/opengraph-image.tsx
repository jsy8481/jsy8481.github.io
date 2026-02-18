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
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eef2ff', // Light Blue-Gray Background
                }}
            >
                {/* Floating Card */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '1080px',
                        height: '510px',
                        backgroundColor: 'white',
                        borderRadius: '40px',
                        overflow: 'hidden', // Clip corners
                        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Top Section: Blue Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            backgroundColor: '#0070F3',
                            width: '100%',
                            height: '65%',
                            padding: '50px 70px',
                        }}
                    >
                        {/* Category Capsule */}
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                color: '#0070F3',
                                padding: '10px 24px',
                                borderRadius: '50px',
                                fontSize: 28,
                                fontWeight: 700,
                                marginBottom: '24px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Pretendard',
                            }}
                        >
                            {categoryName}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: 900,
                                color: 'white',
                                lineHeight: 1.15,
                                wordBreak: 'keep-all',
                                fontFamily: 'Pretendard',
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    {/* Bottom Section: White Footer */}
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '35%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 70px',
                        }}
                    >
                        {/* Date */}
                        <div
                            style={{
                                fontSize: 32,
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
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: '#0070F3',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '14px',
                                }}
                            >
                                <div style={{ color: 'white', fontWeight: 900, fontSize: 26, marginTop: '-3px', fontFamily: 'Pretendard' }}>KG</div>
                            </div>
                            <div style={{ fontSize: 30, fontWeight: 800, color: '#0070F3', fontFamily: 'Pretendard' }}>
                                한국어 기술 가이드
                            </div>
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
