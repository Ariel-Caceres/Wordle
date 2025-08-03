import { useGameStats } from "../context/useGameStats.tsx"
import { useGameConfig } from "../context/useGameConfig.tsx"

interface MostrarStats {
    onClose: () => void
}

export const Stats = ({ onClose }: MostrarStats) => {
    const { modoOscuro } = useGameConfig()
    const { intentos, resueltos, vidasGanadas, palabrasResueltas } = useGameStats()
    const winrate = intentos > 0 ? Math.round((resueltos / intentos) * 100) : 0;




    return (
        <div className={`relative font-press gap-5   flex flex-col border-2 w-1/3 rounded-md ${modoOscuro ? "border-white bg-black text-white" : "border-black bg-white text-black"} items-center justify-self-center `}>

            <button
                className={`font-press absolute top-[-2px] transition-all ease-in-out delay-75 duration-250 transform right-0 text-2xl ${modoOscuro ? "bg-black text-white border-t-black hover:border-t-black hover:bg-white hover:text-black" : "bg-white text-black border-t-white hover:border-t-black  border-black hover:shadow-orange-50"} shadow:md hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2`}
                onClick={onClose}
            >
                x
            </button>
            <span className="text-2xl pt-2">Tus stats</span>

            <div className="hover:ml-3 w-full border-2 hover:cursor-pointer p-4 rounded-md shadow-md">
                <h3 className="text-lg">Intentos Totales:</h3>
                <span className="text-2xl rounded-md px-2 py-1 bg-green-400 text-black">{intentos}</span>
            </div>

            <div className="hover:ml-3 w-full p-4 border-2 hover:cursor-pointer items-center rounded-md shadow-md">
                <h3 className="text-lg">Total de palabras resueltas:</h3>
                {resueltos > 0 ? (
                    <span className="text-2xl font-bold px-2 py-1 bg-yellow-400 text-black rounded-md">{resueltos}</span>
                ) : (
                    <span className="text-2xl px-2 py-1 bg-red-400 text-black rounded-md">0 🤡</span>
                )}
            </div>

            <div className="w-full hover:ml-3 hover:cursor-pointer p-4 rounded-md border-2 shadow-md">
                <h3 className="text-lg mb-2">Palabras que resolviste:</h3>
                <div className="flex flex-wrap gap-2">
                    {palabrasResueltas.length > 0 ? (
                        palabrasResueltas.map((p, i) => (
                            <span key={i} className="px-2 py-1 bg-green-400 text-black rounded-md">{p}</span>
                        ))
                    ) : (
                        <span className="px-2 py-1 bg-red-400 text-black rounded-md italic">ninguna 🥀</span>
                    )}
                </div>
            </div>

            <div className="p-4 w-full hover:ml-3 hover:cursor-pointer mb-2 border-2 items-center rounded-md shadow-md">
                <h3 className="text-lg">Vidas ganadas <span className="text-red-500 text-2xl">❤</span>:</h3>
                {vidasGanadas > 0 ? (
                    <span className="text-2xl text-black px-2 py-1 bg-pink-300 rounded-md">{vidasGanadas}</span>
                ) : (
                    <span className="px-2 py-1 bg-yellow-400 text-black text-xl rounded-md">0 💔</span>
                )}
            </div>

            <div className="p-4 w-full hover:ml-3 hover:cursor-pointer mb-2 border-2 rounded-md shadow-md">
                <h3 className="text-lg">Winrate:</h3>
                <span className="text-2xl px-2 py-1 bg-green-400 text-black border-2 rounded-md">{winrate}%</span>
            </div>
        </div>

    )







}