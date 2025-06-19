import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import {
    Code,
    Cloud,
    Database,
    Globe,
    Layers,
    Server,
    Smartphone,
    Settings,
} from "lucide-react";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";

export default function TechnologiesIndex() {
    return (
        <>
            <Head title="Our Technologies" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Code className="w-5 h-5 animate-pulse" />
                                Cutting-Edge Technologies
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Our Technology Stack
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Leveraging the latest technologies to build
                                powerful, scalable, and innovative solutions
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Mobile Development */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Smartphone className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Mobile Development
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Native and cross-platform mobile solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        iOS Development (Swift)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Android Development (Kotlin)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        React Native & Flutter
                                    </li>
                                </ul>
                            </div>

                            {/* Cloud Platforms */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Cloud className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Cloud Platforms
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Enterprise-grade cloud solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Amazon Web Services (AWS)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Microsoft Azure
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Google Cloud Platform (GCP)
                                    </li>
                                </ul>
                            </div>

                            {/* Content Management */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Content Management
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Powerful CMS solutions for content
                                    management.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        WordPress
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Shopify
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Drupal
                                    </li>
                                </ul>
                            </div>

                            {/* Frontend Technologies */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Frontend Technologies
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Modern frontend frameworks and libraries.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        React.js & Next.js
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Vue.js
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Angular
                                    </li>
                                </ul>
                            </div>

                            {/* Backend Technologies */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Server className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Backend Technologies
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Robust backend solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Node.js
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        Python (Django/Flask)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        PHP (Laravel)
                                    </li>
                                </ul>
                            </div>

                            {/* Database Technologies */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Database className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Database Technologies
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Scalable database solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        PostgreSQL & MySQL
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        MongoDB
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Redis
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
                                Ready to Build Something Amazing?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's leverage these technologies to create your
                                next project
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Code className="w-5 h-5" />
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
