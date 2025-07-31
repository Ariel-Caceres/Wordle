import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
interface StatsContextType {
    intentos: number,
    resueltos: number,
    vidasGanadas: number,
    palabrasResueltas: string[],

    sumarIntentos: (numero: number) => void;
    sumarResueltos: (numero: number) => void;
    sumarVidasGanadas: (numero: number) => void;
    agregarPalabrasResueltas: (palabra: string) => void;

}

export const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
    const [stats, setStats] = useState<{
        intentos: number;
        resueltos: number;
        vidasGanadas: number;
        palabrasResueltas: string[];
    }>(() => {
        const statsLS = localStorage.getItem("stats");
        return statsLS
            ? JSON.parse(statsLS)
            : {
                intentos: 0,
                resueltos: 0,
                vidasGanadas: 0,
                palabrasResueltas: [],
            };
    });


    const sumarIntentos = (numero: number) => {
        setStats(prev => ({ ...prev, intentos: prev.intentos + numero }))
    }
    const sumarResueltos = (numero: number) => {
        setStats(prev => ({ ...prev, resueltos: prev.resueltos + numero }))
    }
    const sumarVidasGanadas = (numero: number) => {
        setStats(prev => ({
            ...prev, vidasGanadas: prev.vidasGanadas + numero
        }))
    }
    const agregarPalabrasResueltas = (palabra: string) => {
        setStats(prev => ({
            ...prev, palabrasResueltas: [...prev.palabrasResueltas, palabra]
        }))
    }

    useEffect(() => {
        localStorage.setItem("stats", JSON.stringify(stats))
    }, [stats])



    return (
        <StatsContext.Provider value={{
            sumarIntentos,
            sumarResueltos,
            sumarVidasGanadas,
            agregarPalabrasResueltas,

            intentos: stats.intentos,
            resueltos: stats.resueltos,
            vidasGanadas: stats.vidasGanadas,
            palabrasResueltas: stats.palabrasResueltas,

        }}>
            {children}
        </StatsContext.Provider>
    )
}