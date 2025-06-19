import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";
import { Link } from "@inertiajs/react";
import {
    ShoppingCart,
    Cloud,
    Wallet,
    GraduationCap,
    Heart,
    Leaf,
    Shield,
    Building2,
} from "lucide-react";

export default function IndustriesIndex() {
    const industries = [
        {
            title: "eCommerce",
            description:
                "Transform your online retail business with cutting-edge solutions",
            icon: ShoppingCart,
            route: "industries.ecommerce",
        },
        {
            title: "SaaS",
            description:
                "Build scalable and innovative software-as-a-service platforms",
            icon: Cloud,
            route: "industries.saas",
        },
        {
            title: "FinTech",
            description:
                "Revolutionize financial services with modern technology",
            icon: Wallet,
            route: "industries.fintech",
        },
        {
            title: "EdTech",
            description:
                "Create engaging and effective digital learning experiences",
            icon: GraduationCap,
            route: "industries.edtech",
        },
        {
            title: "Wellness",
            description:
                "Develop health and wellness solutions for modern lifestyles",
            icon: Heart,
            route: "industries.wellness",
        },
        {
            title: "AgriTech",
            description:
                "Innovate agricultural practices with smart technology",
            icon: Leaf,
            route: "industries.agritech",
        },
        {
            title: "Insurance",
            description: "Modernize insurance services with digital solutions",
            icon: Shield,
            route: "industries.insurance",
        },
        {
            title: "Government",
            description:
                "Transform public services with secure and efficient systems",
            icon: Building2,
            route: "industries.government",
        },
    ];

    return (
        <>
            <Head title="Industries" />
            <Navbar>
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-2.5 rounded-full text-sm text-red-400 font-medium hover:bg-gray-700 transition-colors">
                                <Building2 className="w-5 h-5 animate-pulse" />
                                Industry Solutions
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Industries We Serve
                            </h1>
                            <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                Tailored technology solutions for diverse
                                industries
                            </p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Industries Grid */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industries.map((industry) => (
                                <Link
                                    key={industry.title}
                                    href={route(industry.route)}
                                    className="group"
                                >
                                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                                            <industry.icon className="w-6 h-6 text-red-600" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                                            {industry.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {industry.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
                    <MaxWidthWrapper>
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl font-bold text-white">
                                Ready to Transform Your Industry?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create innovative solutions tailored to
                                your industry's needs
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Building2 className="w-5 h-5" />
                                    Start Your Project
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Cloud className="w-5 h-5" />
                                    View Our Solutions
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </Navbar>
        </>
    );
}
