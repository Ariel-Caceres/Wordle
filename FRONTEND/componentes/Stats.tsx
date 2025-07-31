import { useStats } from "../context/useStats"
import { useDarkMode } from "../context/useDarkMode.tsx"

interface MostrarStats {
    onClose: () => void
}

export const Stats = ({ onClose }: MostrarStats) => {
    const { modoOscuro } = useDarkMode()
    const { intentos, resueltos, vidasGanadas, palabrasResueltas } = useStats()

    return (

        <div className={`absolute font-press gap-5  flex flex-col border-2  w-1/3 rounded-md ${modoOscuro ? "border-white" : "border-black"} -translate-y-50%  z-20  items-center  bg-amber-300 text-black justify-self-center `}>
            <span className='font-press absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={onClose}>x</span>
            <span className='text-2xl pt-2'>Tus stats</span >
            <div className="bg-yellow-200 w-full border-2 p-4 rounded-md shadow-md">
                <h3 className="text-lg">Intentos Totales:</h3>
                <p className="text-2xl font-bold">{intentos}</p>
            </div>
            <div className="w:[90%] bg-green-100 w-full border-2 p-4 rounded-md shadow-md">
                <h3 className="text-lg">Palabras Resueltas:</h3>
                <p className="text-2xl font-bold">{resueltos}</p>
            </div>
            <div className="bg-blue-100 w-full p-4 rounded-md border-2 shadow-md">
                <h3 className="text-lg mb-2">Palabras que resolviste:</h3>
                <div className="flex flex-wrap gap-2">
                    {palabrasResueltas.map((p, i) => (
                        <span key={i} className="bg-green-300 dark:bg-green-700 text-black dark:text-white px-2 py-1 rounded-md">
                            {p}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-red-100 p-4 w-full mb-2 border-2 rounded-md shadow-md">
                <h3 className="text-lg">Vidas ganadas:</h3>
                <p className="text-2xl font-bold text-red-600">{vidasGanadas}</p>
            </div>
        </div>



    )

}