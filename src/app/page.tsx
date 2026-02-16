
import Link from "next/link";
import { getAllGuides } from "@/lib/mdx";

const CATEGORY_INFO: Record<string, { label: string; icon: string; color: string }> = {
  nestjs: { label: "NestJS", icon: "🏗️", color: "from-red-500 to-pink-500" },
  drizzle: { label: "Drizzle ORM", icon: "🗄️", color: "from-green-500 to-emerald-500" },
  jotai: { label: "Jotai", icon: "⚛️", color: "from-purple-500 to-violet-500" },
  "tanstack-query": { label: "TanStack Query", icon: "🔄", color: "from-orange-500 to-amber-500" },
};

export default async function Home() {
  const guides = await getAllGuides();
  const categories = [...new Set(guides.map((g) => g.category))];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
          한국어 기술 가이드
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          NestJS, Drizzle, Jotai, TanStack Query 등 다양한 기술을 다룹니다.
          초보자가 읽고, 실제 프로젝트 적용이 가능할 정도로 상세한 가이드를 목표로 합니다.
        </p>
        <Link
          href="/guides"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          가이드 보기
        </Link>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const info = CATEGORY_INFO[cat] || { label: cat, icon: "📄", color: "from-gray-500 to-gray-600" };
            const count = guides.filter((g) => g.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/guides/${cat}/${guides.find((g) => g.category === cat)?.slug}`}
                className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{info.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                    {info.label}
                  </h3>
                  <p className="text-sm text-gray-500">{count}개의 가이드</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
