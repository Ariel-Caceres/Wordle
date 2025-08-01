import { useDarkMode } from "../context/useDarkMode"
export const Loading = () => {
    const { modoOscuro } = useDarkMode()
    return (
        <div className={`flex flex-row justify-center w-full items-center h-1/2 ${modoOscuro ? "text-white" : "text-black"} `}>
            <span className='flex justify-self-center font-press animate-bounce'>CARGANDO...</span>
            <div className='animate-bounce'>
                <span className='flex  font-press animate-spin'>🕓</span>
            </div>
        </div>
    )
}