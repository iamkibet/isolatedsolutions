import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { BarChart, Cloud, Globe, Lightbulb, Server, Settings, Shield, Zap } from 'lucide-react';

export default function Consulting() {
    return (
        <PageLayout>
            <Head title="Digital Consulting Services" />
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
                    <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 space-y-6 text-center">
                            <div className="inline-flex items-center gap-3 rounded-full bg-gray-800/50 px-5 py-2.5 text-sm font-medium text-red-400 backdrop-blur-sm transition-colors hover:bg-gray-700">
                                <Lightbulb className="h-5 w-5 animate-pulse" />
                                Strategic Digital Solutions
                            </div>
                            <h1 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                                Digital Consulting
                            </h1>
                            <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
                                Expert guidance to transform your business through technology and innovation
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Features Section */}
                <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                    <MaxWidthWrapper>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Lightbulb,
                                    title: 'Digital Transformation',
                                    description: 'Strategic guidance to modernize your business operations and technology stack.',
                                },
                                {
                                    icon: Cloud,
                                    title: 'Cloud Migration',
                                    description: 'Seamless transition to cloud infrastructure with minimal disruption.',
                                },
                                {
                                    icon: Settings,
                                    title: 'App Consulting',
                                    description: 'Expert advice on application architecture, development, and optimization.',
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                        <feature.icon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Services Grid */}
                <section className="bg-white py-20">
                    <MaxWidthWrapper>
                        <div className="mb-16 text-center">
                            <h2 className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl lg:font-extrabold xl:text-5xl">
                                Comprehensive Consulting Services
                            </h2>
                            <p className="mx-auto max-w-2xl py-4 text-base text-slate-600 lg:text-lg">
                                Strategic technology consulting to drive your business forward
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {[
                                {
                                    title: 'Digital Strategy',
                                    items: [
                                        { icon: BarChart, text: 'Technology assessment' },
                                        { icon: Zap, text: 'Digital roadmap planning' },
                                        { icon: Shield, text: 'Security consulting' },
                                    ],
                                },
                                {
                                    title: 'Infrastructure Services',
                                    items: [
                                        { icon: Server, text: 'Cloud architecture' },
                                        { icon: Globe, text: 'Web hosting solutions' },
                                        { icon: Cloud, text: 'Migration services' },
                                    ],
                                },
                            ].map((service, index) => (
                                <div key={index} className="rounded-xl bg-gray-50 p-8 transition-all duration-300 hover:shadow-lg">
                                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">{service.title}</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        {service.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center gap-2">
                                                <item.icon className="h-5 w-5 text-red-600" />
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>

               
            </div>
        </PageLayout>
    );
}
