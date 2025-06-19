import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { BarChart, CloudAlert, Database, Globe, Server, Settings, Shield, Zap } from 'lucide-react';

const CloudTechnologies = () => {
    return (
        <PageLayout>
            <Head title="Cloud Technologies" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-6 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-gray-700">
                            <CloudAlert className="h-5 w-5 animate-pulse" />
                            Cloud Computing Solutions
                        </div>
                        <h1 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
                            Cloud Technologies
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Enterprise-grade cloud solutions for scalable and secure applications
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Technologies Grid */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2">
                        <TechnologyCard
                            icon={<Server className="h-6 w-6 text-red-600" />}
                            title="Amazon Web Services (AWS)"
                            description="Comprehensive cloud services for scalable and reliable applications."
                            features={[
                                { icon: <Zap className="h-5 w-5 text-red-600" />, text: 'EC2 & Lambda' },
                                { icon: <Database className="h-5 w-5 text-red-600" />, text: 'RDS & DynamoDB' },
                                { icon: <Shield className="h-5 w-5 text-red-600" />, text: 'Security & IAM' },
                            ]}
                        />

                        <TechnologyCard
                            icon={<Server className="h-6 w-6 text-red-600" />}
                            title="Microsoft Azure"
                            description="Enterprise cloud platform for modern applications and services."
                            features={[
                                { icon: <Zap className="h-5 w-5 text-red-600" />, text: 'Virtual Machines' },
                                { icon: <Database className="h-5 w-5 text-red-600" />, text: 'Azure SQL & Cosmos DB' },
                                { icon: <Shield className="h-5 w-5 text-red-600" />, text: 'Azure Security' },
                            ]}
                        />

                        <TechnologyCard
                            icon={<Server className="h-6 w-6 text-red-600" />}
                            title="Google Cloud Platform (GCP)"
                            description="Innovative cloud services powered by Google's infrastructure."
                            features={[
                                { icon: <Zap className="h-5 w-5 text-red-600" />, text: 'Compute Engine' },
                                { icon: <Database className="h-5 w-5 text-red-600" />, text: 'Cloud SQL & Firestore' },
                                { icon: <Shield className="h-5 w-5 text-red-600" />, text: 'Security & IAM' },
                            ]}
                        />

                        <TechnologyCard
                            icon={<Settings className="h-6 w-6 text-red-600" />}
                            title="Cloud Services"
                            description="Comprehensive cloud solutions for your business needs."
                            features={[
                                { icon: <Globe className="h-5 w-5 text-red-600" />, text: 'CDN & Edge Computing' },
                                { icon: <BarChart className="h-5 w-5 text-red-600" />, text: 'Analytics & Big Data' },
                                { icon: <Shield className="h-5 w-5 text-red-600" />, text: 'Disaster Recovery' },
                            ]}
                        />
                    </div>
                </MaxWidthWrapper>
            </section>

        </PageLayout>
    );
};

// Technology Card Component
interface TechnologyCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: Array<{
        icon: React.ReactNode;
        text: string;
    }>;
}

const TechnologyCard = ({ icon, title, description, features }: TechnologyCardProps) => (
    <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">{icon}</div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-600">{description}</p>
        <ul className="space-y-3 text-gray-600">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                    {feature.icon}
                    {feature.text}
                </li>
            ))}
        </ul>
    </div>
);

export default CloudTechnologies;
