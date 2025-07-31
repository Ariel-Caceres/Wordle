import { useStats } from "../context/useStats"
const { intentos, resueltos, vidasGanadas, palabrasResueltas } = useStats()

export const Stats = () => {


    return (
        <div className={`absolute font-press gap-5 h-1/2 flex flex-col border-2  rounded-md ${modoOscuro ? "border-white" : "border-black"} -translate-y-50% w-1/3 z-20  items-center  bg-amber-300 text-black justify-self-center `}>
            <span className='font-press absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={() => setStats(false)}>x</span>
            <span className='text-2xl pt-2'>Tus stats</span >
            <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-red-400 shadow-md'>
                <h3 className='p-1'>Jugados:</h3>

            </div>
            <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-green-200 shadow-md'>
                <h3 className='p-1'>Rachas:</h3>

            </div>
            <div className='w-[90%] flex flex-col gap-2 p-1 rounded-md border-2'>
                <h3 className='p-1'>Intentos:</h3>
                <div className='flex gap-2 items-center w-full'>

                </div>
                <div className='flex gap-2 items-center'>

                </div>
                <div className='flex gap-2 items-center pb-1'>

                </div>
            </div>
        </div>
    )

}