import { useGameConfig } from "../context/useGameConfig"
import { useGameState } from "../context/useGameState"

interface AsideType {
    handleClickConfig: () => void
}

export const Config = ({ handleClickConfig }: AsideType) => {
    const { modoOscuro, setModoOscuro, idioma, dificultad, setDificultad, setIdioma } = useGameConfig()
    const { vaciarGameState } = useGameState()

    const handleChangeDificultad = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDificultad(Number(e.target.value))
        vaciarGameState()
    }

    const handleChangeIdioma = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdioma(Number(e.target.value))
        vaciarGameState()
    }
    return (
        <div className={`relative font-press gap-2 flex flex-col border-2 w-1/3  rounded-md ${modoOscuro ? "border-white bg-black text-white" : "border-black bg-white text-black"} items-center justify-self-center `}>
            <span className="p-5 text-2xl">Configuraciones</span>
            <button
                className={`font-press absolute top-[-2px] transition-all 
                    ease-in-out delay-75 duration-250 transform right-0
                     text-2xl ${modoOscuro ?
                        "bg-black text-white border-t-black hover:border-t-black hover:bg-white hover:text-black" :
                        "bg-white text-black border-t-white hover:border-t-black  border-black hover:shadow-orange-50"} 
                         shadow:md hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2`}
                onClick={handleClickConfig}
            >x
            </button>
            <div className="flex hover:ring-2
             hover:rounded-md border-b-2 border-gray-600 rounded-md
              w-[90%] items-center gap-3 justify-between p-4">
                <span className="cursor-default">Cambiar tema</span>
                <div className="flex items-center gap-2 text-xl">

                    <span>{modoOscuro ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}</span>
                    <button onClick={() => setModoOscuro(!modoOscuro)} className="cursor-pointer gap-2 px-5 py-2 left-60 transition-all ease-in-out duration-750 transform  z-10 border-2 rounded-md items-center justify-center flex ">
                        <i className={modoOscuro ? "fa-solid fa-toggle-off  text-2xl " : "fa-solid fa-toggle-on w-full text-2xl"}></i>

                    </button >
                </div>
            </div>
            <div className="flex  hover:ring-2
             hover:rounded-md border-b-2 border-gray-600 rounded-md 
             w-[90%] items-center gap-3 justify-between p-4">
                <span className="cursor-default">cambiar idioma </span>
                <select name="" id="" onChange={handleChangeIdioma} className="  cursor-pointer px-5 py-2 left-60 transition-all ease-in-out duration-750 transform  z-10 border-2 rounded-md items-center justify-center flex ">
                    <option value="" className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>español</option>
                    <option value="" className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>Ingles</option>
                </select>
            </div>
            <div className="flex  hover:ring-2 mb-10
            hover:rounded-md border-b-2 border-gray-600 rounded-md w-[90%] 
            items-center gap-3 justify-between p-4 " >
                <span className="cursor-default">cambiar dificultad</span>
                <select name="" id="" onChange={handleChangeDificultad} className="  cursor-pointer px-5 py-2 left-60 transition-all ease-in-out duration-750 transform  z-10 border-2 rounded-md items-center justify-center flex ">
                    <option value="" className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>facul</option>
                    <option value="" className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>normal</option>
                    <option value="" className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>dificil</option>
                </select>
            </div>


        </div>
    )
}