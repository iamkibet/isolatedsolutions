import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import { Building2, Cloud, GraduationCap, Heart, Leaf, Shield, ShoppingCart, Wallet } from 'lucide-react';

export default function IndustriesIndex() {
    const industries = [
        {
            title: 'eCommerce',
            description: 'Transform your online retail business with cutting-edge solutions',
            icon: ShoppingCart,
            route: 'industries.ecommerce',
        },
        {
            title: 'SaaS',
            description: 'Build scalable and innovative software-as-a-service platforms',
            icon: Cloud,
            route: 'industries.saas',
        },
        {
            title: 'FinTech',
            description: 'Revolutionize financial services with modern technology',
            icon: Wallet,
            route: 'industries.fintech',
        },
        {
            title: 'EdTech',
            description: 'Create engaging and effective digital learning experiences',
            icon: GraduationCap,
            route: 'industries.edtech',
        },
        {
            title: 'Wellness',
            description: 'Develop health and wellness solutions for modern lifestyles',
            icon: Heart,
            route: 'industries.wellness',
        },
        {
            title: 'AgriTech',
            description: 'Innovate agricultural practices with smart technology',
            icon: Leaf,
            route: 'industries.agritech',
        },
        {
            title: 'Insurance',
            description: 'Modernize insurance services with digital solutions',
            icon: Shield,
            route: 'industries.insurance',
        },
        {
            title: 'Government',
            description: 'Transform public services with secure and efficient systems',
            icon: Building2,
            route: 'industries.government',
        },
    ];

    return (
        <PageLayout>
            <Head title="Industries" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-6 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-gray-700">
                            <Building2 className="h-5 w-5 animate-pulse" />
                            Industry Solutions
                        </div>
                        <h1 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
                            Industries We Serve
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Tailored technology solutions for diverse industries
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Industries Grid */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {industries.map((industry) => (
                            <Link key={industry.title} href={route(industry.route)} className="group">
                                <div className="h-full rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                        <industry.icon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                                        {industry.title}
                                    </h3>
                                    <p className="text-gray-600">{industry.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
                <MaxWidthWrapper>
                    <div className="space-y-8 text-center">
                        <h2 className="text-4xl font-bold text-white">Ready to Transform Your Industry?</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-300">Let's create innovative solutions tailored to your industry's needs</p>

                        <div className="mt-8 flex justify-center gap-6">
                            <button className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl">
                                <Building2 className="h-5 w-5" />
                                Start Your Project
                            </button>
                            <button className="group relative flex items-center gap-3 rounded-xl border-2 border-red-500 px-8 py-4 font-semibold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:shadow-xl">
                                <Cloud className="h-5 w-5" />
                                View Our Solutions
                            </button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </PageLayout>
    );
}
