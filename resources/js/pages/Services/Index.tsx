import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';

// Service data structure
const services = [
    {
        title: 'Web Development',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        description: 'Custom digital solutions tailored to your business needs',
        items: ['Responsive Websites', 'Web Applications', 'API Integrations', 'Performance Optimization'],
        color: 'from-blue-500 to-indigo-600',
    },
    {
        title: 'eCommerce',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        description: 'Complete online shopping solutions',
        items: ['Store Development', 'Payment Integration', 'Inventory Systems', 'Mobile Commerce'],
        color: 'from-amber-500 to-orange-500',
    },
    {
        title: 'App Development',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
            </svg>
        ),
        description: 'Native and cross-platform experiences',
        items: ['iOS & Android Apps', 'Progressive Web Apps', 'UI/UX Design', 'App Maintenance'],
        color: 'from-emerald-500 to-teal-600',
    },
    {
        title: 'Consulting',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        ),
        description: 'Strategic guidance for digital transformation',
        items: ['Technical Audits', 'Cloud Migration', 'Digital Strategy', 'Solution Architecture'],
        color: 'from-purple-500 to-violet-600',
    },
    {
        title: 'Software Testing',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
            </svg>
        ),
        description: 'Quality assurance for flawless experiences',
        items: ['Automated Testing', 'Security Audits', 'Load Testing', 'UX Testing'],
        color: 'from-rose-500 to-pink-600',
    },
    {
        title: 'DevOps',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
            </svg>
        ),
        description: 'Streamlined development and deployment',
        items: ['CI/CD Pipelines', 'Infrastructure as Code', 'Containerization', 'Cloud Management'],
        color: 'from-cyan-500 to-sky-600',
    },
];

export default function ServicesIndex() {
    return (
        <PageLayout>
            <Head title="Our Services" />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100">
                <MaxWidthWrapper>
                    <div className="py-20">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <span className="mb-4 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                What We Offer
                            </span>
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                                Professional <span className="text-red-600">Digital Services</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Comprehensive solutions designed to elevate your digital presence and drive business growth
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                                >
                                    <div className={`bg-gradient-to-r ${service.color} h-2 w-full`}></div>
                                    <div className="p-7">
                                        <div className="mb-6 flex items-center">
                                            <div className="mr-4 rounded-lg bg-gray-100 p-3">{service.icon}</div>
                                            <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                                        </div>

                                        <p className="mb-6 text-gray-600">{service.description}</p>

                                        <ul className="mb-6 space-y-3">
                                            {service.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <svg
                                                        className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="font-medium text-indigo-600 transition-colors hover:text-indigo-800">
                                            Learn more &rarr;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 rounded-2xl bg-gradient-to-r from-red-500/80 to-red-600/70 p-8 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-white">Need a custom solution?</h3>
                            <p className="mx-auto mb-6 max-w-2xl text-red-100">
                                We specialize in bespoke digital experiences tailored to your unique business requirements.
                            </p>
                            <button className="rounded-full bg-white px-8 py-3 font-semibold text-red-600 transition-colors hover:bg-gray-100">
                                Discuss Your Project
                            </button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </PageLayout>
    );
}
