import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { BarChart, Code, Globe, Layers, Settings, Shield, Smartphone, Zap } from 'lucide-react';

export default function Mobile() {
    return (
        <PageLayout>
            <Head title="Mobile Development Technologies" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-32">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-8 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-gray-700/50 bg-gray-800/50 px-6 py-3 text-sm font-medium text-red-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50">
                            <Smartphone className="h-5 w-5 animate-pulse" />
                            Mobile Development Solutions
                        </div>
                        <h1 className="animate-gradient bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-6xl font-bold text-transparent">
                            Mobile Technologies
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Native and cross-platform mobile development solutions for iOS and Android
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Technologies Grid */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-24">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* iOS Development */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-red-100 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform duration-300 group-hover:scale-110">
                                <Code className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">iOS Development</h3>
                            <p className="mb-6 text-gray-600">Native iOS app development using Swift and modern iOS frameworks.</p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="group/item flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Swift & SwiftUI
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    iOS Security
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <BarChart className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    App Store Optimization
                                </li>
                            </ul>
                        </div>

                        {/* Android Development */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-red-100 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform duration-300 group-hover:scale-110">
                                <Code className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                                Android Development
                            </h3>
                            <p className="mb-6 text-gray-600">Native Android app development using Kotlin and modern Android frameworks.</p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="group/item flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Kotlin & Jetpack
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Android Security
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <BarChart className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Play Store Optimization
                                </li>
                            </ul>
                        </div>

                        {/* React Native */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-red-100 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform duration-300 group-hover:scale-110">
                                <Layers className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">React Native</h3>
                            <p className="mb-6 text-gray-600">Cross-platform mobile development using React Native framework.</p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="group/item flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    JavaScript/TypeScript
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Cross-platform UI
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Settings className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Native Modules
                                </li>
                            </ul>
                        </div>

                        {/* Flutter */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-red-100 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform duration-300 group-hover:scale-110">
                                <Layers className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">Flutter</h3>
                            <p className="mb-6 text-gray-600">Cross-platform mobile development using Flutter framework.</p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="group/item flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Dart Programming
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Material Design
                                </li>
                                <li className="group/item flex items-center gap-3">
                                    <Settings className="h-5 w-5 text-red-600 transition-transform group-hover/item:scale-110" />
                                    Platform Channels
                                </li>
                            </ul>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            
        </PageLayout>
    );
}
