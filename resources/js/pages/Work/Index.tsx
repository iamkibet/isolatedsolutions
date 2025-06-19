import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Briefcase, Code, Palette, Star, Zap } from 'lucide-react';
import { useState } from 'react';

export default function WorkIndex() {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (imagePath: string) => {
        setLoadedImages((prev) => ({ ...prev, [imagePath]: true }));
    };

    const featuredWork = [
        {
            title: 'E-commerce Platform',
            description: 'A modern e-commerce solution with real-time inventory management',
            category: 'Web Development',
            image: '/images/work/ecommerce.jpg',
            imageWidth: 800,
            imageHeight: 600,
            link: '/work/case-studies/ecommerce',
        },
        {
            title: 'Health & Wellness App',
            description: 'Mobile application for tracking fitness and wellness goals',
            category: 'Mobile Development',
            image: '/images/work/wellness.jpg',
            imageWidth: 800,
            imageHeight: 600,
            link: '/work/case-studies/wellness',
        },
        {
            title: 'AI-Powered Analytics',
            description: 'Business intelligence platform with machine learning capabilities',
            category: 'AI/ML',
            image: '/images/work/analytics.jpg',
            imageWidth: 800,
            imageHeight: 600,
            link: '/work/case-studies/analytics',
        },
    ];

    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description: 'Custom web applications and platforms built with modern technologies',
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Beautiful and intuitive user interfaces that enhance user experience',
        },
        {
            icon: Zap,
            title: 'Digital Solutions',
            description: 'End-to-end digital solutions for businesses of all sizes',
        },
    ];

    return (
        <PageLayout>
            <Head title="Our Work" />

            {/* Hero Section */}
            <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 pt-32 pb-20 text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white">
                            <Briefcase className="h-5 w-5" />
                            Our Work
                        </div>
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                            Transforming Ideas into{' '}
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Digital Reality</span>
                        </h1>
                        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300">
                            Discover how we help businesses achieve their digital goals through innovative solutions and cutting-edge technology
                        </p>
                        <div className="flex justify-center gap-6">
                            <Link
                                href="/work/portfolio"
                                className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl"
                            >
                                View Our Portfolio
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/work/case-studies"
                                className="group relative flex items-center gap-3 rounded-xl border-2 border-red-500 px-8 py-4 font-semibold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:shadow-xl"
                            >
                                Read Case Studies
                                <Star className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Featured Work Section */}
            <section className="bg-white py-20">
                <MaxWidthWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Featured Work</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">Explore some of our most impactful projects and success stories</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredWork.map((work, index) => (
                            <Link
                                key={index}
                                href={work.link}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {!loadedImages[work.image] && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        width={work.imageWidth}
                                        height={work.imageHeight}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad(work.image)}
                                        className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                                            loadedImages[work.image] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 text-sm font-medium text-red-600">{work.category}</div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                                        {work.title}
                                    </h3>
                                    <p className="text-gray-600">{work.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Services Section */}
            <section className="bg-gray-50 py-20">
                <MaxWidthWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Services</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">Comprehensive digital solutions tailored to your business needs</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                                    <service.icon className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            
        </PageLayout>
    );
}
