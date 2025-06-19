import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import {
    Settings,
    Globe,
    ShoppingCart,
    Zap,
    Shield,
    BarChart,
    Database,
    Layers,
} from "lucide-react";

export default function CMS() {
    return (
        <>
            <Head title="Content Management Systems" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Settings className="w-5 h-5 animate-pulse" />
                                Content Management Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                CMS Technologies
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Powerful content management systems for building
                                and managing your digital presence
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* WordPress */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    WordPress
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    The world's most popular content management
                                    system.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Custom Themes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        Plugin Development
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security & Maintenance
                                    </li>
                                </ul>
                            </div>

                            {/* Shopify */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <ShoppingCart className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Shopify
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Leading e-commerce platform for online
                                    stores.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Custom Themes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        App Development
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Store Optimization
                                    </li>
                                </ul>
                            </div>

                            {/* Drupal */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Drupal
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Enterprise-grade content management
                                    platform.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Custom Modules
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Content Architecture
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security & Performance
                                    </li>
                                </ul>
                            </div>

                            {/* CMS Services */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    CMS Services
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Comprehensive CMS solutions for your
                                    business.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Website Development
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        SEO Optimization
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Maintenance & Support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
                    <MaxWidthWrapper>
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl font-bold text-white">
                                Ready to Build Your Website?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create a powerful digital presence for
                                your business
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Settings className="w-5 h-5" />
                                    Start Your Project
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Globe className="w-5 h-5" />
                                    View Our Work
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </Navbar>
        </>
    );
}
