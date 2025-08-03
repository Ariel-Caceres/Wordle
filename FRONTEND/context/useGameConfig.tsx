import { useContext } from "react";
import { GameConfigContext } from "../context/GameConfigContext";

export const useGameConfig = () => {
    const context = useContext(GameConfigContext)
    if (!context) {
        throw new Error("Debes usar esto dentro de un contrxto");
    }
    return context
}