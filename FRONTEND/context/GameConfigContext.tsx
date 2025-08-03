import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface configType {
    dificultad: number,
    idioma: number,
    modoOscuro: boolean;

}

interface GameConfigtype {
    modoOscuro: boolean;
    setModoOscuro: (modo: boolean) => void;
    toggleModoOscuro: () => void;

    dificultad: number,
    setDificultad: (dificultad: number) => void,
    idioma: number,
    setIdioma: (id: number) => void,
}


export const GameConfigContext = createContext<GameConfigtype | undefined>(undefined);

export const GameConfigProvider = ({ children }: { children: ReactNode }) => {


    const [gameConfig, setGameConfig] = useState<configType>(() => {
        const gameConfigLS = localStorage.getItem("gameConfig")
        return gameConfigLS !== null ? JSON.parse(gameConfigLS) : { dificultad: 2, idioma: 1, modoOscuro: window.matchMedia('(prefers-color-scheme: dark)') }

    })
    const setDificultad = (dificultad: number) => {
        setGameConfig(prev => ({ ...prev, dificultad: dificultad }))
    }

    const setIdioma = (id: number) => {
        setGameConfig(prev => ({ ...prev, idioma: id }))
    }
    const setModoOscuro = (valor: boolean) => {
        setGameConfig(prev => ({ ...prev, modoOscuro: valor }))
    }


    useEffect(() => {
        localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
    }, [gameConfig])

    const toggleModoOscuro = () => {
        setGameConfig(prev => ({ ...prev, modoOscuro: !prev }))
    }


    useEffect(() => {
        const gameConfigLS = localStorage.getItem("gameConfig")

        if (gameConfigLS) return
        const matchDark = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setModoOscuro(e.matches);
        };

        setModoOscuro(matchDark.matches); // Set inicial
        matchDark.addEventListener('change', handleChange); // Detectar cambios

        return () => matchDark.removeEventListener('change', handleChange);
    }, []);


    return (
        <GameConfigContext.Provider value={{
            modoOscuro: gameConfig.modoOscuro,
            setModoOscuro,
            toggleModoOscuro,

            dificultad: gameConfig.dificultad,
            setDificultad,
            idioma: gameConfig.idioma,
            setIdioma,
        }}>
            {children}
        </GameConfigContext.Provider >
    )
}