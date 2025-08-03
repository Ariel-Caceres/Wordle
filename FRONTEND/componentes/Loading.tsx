import { useGameConfig } from "../context/useGameConfig"
export const Loading = () => {
    const { modoOscuro } = useGameConfig()
    return (
        <div className={`flex flex-row justify-center w-full items-center h-1/2 ${modoOscuro ? "text-white" : "text-black"} `}>
            <span className='flex justify-self-center font-press animate-bounce'>CARGANDO...</span>
            <div className='animate-bounce'>
                <span className='flex  font-press animate-spin'>🕓</span>
            </div>
        </div>
    )
}