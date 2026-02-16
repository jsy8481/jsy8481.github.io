'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border/60 bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-14 px-6">
                <Link
                    href="/"
                    className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-indigo-500 transition-all"
                >
                    📘 한국어 기술 가이드
                </Link>

                <div className="flex items-center gap-1">
                    <Link
                        href="/guides"
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                            ${isActive('/guides')
                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }
                        `}
                    >
                        가이드
                    </Link>
                </div>
            </div>
        </nav>
    );
}
