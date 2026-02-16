
import Image from 'next/image';

export default function PortfolioPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Portfolio</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    안녕하세요, NestJS와 Next.js로 서비스를 만드는 개발자 Swim입니다.
                    효율적이고 확장 가능한 백엔드 시스템과 사용자 친화적인 프론트엔드 인터페이스 구축에 관심이 많습니다.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6">Projects</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                            Project Screenshot
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">NestJS Practical Guide</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                NestJS, Drizzle ORM, Zod를 활용한 실무 가이드 및 기술 블로그입니다.
                            </p>
                            <div className="flex gap-2">
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">NestJS</span>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">GitHub Pages</span>
                            </div>
                        </div>
                    </div>

                    {/* Add more projects here */}
                </div>
            </section>
        </div>
    );
}
