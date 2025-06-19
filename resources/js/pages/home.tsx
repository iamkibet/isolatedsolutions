import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero section animations
        const heroTl = gsap.timeline();
        heroTl
            .from(taglineRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
            })
            .from(
                ctaRef.current,
                {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                '-=0.4',
            );

        // Features section animations
        const features = featuresRef.current?.querySelectorAll('.feature');
        features?.forEach((feature, index) => {
            gsap.from(feature, {
                scrollTrigger: {
                    trigger: feature,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });
    }, []);

    return (
        <MainLayout>
            <Head title="Isolated Solutions - Home" />

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-20 dark:from-black dark:to-gray-900"
            >
                <div className="mx-auto max-w-7xl text-center">
                    <h1
                        ref={taglineRef}
                        className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
                    >
                        Transforming Ideas into Digital Reality
                    </h1>
                    <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">
                        We craft innovative digital solutions that drive business growth and create exceptional user experiences.
                    </p>
                    <div ref={ctaRef} className="flex justify-center gap-6">
                        <a
                            href="/contact"
                            className="rounded-lg bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-600"
                        >
                            Get Started
                        </a>
                        <a
                            href="/services"
                            className="rounded-lg border-2 border-blue-500 px-8 py-4 text-lg font-medium text-blue-500 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            Our Services
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="bg-white px-6 py-20 dark:bg-black">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-16 text-center text-4xl font-bold">Why Choose Us</h2>
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="feature rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We optimize for performance, ensuring your digital solutions are blazing fast and efficient.
                            </p>
                        </div>
                        <div className="feature rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">Secure & Reliable</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Your data's security is our priority. We implement industry-leading security measures.
                            </p>
                        </div>
                        <div className="feature rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">Beautiful Design</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We create stunning, user-friendly interfaces that engage and delight your users.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
