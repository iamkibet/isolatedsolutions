import { Link } from '@inertiajs/react';

export default function NavServicesLinks() {
    return (
        <>
            <Link href={route('services.web-development')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Web Development</h3>
                <p className="text-sm text-gray-600">Custom web applications and websites</p>
            </Link>
            <Link href={route('services.app-development')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">App Development</h3>
                <p className="text-sm text-gray-600">Native and cross-platform mobile apps</p>
            </Link>
            <Link href={route('services.ecommerce')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">E-commerce</h3>
                <p className="text-sm text-gray-600">Online stores and marketplaces</p>
            </Link>
            <Link href={route('services.consulting')} className="group">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600">Consulting</h3>
                <p className="text-sm text-gray-600">Technical and strategic guidance</p>
            </Link>
        </>
    );
}
