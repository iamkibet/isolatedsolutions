import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { Clock, Code, Globe, Layout, Shield, Zap } from 'lucide-react';

export default function WebDevelopment() {
    return (
        <PageLayout>
            <Head title="Web Development Services" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-6 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full bg-gray-800/50 px-5 py-2.5 text-sm font-medium text-red-400 backdrop-blur-sm transition-colors hover:bg-gray-700">
                            <Zap className="h-5 w-5 animate-pulse" />
                            Enterprise Web Solutions
                        </div>
                        <h1 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
                            Professional Web Development
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Elevate your digital presence with enterprise-grade web solutions
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                <Code className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Enterprise Development</h3>
                            <p className="text-gray-600">
                                Scalable web solutions engineered to meet enterprise-level requirements and performance standards.
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                <Globe className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Cross-Platform Excellence</h3>
                            <p className="text-gray-600">Seamless experiences across all devices with responsive design and optimized performance.</p>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                <Layout className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Enterprise UI/UX</h3>
                            <p className="text-gray-600">Professional interfaces designed for optimal user engagement and business efficiency.</p>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Services Grid */}
            <section className="bg-white py-20">
                <MaxWidthWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl lg:font-extrabold xl:text-5xl">
                            Enterprise Web Solutions
                        </h2>
                        <p className="mx-auto max-w-2xl py-4 text-base text-slate-600 lg:text-lg">
                            Comprehensive web development services tailored for enterprise success
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Enterprise Website Development</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                    Enterprise-grade security architecture
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-red-600" />
                                    High-performance optimization
                                </li>
                                <li className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-red-600" />
                                    Advanced SEO implementation
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Enterprise Web Applications</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Code className="h-5 w-5 text-red-600" />
                                    Custom enterprise solutions
                                </li>
                                <li className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-red-600" />
                                    Global deployment capabilities
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                    Advanced security protocols
                                </li>
                            </ul>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

           
        </PageLayout>
    );
}
