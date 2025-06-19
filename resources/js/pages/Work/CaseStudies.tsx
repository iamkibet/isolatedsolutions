import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Briefcase, Code, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function CaseStudies() {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (imagePath: string) => {
        setLoadedImages((prev) => ({ ...prev, [imagePath]: true }));
    };

    const caseStudies = [
        {
            id: 1,
            title: 'E-commerce Platform Transformation',
            description: 'How we helped a traditional retailer transform into a digital-first business',
            category: 'Digital Transformation',
            image: '/images/digital.png',
            imageWidth: 1200,
            imageHeight: 800,
            metrics: [
                { label: 'Revenue Increase', value: '150%' },
                { label: 'Customer Growth', value: '200%' },
                { label: 'Time to Market', value: '3 months' },
            ],
            challenges: ['Legacy system integration', 'Real-time inventory management', 'Scalable architecture'],
            solutions: ['Microservices architecture', 'Cloud-native deployment', 'Real-time analytics'],
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
            link: '/work/case-studies/ecommerce',
        },
        {
            id: 2,
            title: 'Health & Wellness App Development',
            description: 'Building a comprehensive wellness platform for a healthcare provider',
            category: 'Mobile Development',
            image: '/images/health.png',
            imageWidth: 1200,
            imageHeight: 800,
            metrics: [
                { label: 'User Adoption', value: '85%' },
                { label: 'Engagement Rate', value: '92%' },
                { label: 'App Store Rating', value: '4.8' },
            ],
            challenges: ['HIPAA compliance', 'Real-time data sync', 'Cross-platform consistency'],
            solutions: ['End-to-end encryption', 'Offline-first architecture', 'Unified design system'],
            technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
            link: '/work/case-studies/wellness',
        },
        {
            id: 3,
            title: 'AI-Powered Analytics Platform',
            description: 'Implementing machine learning for business intelligence',
            category: 'AI/ML',
            image: '/images/AI.png',
            imageWidth: 1200,
            imageHeight: 800,
            metrics: [
                { label: 'Prediction Accuracy', value: '95%' },
                { label: 'Processing Time', value: '-70%' },
                { label: 'Cost Reduction', value: '40%' },
            ],
            challenges: ['Data quality and volume', 'Model accuracy', 'Real-time processing'],
            solutions: ['Data pipeline automation', 'Custom ML models', 'Distributed computing'],
            technologies: ['Python', 'TensorFlow', 'AWS', 'Kubernetes'],
            link: '/work/case-studies/analytics',
        },
    ];

    return (
        <PageLayout>
            <Head title="Case Studies" />

            {/* Hero Section */}
            <section className="relative min-h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 pt-32 pb-20 text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white">
                            <Briefcase className="h-5 w-5" />
                            Case Studies
                        </div>
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                            Success Stories & <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Impact</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-300">
                            Explore how we've helped businesses achieve their digital transformation goals
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Case Studies Grid */}
            <section className="bg-gray-50 py-20">
                <MaxWidthWrapper>
                    <div className="space-y-20">
                        {caseStudies.map((study) => (
                            <div key={study.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative max-h-[800px] bg-gray-100 lg:h-full">
                                        {!loadedImages[study.image] && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            width={study.imageWidth}
                                            height={study.imageHeight}
                                            loading="lazy"
                                            onLoad={() => handleImageLoad(study.image)}
                                            className={`h-full w-full object-cover object-center ${loadedImages[study.image] ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12">
                                        <div className="mb-6 inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                                            {study.category}
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold text-gray-900">{study.title}</h2>
                                        <p className="mb-8 text-xl text-gray-600">{study.description}</p>

                                        {/* Metrics */}
                                        <div className="mb-8 grid grid-cols-3 gap-4">
                                            {study.metrics.map((metric, index) => (
                                                <div key={index} className="rounded-xl bg-gray-50 p-4 text-center">
                                                    <div className="mb-1 text-2xl font-bold text-gray-900">{metric.value}</div>
                                                    <div className="text-sm text-gray-600">{metric.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Challenges & Solutions */}
                                        <div className="mb-8 grid gap-8 md:grid-cols-2">
                                            <div>
                                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                                    <Target className="h-5 w-5 text-red-600" />
                                                    Challenges
                                                </h3>
                                                <ul className="space-y-2">
                                                    {study.challenges.map((challenge, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-600">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                                            {challenge}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                                    <TrendingUp className="h-5 w-5 text-red-600" />
                                                    Solutions
                                                </h3>
                                                <ul className="space-y-2">
                                                    {study.solutions.map((solution, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-600">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                                            {solution}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-8">
                                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                                <Code className="h-5 w-5 text-red-600" />
                                                Technologies
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {study.technologies.map((tech, index) => (
                                                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            href={study.link}
                                            className="inline-flex items-center gap-2 font-medium text-red-600 transition-colors hover:text-red-700"
                                        >
                                            Read Full Case Study
                                            <ArrowRight className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

        </PageLayout>
    );
}
