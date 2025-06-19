import { useState } from 'react';
import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    isScrolled?: boolean;
}

export default function AppLogo({ isScrolled = false }: AppLogoProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex cursor-default items-center gap-2.5" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative">
                <div
                    className={`flex aspect-square size-10 items-center justify-center rounded-xl transition-all duration-500 ${
                        isScrolled
                            ? 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]'
                            : 'bg-gradient-to-br from-red-700 via-amber-700 to-violet-700 shadow-[0_4px_20px_rgba(67,56,202,0.25)]'
                    } ${isHovered ? 'rotate-6' : ''}`}
                >
                    <AppLogoIcon className="size-6" isScrolled={isScrolled} isHovered={isHovered} />
                </div>

                {/* Subtle shine effect */}
                <div
                    className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent transition-opacity duration-300 ${
                        isScrolled ? 'opacity-30' : 'opacity-50'
                    }`}
                />
            </div>

            <div className="flex flex-col overflow-hidden">
                <span
                    className={`text-[22px] font-bold tracking-tight transition-all duration-500 ${
                        isScrolled ? 'text-gray-900' : 'text-gray-400'
                    } ${isHovered ? 'translate-x-[1.5px]' : ''}`}
                    style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 800,
                    }}
                >
                    ISOLATED
                </span>
                <span
                    className={`text-[10px] font-semibold tracking-wider transition-all duration-500 ${
                        isScrolled ? 'text-gray-400' : 'text-gray-400'
                    } ${isHovered ? 'translate-x-[1px]' : ''}`}
                    style={{ letterSpacing: '0.15em' }}
                >
                    SOLUTIONS
                </span>
            </div>
        </div>
    );
}
