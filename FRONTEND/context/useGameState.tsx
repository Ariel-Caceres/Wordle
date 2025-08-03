import { useContext } from "react";
import { GameStateContext } from "./GameStateContext";
export const useGameState = () => {
    const context = useContext(GameStateContext)
    if (!context) {
        throw new Error("Debe usarlo dentro de un context gamestate");
    }
    return context
}