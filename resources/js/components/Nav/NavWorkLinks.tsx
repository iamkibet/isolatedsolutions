import { Link } from '@inertiajs/react';

export default function NavWorkLinks() {
    return (
        <>
            <Link href={route('work.index')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Our Work</h3>
                <p className="text-sm text-gray-600">Featured projects and solutions</p>
            </Link>
            <Link href={route('work.portfolio')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Portfolio</h3>
                <p className="text-sm text-gray-600">Browse our success stories</p>
            </Link>
            <Link href={route('work.case-studies')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Case Studies</h3>
                <p className="text-sm text-gray-600">Detailed project insights</p>
            </Link>
        </>
    );
}
