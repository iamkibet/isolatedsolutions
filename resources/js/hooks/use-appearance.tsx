import { useCallback } from 'react';

export type Appearance = 'light';

// All theme logic disabled: always use light mode

export function initializeTheme() {
    // No-op: dark mode/theme logic disabled
}

export function useAppearance() {
    const updateAppearance = useCallback(() => {
        // No-op: always light
    }, []);

    return { appearance: 'light', updateAppearance } as const;
}
