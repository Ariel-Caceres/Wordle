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
        return modoOscuroLS ? JSON.parse(modoOscuroLS) : false
    })



    useEffect(() => {
        localStorage.setItem("modoOscuro", JSON.stringify(modoOscuro));
    })
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