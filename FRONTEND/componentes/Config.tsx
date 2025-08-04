import { useEffect, useState } from "react"
import { useGameConfig } from "../context/useGameConfig"
import { useGameState } from "../context/useGameState"
import { useGameStats } from "../context/useGameStats"

interface AsideType {
    handleClickConfig: () => void
    setFinjuego: (valor: boolean) => void
}

export const Config = ({ handleClickConfig, setFinjuego }: AsideType) => {
    const { modoOscuro, setModoOscuro, idioma, dificultad, setDificultad, setIdioma, dificultades, idiomas } = useGameConfig()
    const { vaciarGameState, respuestas } = useGameState()
    const { vaciarStats } = useGameStats()
    const [advertencia, setAdvertecia] = useState<boolean>(false)
    const [dificultadACambiar, setDificultadACambiar] = useState<number>()
    const [idiomaACambiar, setIdiomaACambiar] = useState<number>()

    const handleChangeDificultad = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (respuestas.length === 0) {
            vaciarGameState()
            setDificultad(Number(e.target.value))
        } else if (respuestas.length === 5) {
            setDificultad(Number(e.target.value))
            vaciarGameState()
            vaciarStats()
            setFinjuego(false)
        } else {
            setDificultadACambiar(Number(e.target.value))
            setAdvertecia(true)

        }
    }

    const handleChangeIdioma = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (respuestas.length === 0) {
            vaciarGameState()
            setIdioma(Number(e.target.value))
        } else if (respuestas.length === 5) {
            setIdioma(Number(e.target.value))
            vaciarGameState()
            vaciarStats()
            setFinjuego(false)
        } else {
            setIdiomaACambiar(Number(e.target.value))
            setAdvertecia(true)
        }
    }

    const handleChangeContinuar = () => {
        vaciarGameState()
        vaciarStats()
        if (dificultadACambiar) {
            setDificultad(dificultadACambiar)
        }
        if (idiomaACambiar) {
            setIdioma(idiomaACambiar)
        }
        setFinjuego(false)
        setAdvertecia(false)
    }


    return (
        <div className={`relative font-press gap-2 flex flex-col border-2 w-1/3  rounded-md ${modoOscuro ? "border-white bg-black text-white" : "border-black bg-white text-black"} items-center justify-self-center `}>
            <span className="pt-2 text-2xl">Configuraciones</ span>
            <button
                className={`font-press absolute top-[-2px] transition-all 
                    ease-in-out delay-75 duration-250 transform right-0 text-2xl z-30
                      ${modoOscuro ?
                        "bg-black text-white border-t-black hover:border-t-black hover:bg-white hover:text-black" :
                        "bg-white text-black border-t-white hover:border-t-black  border-black hover:shadow-orange-50"} 
                         shadow:md hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2`}
                onClick={handleClickConfig}
            >x
            </button>

            <div className="flex hover:ring-2
             hover:rounded-md border-b-2 border-gray-600 rounded-md
              w-[90%] items-center gap-3 justify-between p-4">
                <div className="w-[40%] flex justify-between">
                    <span className="cursor-default ">Cambiar tema</span>
                    <span className="transition-all ease-in-out duration-150 transform  text-xl">{modoOscuro ? <i className="fa-solid fa-moon animate-giroX" ></i> : <i className="fa-solid fa-sun animate-girarIconos"></i>}</span>
                </div>

                <div className="flex items-center gap-2 w-1/2 justify-end text-xl">

                    <button onClick={() => setModoOscuro(!modoOscuro)} className="cursor-pointer gap-2 px-5 py-2 left-60 transition-all ease-in-out duration-750 transform  z-10 border-2 rounded-md items-center justify-center flex ">
                        <i className={modoOscuro ? "fa-solid fa-toggle-off  text-2xl " : "fa-solid fa-toggle-on w-full text-2xl"}></i>

                    </button >
                </div>
            </div>

            <div className="flex  hover:ring-2 
            hover:rounded-md border-b-2 border-gray-600 rounded-md w-[90%] 
            items-center gap-3 justify-between p-4 " >
                <div className="w-[40%] flex justify-between">
                    <span className="cursor-default">cambiar dificultad
                    </span>
                    <i className={`${dificultad === 1 ? "animate-shake" : dificultad === 2 ? "animate-giroX" : "animate-girarIconos"} text-xl fa-solid fa-brain`}></i>
                </div>
                <select name="selectDificultades" id="2" onChange={handleChangeDificultad} value={dificultad} className=" 
                 cursor-pointer px-5 py-2 left-60 transition-all ease-in-out duration-750 
                 transform  z-10 border-2 rounded-md items-center justify-center flex ">
                    {dificultades.map(d => (
                        <option key={d.id} value={d.id} className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>{d.name == "easy" ? "facil" : d.name == "normal" ? "normal" : "dificil"}</option>
                    ))}
                </select>


            </div>

            <div className="flex mb-10  hover:ring-2
             hover:rounded-md border-b-2 border-gray-600 rounded-md 
             w-[90%] items-center  gap-3 justify-between p-4">
                <div className="w-[40%] justify-between flex">
                    <span className="cursor-default">cambiar idioma
                    </span>
                    <i className={`fa-solid fa-language text-xl w-1/2 ${idioma === 1 ? "animate-giroX" : "animate-shake"}`}></i>

                </div>
                <select
                    name="selectIdioma" id="1"
                    className=" cursor-pointer  px-5 py-2 left-60 transition-all ease-in-out duration-750 
                                transform  z-10 border-2 rounded-md items-center justify-center flex "
                    onChange={handleChangeIdioma}
                    value={idioma}>
                    v
                    {idiomas.map(d => (
                        <option key={d.id} value={d.id} className={`${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>{d.name === "spanish" ? "Español" : "Ingles"}</option>
                    ))}
                </select>
            </div>


            {advertencia &&
                <div className="justify-center flex absolute items-center flex-col w-full h-full bg-black text-white z-20 gap-10 ">
                    <span className="font-press text-3xl border-2 py-4 px-4 rounded-2xl bg-red-400">!</span>
                    <span>Vas a perder todo los datos de la partida actual</span>
                    <div className="w-full flex justify-center gap-5 ">
                        <button className={`px-2 py-2 border-2 cursor-pointer rounded-md ${modoOscuro ? "bg-white text-black border-gray-400 border-4" : "bg-black text-white border-white"}`} onClick={() => setAdvertecia(false)} >Cancelar</button>
                        <button className={`px-2 py-2 border-2 cursor-pointer rounded-md ${modoOscuro ? "bg-black text-white border-white" : "bg-white text-black"}`} onClick={handleChangeContinuar}>Continuar</button>

                    </div>
                </div>
            }

        </div>
    )
}