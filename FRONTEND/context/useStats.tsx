import { useContext } from "react";
import { StatsContext } from "../context/StatsContext";

export const useStats = () => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error("useStats debe usarse dentro de un StatsProvider");
    }
    return context;
};
