import { useDarkMode } from "../context/useDarkMode.tsx"

export interface Mostrar {
    onClose: () => void
}
export const Intro = ({ onClose }: Mostrar) => {
    const { modoOscuro } = useDarkMode();
    return (
        <>
            <div className={`absolute font-press gap-5  flex flex-col border-2  rounded-md ${modoOscuro ? "border-white" : "border-black"} -translate-y-50% w-auto z-20  items-center  bg-amber-300 text-black justify-self-center `}>
                <span className='font-press absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={onClose}>x</span>
                <span className='text-2xl pt-2'>Reglas del juego</span >
                <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-red-400 shadow-md'>
                    <h3 className='p-1'>Al equivocarte:</h3>
                    <p>Al equivocarte vas a perder una vida  ➖💔</p>
                    <p>El juego terminara al quedarte sin vidas</p>
                </div>
                <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-green-200 shadow-md'>
                    <h3 className='p-1'>Al acertar:</h3>
                    <p>Al acertar vas a ganar dos vidas ➕ <span className='text-red-600 text-2xl'>♥♥</span> </p>
                    <p>Vas a poder seguir jugando mientras tengas vidas</p>
                </div>
                <div className='w-[90%] flex flex-col gap-2 p-1 rounded-md border-2'>
                    <h3 className='p-1'>Guía de colores:</h3>
                    <div className='flex gap-2 items-center w-full'>
                        <div className='w-[30px] h-[30px] bg-green-400 justify-center flex items-center border-2 text-xl item-center'>A</div>
                        <p>La letra esta en la palabra y en el orden correcto</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='w-[30px] h-[30px] bg-yellow-400 justify-center flex items-center border-2 text-xl'>A</div>
                        <p>La letra esta en la palabra y en el orden incorrecto</p>
                    </div>
                    <div className='flex gap-2 items-center pb-1'>
                        <div className='w-[30px] h-[30px] bg-red-400 justify-center flex items-center border-2 text-xl'>A</div>
                        <p>La letra no esta en la palabra</p>
                    </div>
                </div>
                <button className={`justify-self-center border-2 p-2 mb-2 rounded-md bg-blue-400 text-white text-2xl cursor-pointer `} onClick={onClose}>JUGAR</button>
            </div>
        </>
    )

}