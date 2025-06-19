import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import {  BarChart, Code,  Layers, Layout, Palette, Settings, Shield, Zap } from 'lucide-react';

export default function Frontend() {
    return (
        <PageLayout>
            <Head title="Frontend Technologies" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-32">
                    <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 space-y-8 text-center">
                            <div className="inline-flex items-center gap-3 rounded-full bg-gray-800/50 px-6 py-3 text-sm font-medium text-red-400 backdrop-blur-sm transition-colors hover:bg-gray-700">
                                <Code className="h-5 w-5 animate-pulse" />
                                Frontend Development Solutions
                            </div>
                            <h1 className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-6xl font-bold text-transparent">
                                Frontend Technologies
                            </h1>
                            <p className="mx-auto mt-4 max-w-3xl text-2xl leading-relaxed text-gray-300">
                                Modern frontend frameworks and tools for building responsive and interactive web applications
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="bg-gradient-to-br from-gray-50 to-white py-24">
                    <MaxWidthWrapper>
                        <div className="grid gap-8 md:grid-cols-2">
                            {/* React */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-colors group-hover:bg-red-200">
                                    <Code className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">React</h3>
                                <p className="mb-6 text-gray-600">
                                    A JavaScript library for building user interfaces with a focus on component-based architecture.
                                </p>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-red-600" />
                                        <span>React Hooks & Functional Components</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Layers className="h-5 w-5 text-red-600" />
                                        <span>Component Architecture</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-red-600" />
                                        <span>Performance Optimization</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Vue.js */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-colors group-hover:bg-red-200">
                                    <Code className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Vue.js</h3>
                                <p className="mb-6 text-gray-600">
                                    Progressive JavaScript framework for building user interfaces with an intuitive API.
                                </p>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-red-600" />
                                        <span>Vue 3 Composition API</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Layers className="h-5 w-5 text-red-600" />
                                        <span>Single File Components</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-red-600" />
                                        <span>Vuex State Management</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Angular */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-colors group-hover:bg-red-200">
                                    <Code className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Angular</h3>
                                <p className="mb-6 text-gray-600">Platform for building mobile and desktop web applications with TypeScript.</p>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-red-600" />
                                        <span>TypeScript Integration</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Layers className="h-5 w-5 text-red-600" />
                                        <span>Angular Material</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-red-600" />
                                        <span>RxJS & Observables</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Frontend Tools */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-colors group-hover:bg-red-200">
                                    <Settings className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Frontend Tools</h3>
                                <p className="mb-6 text-gray-600">Essential tools and libraries for modern web development workflow.</p>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <Palette className="h-5 w-5 text-red-600" />
                                        <span>Tailwind CSS & Styled Components</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Layout className="h-5 w-5 text-red-600" />
                                        <span>Next.js & Nuxt.js</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <BarChart className="h-5 w-5 text-red-600" />
                                        <span>Webpack & Vite</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

              
            </div>
        </PageLayout>
    );
}
