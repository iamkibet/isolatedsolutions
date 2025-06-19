import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { BarChart, Code, Database, Globe, Layers, Server, Settings, Shield, Zap } from 'lucide-react';

export default function Backend() {
    return (
        <PageLayout>
            <Head title="Backend Technologies" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-6 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full bg-gray-800/50 px-5 py-2.5 text-sm font-medium text-red-400 backdrop-blur-sm transition-colors hover:bg-gray-700">
                            <Server className="h-5 w-5 animate-pulse" />
                            Backend Development Solutions
                        </div>
                        <h1 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
                            Backend Technologies
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Powerful backend frameworks and tools for building scalable and secure applications
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Technologies Grid */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* PHP/Laravel */}
                        <div className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                <Code className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">PHP/Laravel</h3>
                            <p className="mb-6 text-gray-600">Modern PHP framework for web artisans.</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-red-600" />
                                    MVC Architecture
                                </li>
                                <li className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-red-600" />
                                    Eloquent ORM
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                    Security Features
                                </li>
                            </ul>
                        </div>

                        {/* Node.js */}
                        <div className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                <Code className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Node.js</h3>
                            <p className="mb-6 text-gray-600">JavaScript runtime for server-side applications.</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-red-600" />
                                    Express.js Framework
                                </li>
                                <li className="flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-red-600" />
                                    NPM Ecosystem
                                </li>
                                <li className="flex items-center gap-2">
                                    <BarChart className="h-5 w-5 text-red-600" />
                                    Performance & Scalability
                                </li>
                            </ul>
                        </div>

                        {/* Python/Django */}
                        <div className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                <Code className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Python/Django</h3>
                            <p className="mb-6 text-gray-600">High-level Python web framework for rapid development.</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-red-600" />
                                    Django REST Framework
                                </li>
                                <li className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-red-600" />
                                    ORM & Migrations
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                    Admin Interface
                                </li>
                            </ul>
                        </div>

                        {/* Backend Services */}
                        <div className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                <Settings className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Backend Services</h3>
                            <p className="mb-6 text-gray-600">Comprehensive backend development solutions.</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Server className="h-5 w-5 text-red-600" />
                                    API Development
                                </li>
                                <li className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-red-600" />
                                    Database Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                    Security & Authentication
                                </li>
                            </ul>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

        </PageLayout>
    );
}
