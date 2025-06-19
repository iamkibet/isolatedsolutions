import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';

import { Activity, BarChart, Cloud, Droplets, Globe, Leaf, LineChart, Settings, Shield, Sparkles, Sun } from 'lucide-react';

export default function AgriTech() {
    return (
        <PageLayout>
            <Head title="AgriTech Solutions" />

            {/* Hero Section with Enhanced Content */}
            <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="grid items-center gap-16 py-24 lg:grid-cols-2">
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
                                <Leaf className="h-5 w-5 animate-pulse" />
                                Agricultural Technology
                            </div>
                            <h1 className="text-5xl leading-tight font-bold text-white">
                                Transform Agriculture with{' '}
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Modern AgriTech</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-gray-300">
                                Create innovative agricultural solutions that empower farmers to increase yields and sustainability
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="mb-2 flex items-center gap-3">
                                        <Leaf className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Smart Farming</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Precision agriculture</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="mb-2 flex items-center gap-3">
                                        <BarChart className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Crop Analytics</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Data-driven insights</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl">
                                    <Sparkles className="h-5 w-5" />
                                    Start Your Journey
                                </button>
                                <button className="group relative flex items-center gap-3 rounded-xl border-2 border-red-500 px-8 py-4 font-semibold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:shadow-xl">
                                    <Globe className="h-5 w-5" />
                                    Explore Solutions
                                </button>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
                            <div className="relative space-y-6 p-8">
                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                        <Droplets className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Irrigation Systems</h3>
                                        <p className="text-gray-300">Smart water management</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                        <Sun className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Climate Control</h3>
                                        <p className="text-gray-300">Optimal growing conditions</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                        <Activity className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Crop Monitoring</h3>
                                        <p className="text-gray-300">Real-time tracking</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Detailed Features Section */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Comprehensive AgriTech Solutions</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">Empowering farmers with innovative agricultural technology</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Smart Farming */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                <Leaf className="h-7 w-7 text-gray-900" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">Smart Farming</h3>
                            <p className="mb-6 text-gray-600">Precision agriculture solutions</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-gray-900" />
                                    Crop Management
                                </li>
                                <li className="flex items-center gap-2">
                                    <Droplets className="h-5 w-5 text-gray-900" />
                                    Water Optimization
                                </li>
                                <li className="flex items-center gap-2">
                                    <Sun className="h-5 w-5 text-gray-900" />
                                    Climate Control
                                </li>
                            </ul>
                        </div>

                        {/* Data Analytics */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                <LineChart className="h-7 w-7 text-gray-900" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">Data Analytics</h3>
                            <p className="mb-6 text-gray-600">Advanced farming insights</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <LineChart className="h-5 w-5 text-gray-900" />
                                    Yield Prediction
                                </li>
                                <li className="flex items-center gap-2">
                                    <BarChart className="h-5 w-5 text-gray-900" />
                                    Soil Analysis
                                </li>
                                <li className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-gray-900" />
                                    Growth Tracking
                                </li>
                            </ul>
                        </div>

                        {/* Farm Management */}
                        <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                <Settings className="h-7 w-7 text-gray-900" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">Farm Management</h3>
                            <p className="mb-6 text-gray-600">Comprehensive farm operations</p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-gray-900" />
                                    Resource Planning
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-gray-900" />
                                    Quality Control
                                </li>
                                <li className="flex items-center gap-2">
                                    <Cloud className="h-5 w-5 text-gray-900" />
                                    Weather Integration
                                </li>
                            </ul>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* CTA Section with Enhanced Design */}
            <section className="bg-gradient-to-br from-gray-900 to-black py-20">
                <MaxWidthWrapper>
                    <div className="space-y-8 text-center">
                        <h2 className="text-4xl font-bold text-white">Ready to Transform Agriculture?</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-300">Let's create innovative AgriTech solutions for your farm</p>

                        <div className="mt-8 flex justify-center gap-6">
                            <button className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl">
                                <Leaf className="h-5 w-5" />
                                Start Your Project
                            </button>
                            <button className="group relative flex items-center gap-3 rounded-xl border-2 border-red-500 px-8 py-4 font-semibold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:shadow-xl">
                                <Globe className="h-5 w-5" />
                                View Our Solutions
                            </button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </PageLayout>
    );
}
