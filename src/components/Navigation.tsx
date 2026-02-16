
import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="border-b p-4 mb-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    한국어 기술 가이드
                </Link>
                <div className="space-x-4">
                    <Link href="/guides" className="hover:text-blue-500">
                        가이드
                    </Link>
                </div>
            </div>
        </nav>
    );
}
