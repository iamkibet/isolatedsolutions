import { Link } from '@inertiajs/react';

export default function NavIndustriesLinks() {
    return (
        <>
            <Link href={route('industries.ecommerce')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">eCommerce</h3>
                <p className="text-sm text-gray-600">Online retail solutions</p>
            </Link>
            <Link href={route('industries.fintech')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">FinTech</h3>
                <p className="text-sm text-gray-600">Financial technology innovations</p>
            </Link>
            <Link href={route('industries.edtech')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">EdTech</h3>
                <p className="text-sm text-gray-600">Educational technology solutions</p>
            </Link>
            <Link href={route('industries.wellness')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Healthcare</h3>
                <p className="text-sm text-gray-600">Healthcare technology systems</p>
            </Link>
        </>
    );
}
