import { Head } from "@inertiajs/react";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import {
    Smartphone,
    Code,
    Globe,
    Zap,
    Shield,
    BarChart,
    Layers,
    Settings,
} from "lucide-react";
import PageLayout from "@/layouts/page-layout";

export default function AppDevelopment() {
    return (
        <PageLayout>
            <Head title="App Development Services" />
           
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Smartphone className="w-5 h-5 animate-pulse" />
                                Mobile & Web Applications
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                App Development
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Create powerful, scalable applications that
                                drive business growth and user engagement
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Smartphone className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Mobile Apps
                                </h3>
                                <p className="text-gray-600">
                                    Native and cross-platform mobile
                                    applications for iOS and Android.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Web Apps
                                </h3>
                                <p className="text-gray-600">
                                    Progressive web applications with modern
                                    frameworks and technologies.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <Settings className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    App Maintenance
                                </h3>
                                <p className="text-gray-600">
                                    Ongoing support, updates, and optimization
                                    for your applications.
                                </p>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Services Grid */}
                <section className="py-20 bg-white">
                    <MaxWidthWrapper>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:font-extrabold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                                Comprehensive App Solutions
                            </h2>
                            <p className="text-base lg:text-lg text-slate-600 py-4 max-w-2xl mx-auto">
                                End-to-end application development services for
                                modern businesses
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Mobile Development
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-red-600" />
                                        Native iOS & Android
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-red-600" />
                                        React Native & Flutter
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-600" />
                                        Secure authentication
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Web Development
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-600" />
                                        Progressive Web Apps
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-red-600" />
                                        Real-time features
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-red-600" />
                                        Cross-browser compatibility
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

             
          
        </PageLayout>
    );
}
