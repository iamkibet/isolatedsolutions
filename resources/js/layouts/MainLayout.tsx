
import Footer from '@/components/main-footer';
import Navbar from '@/components/Nav/Navbar';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Navbar animation
        if (navRef.current) {
            gsap.to(navRef.current, {
                scrollTrigger: {
                    start: 'top -100',
                    end: 'top -100',
                    toggleClass: {
                        className: 'bg-white/80 backdrop-blur-md dark:bg-black/80',
                        targets: navRef.current,
                    },
                },
            });
        }

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
        </div>
    );
}
