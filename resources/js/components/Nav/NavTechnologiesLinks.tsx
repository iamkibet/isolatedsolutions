import { Link } from '@inertiajs/react';

export default function NavTechnologiesLinks() {
    return (
        <>
            <Link href={route('technologies.mobile')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Mobile</h3>
                <p className="text-sm text-gray-600">Native and cross-platform solutions</p>
            </Link>
            <Link href={route('technologies.cloud')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Cloud</h3>
                <p className="text-sm text-gray-600">Scalable cloud infrastructure</p>
            </Link>
            <Link href={route('technologies.frontend')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Frontend</h3>
                <p className="text-sm text-gray-600">Modern web interfaces</p>
            </Link>
            <Link href={route('technologies.backend')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Backend</h3>
                <p className="text-sm text-gray-600">Robust server solutions</p>
            </Link>
        </>
    );
}
