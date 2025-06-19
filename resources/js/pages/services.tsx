import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero section animation
        gsap.from(heroRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Services section animations
        const services = servicesRef.current?.querySelectorAll('.service');
        services?.forEach((service, index) => {
            gsap.from(service, {
                scrollTrigger: {
                    trigger: service,
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

        // Process section animations
        const steps = processRef.current?.querySelectorAll('.step');
        steps?.forEach((step, index) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });
    }, []);

    return (
        <MainLayout>
            <Head title="Services - Isolated Solutions" />

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-20 dark:from-black dark:to-gray-900"
            >
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-8 text-4xl font-bold md:text-5xl">Our Services</h1>
                    <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                        We offer a comprehensive range of digital services to help your business thrive in the modern world.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} className="bg-white px-6 py-20 dark:bg-black">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="service rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold">Web Development</h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Custom web applications built with modern technologies and best practices.
                            </p>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Responsive Design</li>
                                <li>• Progressive Web Apps</li>
                                <li>• E-commerce Solutions</li>
                                <li>• Content Management Systems</li>
                            </ul>
                        </div>
                        <div className="service rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-500">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold">Mobile Development</h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Native and cross-platform mobile applications for iOS and Android.
                            </p>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• iOS Development</li>
                                <li>• Android Development</li>
                                <li>• React Native</li>
                                <li>• Flutter</li>
                            </ul>
                        </div>
                        <div className="service rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-teal-500">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold">Data Analytics</h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Transform your data into actionable insights with our analytics solutions.
                            </p>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Business Intelligence</li>
                                <li>• Data Visualization</li>
                                <li>• Predictive Analytics</li>
                                <li>• Custom Dashboards</li>
                            </ul>
                        </div>
                        <div className="service rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-pink-500">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold">Digital Marketing</h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Comprehensive digital marketing strategies to grow your online presence.
                            </p>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• SEO Optimization</li>
                                <li>• Social Media Marketing</li>
                                <li>• Content Strategy</li>
                                <li>• Email Marketing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section ref={processRef} className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-16 text-center text-4xl font-bold">Our Process</h2>
                    <div className="space-y-12">
                        <div className="step flex items-center gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
                                1
                            </div>
                            <div>
                                <h3 className="mb-4 text-2xl font-semibold">Discovery</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We begin by understanding your business goals, target audience, and project requirements.
                                </p>
                            </div>
                        </div>
                        <div className="step flex items-center gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-500 text-2xl font-bold text-white">
                                2
                            </div>
                            <div>
                                <h3 className="mb-4 text-2xl font-semibold">Strategy</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We develop a comprehensive strategy and project plan tailored to your needs.
                                </p>
                            </div>
                        </div>
                        <div className="step flex items-center gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-500 text-2xl font-bold text-white">
                                3
                            </div>
                            <div>
                                <h3 className="mb-4 text-2xl font-semibold">Development</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Our team brings your project to life using cutting-edge technologies and best practices.
                                </p>
                            </div>
                        </div>
                        <div className="step flex items-center gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pink-500 text-2xl font-bold text-white">
                                4
                            </div>
                            <div>
                                <h3 className="mb-4 text-2xl font-semibold">Launch & Support</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We ensure a smooth launch and provide ongoing support and maintenance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
