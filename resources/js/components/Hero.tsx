import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type HeroImage = {
    image: string;
    title: string;
    tab: string;
    description: string;
    buttonText: string;
    secondaryButtonText?: string;
};

const heroimages: HeroImage[] = [
    {
        image: '/images/ai-banner.webp',
        tab: 'Ai-First approach',
        title: 'Shaping Futures With Our AI-first Approach',
        description:
            'We drive AI innovation through breakthrough engineering and design to enhance business performance. This helps you to make informed decisions.',
        buttonText: 'Learn More',
    },
    {
        image: '/images/data_and_Cloud.webp',
        tab: 'Data Engineering',
        title: 'Engineer Data Into Actionable Decisions',
        description:
            'We help businesses to harness the power of data to drive innovation and growth. Our data engineering services help you to make informed decisions.',
        buttonText: 'Explore',
    },
    {
        image: '/images/cyber_security.webp',
        tab: 'Product Engineering',
        title: 'Accelerate Time-To-Market with Product Engineering',
        description: 'Reshaping the future of digital products with our expertise in product engineering by leveraging AI powered approaches',
        buttonText: 'Discover',
    },
    {
        image: '/images/Software_modernization.webp',
        tab: 'Legacy Software',
        title: 'Drive Agility Through Legacy System Modernization',
        description: 'Upgrade your legacy software to the modern, scalable architecture with automation and AI.',
        buttonText: 'Digitise your system',
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroimages.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!heroRef.current) return;

        // Animate content for each slide
        contentRefs.current.forEach((content) => {
            if (!content) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: content,
                    start: 'top center',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.from(content.querySelector('h1'), {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
            })
                .from(
                    content.querySelector('p'),
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )
                .from(
                    content.querySelector('.button-group'),
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    '-=0.4',
                );
        });
    }, []);

    return (
        <div ref={heroRef} className="relative -mt-20 md:-mt-40 h-screen w-full overflow-hidden">
            {heroimages.map((hero, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                    <img
                        src={hero.image}
                        alt={hero.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />

                    {index === currentSlide && (
                        <div className="absolute inset-0 flex flex-col justify-center text-white">
                            <MaxWidthWrapper>
                                <div
                                    ref={(el) => {
                                        if (el) {
                                            contentRefs.current[index] = el;
                                        }
                                    }}
                                    className=" space-y-6 px-4 pt-20 sm:px-6 md:space-y-8 md:px-8"
                                >
                                    <h1 className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-transparent drop-shadow-lg md:text-5xl lg:text-7xl">
                                        {hero.title}
                                    </h1>

                                    <p className="max-w-[650px] text-lg leading-relaxed font-medium text-gray-100/90 drop-shadow-md md:text-xl md:leading-relaxed lg:text-2xl">
                                        {hero.description}
                                    </p>

                                    <div className="button-group flex flex-col gap-4 pt-2 sm:flex-row">
                                        <Link
                                            href="/contact"
                                            className="w-fit rounded-lg bg-red-600 px-7 py-3.5 text-base font-semibold tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 md:px-9 md:py-4 md:text-lg"
                                            aria-label={`Learn more about ${hero.tab}`}
                                        >
                                            {hero.buttonText}
                                        </Link>
                                        {hero.secondaryButtonText && (
                                            <Link
                                                href="/services"
                                                className="w-fit rounded-lg border-2 border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold tracking-wide shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50 md:px-9 md:py-4 md:text-lg"
                                                aria-label={`View ${hero.tab} solutions`}
                                            >
                                                {hero.secondaryButtonText}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </MaxWidthWrapper>
                        </div>
                    )}
                </div>
            ))}

            {/* Mobile Navigation */}
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2 md:hidden">
                {heroimages.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(index);
                        }}
                        className={`h-3 w-3 rounded-full transition-colors ${currentSlide === index ? 'bg-red-600' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Desktop Navigation */}
            <div className="absolute right-0 bottom-8 left-0 z-20 hidden md:block">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-4 gap-4 px-4">
                        {heroimages.map((hero, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentSlide(index);
                                }}
                                className={`flex items-center rounded-lg p-3 text-white transition-all ${
                                    currentSlide === index ? 'bg-white/20 backdrop-blur-sm' : 'bg-black/20 hover:bg-white/10'
                                }`}
                            >
                                <span
                                    className={`text-sm font-medium ${currentSlide === index ? 'border-l-4 border-red-500 pl-3' : 'pl-4 opacity-90'}`}
                                >
                                    {hero.tab}
                                </span>
                            </button>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Hero;
