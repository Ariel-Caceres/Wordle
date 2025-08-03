import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { respuestasInterface } from "./StatsContext"

interface gameStateType {
    respuestaCorrecta: string,
    vidasRestantes: number
    respuestas: respuestasInterface[],
    resuelto: boolean,
}

interface GameStateContextType {
    respuestaCorrecta: string,
    vidasRestantes: number
    respuestas: respuestasInterface[],
    resuelto: boolean,

    setRespuestaCorrecta: (respuesta: string) => void,
    setVidasRestantes: (vida: number) => void,
    setRespuestas: (respuesta: respuestasInterface) => void,
    setResuelto: (valor: boolean) => void
    vaciarRespuestas: () => void,
    vaciarGameState: () => void,
}

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<gameStateType>(() => {
        const gameStateLS = localStorage.getItem("gameState")
        if (gameStateLS) {
            return JSON.parse(gameStateLS) as gameStateType
        }
        return {
            respuestaCorrecta: "",
            vidasRestantes: 5,
            respuestas: [],
            resuelto: false,

        }
    })
    const vaciarGameState = () => {

        setGameState(prev => ({
            ...prev,
            respuestaCorrecta: "",
            vidasRestantes: 5,
            respuestas: [],
            resuelto: false,

        })

        )

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
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }, [gameState])

    return (
        <GameStateContext.Provider value={{
            setRespuestaCorrecta,
            setRespuestas,
            setResuelto,
            setVidasRestantes,
            vaciarRespuestas,
            vaciarGameState,
            respuestaCorrecta: gameState.respuestaCorrecta,
            resuelto: gameState.resuelto,
            vidasRestantes: gameState.vidasRestantes,
            respuestas: gameState.respuestas
        }}>
            {children}
        </GameStateContext.Provider >
    )
}