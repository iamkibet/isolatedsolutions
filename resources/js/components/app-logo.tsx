import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    isScrolled?: boolean;
}

export default function AppLogo({ isScrolled = false }: AppLogoProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <div
                    className={`flex aspect-square size-11 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isScrolled
                            ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                            : 'bg-gradient-to-br from-red-600 via-red-500 to-purple-600 shadow-[0_4px_12px_rgba(220,38,38,0.2)]'
                    }`}
                >
                    <AppLogoIcon className="size-7" isScrolled={isScrolled} />
                </div>
                <div
                    className={`absolute -right-1 -bottom-1 size-3.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        isScrolled ? 'bg-gray-50' : 'bg-white/30'
                    }`}
                />
            </div>
            <div className="flex flex-col">
                <span
                    className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                        isScrolled ? 'text-gray-900' : 'bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent'
                    }`}
                >
                    Isolated
                </span>
                <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}
                >
                    Solutions
                </span>
            </div>
        </div>
    );
}
