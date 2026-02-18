import { ImageResponse } from 'next/og';

// Route segment config
// export const runtime = 'edge'; // Removed to avoid conflict with force-static
export const dynamic = 'force-static'; // Fix for output: export

// Image metadata
export const alt = '한국어 기술 가이드';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    // Font loading
    const fontData = await fetch(
        new URL('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#0070F3',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '300px',
                        height: '300px',
                        background: 'white',
                        borderRadius: '60px',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 160,
                            fontWeight: 900,
                            color: '#0070F3',
                            letterSpacing: '-10px',
                            fontFamily: 'Pretendard',
                            lineHeight: 1,
                            marginTop: '-20px', // Visual center adjustment
                            marginLeft: '-10px',
                        }}
                    >
                        KG
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-2px',
                        fontFamily: 'Pretendard',
                    }}
                >
                    한국어 기술 가이드
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
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
