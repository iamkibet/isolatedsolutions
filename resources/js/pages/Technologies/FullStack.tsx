import PageLayout from "@/layouts/page-layout";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import { Head } from "@inertiajs/react";
import {
    Code,
    Layers,
    Zap,
    Database,
    Globe,
    Settings,
    Server,
    Shield,
    BarChart,
} from "lucide-react";

export default function FullStack() {
    return (
        <PageLayout>
            <Head title="Full Stack Technologies" />
 
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Layers className="w-5 h-5 animate-pulse" />
                                Full Stack Development Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Full Stack Technologies
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Comprehensive technology stacks for building
                                modern, scalable applications
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Technologies Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* MERN Stack */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    MERN Stack
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Modern JavaScript stack for full-stack
                                    development.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        MongoDB Database
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Express.js Backend
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        React Frontend
                                    </li>
                                </ul>
                            </div>

                            {/* MEAN Stack */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    MEAN Stack
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    JavaScript-based stack for enterprise
                                    applications.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        MongoDB Database
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Express.js Backend
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        Angular Frontend
                                    </li>
                                </ul>
                            </div>

                            {/* LAMP Stack */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    LAMP Stack
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Classic open-source web development stack.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Server className="w-5 h-5 text-red-600" />
                                        Linux Server
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-red-600" />
                                        Apache & MySQL
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        PHP Backend
                                    </li>
                                </ul>
                            </div>

                            {/* Full Stack Services */}
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Full Stack Services
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    End-to-end development solutions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        Architecture Design
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Performance Optimization
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Security Implementation
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
                                Ready to Build Your Full Stack Application?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create a powerful and scalable full stack
                                solution for your business
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Layers className="w-5 h-5" />
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
    
        </PageLayout>
    );
}
