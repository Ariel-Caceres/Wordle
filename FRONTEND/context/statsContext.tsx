import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface respuestasInterface {
    palabra: string,
    colores: string[]
}

interface gameStateType {
    respuestaCorrecta: string,
    vidasRestantes: number
    respuestas: respuestasInterface[],
    resuelto: boolean,
}

interface StatsContextType {
    intentos: number,
    resueltos: number,
    vidasGanadas: number,
    palabrasResueltas: string[],

    sumarIntentos: (numero: number) => void;
    sumarResueltos: (numero: number) => void;
    sumarVidasGanadas: (numero: number) => void;
    agregarPalabrasResueltas: (palabra: string) => void;

    respuestaCorrecta: string,
    vidasRestantes: number
    respuestas: respuestasInterface[],
    resuelto: boolean,

    setRespuestaCorrecta: (respuesta: string) => void,
    setVidasRestantes: (vida: number) => void,
    setRespuestas: (respuesta: respuestasInterface) => void,
    setResuelto: (valor: boolean) => void
    vaciarRespuestas: () => void
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

    const [gameState, setGameState] = useState<gameStateType>(() => {
        const gameStateLS = localStorage.getItem("gameState")
        if (gameStateLS) {
            return JSON.parse(gameStateLS) as gameStateType
        }
        return {
            respuestaCorrecta: "",
            vidasRestantes: 5,
            respuestas: [],
            resuelto: false
        }
    })



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

    const setRespuestaCorrecta = (palabra: string) => {
        setGameState(prev => ({ ...prev, respuestaCorrecta: palabra }))
    }
    const setVidasRestantes = (numero: number) => {
        setGameState(prev => ({ ...prev, vidasRestantes: numero }))
    }
    const setRespuestas = (respuesta: respuestasInterface) => {
        setGameState(prev => ({ ...prev, respuestas: [...prev.respuestas, respuesta] }))
    }
    const vaciarRespuestas = () => {
        setGameState(prev => ({ ...prev, respuestas: [] }))
    }
    const setResuelto = (valor: boolean) => {
        setGameState(prev => ({ ...prev, resuelto: valor }))
    }

    useEffect(() => {
        localStorage.setItem("stats", JSON.stringify(stats))
    }, [stats])

    useEffect(() => {
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }, [gameState])

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


            setRespuestaCorrecta,
            setRespuestas,
            setResuelto,
            setVidasRestantes,
            vaciarRespuestas,
            respuestaCorrecta: gameState.respuestaCorrecta,
            resuelto: gameState.resuelto,
            vidasRestantes: gameState.vidasRestantes,
            respuestas: gameState.respuestas,
        }}>
            {children}
        </StatsContext.Provider>
    )
}