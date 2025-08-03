import { useContext } from "react";
import { GameStatsContext } from "./GameStatsContext";

export const useGameStats = () => {
    const context = useContext(GameStatsContext);
    if (!context) {
        throw new Error("useStats debe usarse dentro de un StatsProvider");
    }
    return context;
};
