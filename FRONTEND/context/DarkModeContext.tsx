import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
interface DarkModeContextType {
    modoOscuro: boolean;
    setModoOscuro: (modo: boolean) => void;
    toggleModoOscuro: () => void;
}


export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [modoOscuro, setModoOscuro] = useState<boolean>(() => {
        const modoOscuroLS = localStorage.getItem("modoOscuro")
        return modoOscuroLS !== null ? JSON.parse(modoOscuroLS) : window.matchMedia('(prefers-color-scheme: dark)')
    })


    useEffect(() => {
        const modoOscuroLS = localStorage.getItem("modoOscuro")

        if (modoOscuroLS) return
        const matchDark = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setModoOscuro(e.matches);
        };

        setModoOscuro(matchDark.matches); // Set inicial
        matchDark.addEventListener('change', handleChange); // Detectar cambios

        return () => matchDark.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        localStorage.setItem("modoOscuro", JSON.stringify(modoOscuro));
    }, [modoOscuro])

    const toggleModoOscuro = () => setModoOscuro((prev) => !prev);
    return (
        <DarkModeContext.Provider value={{
            modoOscuro,
            setModoOscuro,
            toggleModoOscuro
        }}>
            {children}
        </DarkModeContext.Provider >
    )
}