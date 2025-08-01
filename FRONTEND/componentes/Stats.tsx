import { useStats } from "../context/useStats"
import { useDarkMode } from "../context/useDarkMode.tsx"

interface MostrarStats {
    onClose: () => void
}

export const Stats = ({ onClose }: MostrarStats) => {
    const { modoOscuro } = useDarkMode()
    const { intentos, resueltos, vidasGanadas, palabrasResueltas } = useStats()
    const winrate = intentos > 0 ? Math.round((resueltos / intentos) * 100) : 0;
    return (

        <div className={`absolute font-press gap-5  flex flex-col border-2  w-1/3  rounded-md ${modoOscuro ? "border-white  bg-gradient-to-b from-gray-200 to-gray-900" : "border-black bg-amber-300"} -translate-y-50%  z-20  items-center   text-black justify-self-center `}>
            <span className='font-press absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={onClose}>x</span>
            <span className='text-2xl pt-2'>Tus stats</span >
            <div className={` hover:ml-3 w-[100%] border-2 hover:cursor-pointer p-4 rounded-md shadow-md ${modoOscuro ? " bg-gray-500 text-white" : " bg-yellow-200"}`}>
                <h3 className="text-lg">Intentos Totales:</h3>
                <p className="text-2xl">{intentos}</p>
            </div>
            <div className={` hover:ml-3 w-full p-4 border-2 hover:cursor-pointer items-center rounded-md shadow-md ${modoOscuro ? " bg-gray-600 text-white" : " bg-green-200"}`}>
                <h3 className="text-lg">total de palabras Resueltas:</h3>
                {resueltos > 0 ?
                    <p className="text-2xl font-bold">{resueltos}</p>
                    : <span className="text-2xl">0🤡</span>
                }
            </div>
            <div className={`bg-blue-100 w-full hover:ml-3 hover:cursor-pointer p-4 rounded-md border-2 shadow-md ${modoOscuro ? " bg-gray-700 text-white" : " bg-blue-100"}`}>
                <h3 className="text-lg mb-2">Palabras que resolviste:</h3>
                <div className="flex flex-wrap gap-2">
                    {palabrasResueltas.length > 0 ?
                        palabrasResueltas.map((p, i) => (
                            <span key={i} className="bg-green-300 text-black  px-2 py-1 rounded-md">
                                {p}
                            </span>
                        ))
                        : <span className="px-2 py-1 rounded-md bg-amber-700 italic text-white">ninguna 🥀</span>
                    }
                </div>
            </div>
            <div className={` p-4 w-full hover:ml-3 hover:cursor-pointer mb-2 border-2 items-center rounded-md shadow-md ${modoOscuro ? " bg-gray-800 text-white" : " bg-red-100"}`}>
                <h3 className="text-lg">Vidas ganadas <span className="text-red-500 text-2xl"> ❤</span>:</h3>
                {vidasGanadas > 0 ?
                    <p className="text-2xl text-red-500">{vidasGanadas}</p>
                    : <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-xl">0 💔</span>
                }
            </div>
            <div className={`bg-black p-4 w-full hover:ml-3 hover:cursor-pointer  mb-2 border-2 rounded-md shadow-md ${modoOscuro ? " border-white" : "border-white"} `}>
                <h3 className="text-lg text-white">winrate:</h3>
                <span className="text-2xl px-2 py-1 border-2 bg-white text-black rounded-md">{winrate}%</span>
            </div>
        </div>



    )

}