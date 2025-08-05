import { useGameConfig } from "../context/useGameConfig"
interface cartelVidasType {
    animar: boolean,
    handleClickContinuar: () => void,
    setMostrarCartelVidas: (valor: boolean) => void,
}

export const CartelVidas = ({ animar, handleClickContinuar, setMostrarCartelVidas }: cartelVidasType) => {
    const { modoOscuro } = useGameConfig()
    return (
        <div className={` transition-all ease-in-out delay-75 duration-750 transform 
            ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
            flex gap-1 justify-center flex-col p-2  text-md font-press  absolute
             rounded-md border-2 top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-auto items-center
              ${modoOscuro ? "text-white bg-black " : "text-black bg-white"}`}>
            <button
                className={`font-press absolute top-[-2px] transition-all ease-in-out delay-75 duration-250 transform right-0 text-2xl 
                    ${modoOscuro ? "bg-black text-white border-t-black hover:border-t-black hover:bg-white hover:text-black"
                        : "bg-white text-black border-t-white hover:border-t-black  border-black hover:shadow-orange-50"}
                         shadow:md hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2`}
                onClick={() => setMostrarCartelVidas(false)}>
                x
            </button>
            <span>Te quedaste sin vidas</span>
            <p>Al jugar de nuevo vas a perder todos tus stats</p>
            <div>
                <button className={`px-2 py-2 border-4 cursor-pointer rounded-md ${modoOscuro ? "bg-white text-black border-gray-400" : "bg-black text-white  border-white"}`} onClick={() => setMostrarCartelVidas(false)} >Cancelar</button>
                <button className={`px-2 py-2 border-2 cursor-pointer rounded-md ${modoOscuro ? "bg-black text-white border-white" : "bg-white text-black"}`} onClick={handleClickContinuar}>Continuar</button>
            </div>
        </div>

    )
}