import { useEffect, useState } from 'react'
import { useStats } from "../context/useStats"
import { useGameConfig } from "../context/useGameConfig.tsx"
import { Stats } from "../componentes/Stats.tsx"
import { Intro } from "../componentes/Intro.tsx"
import { Header } from "../componentes/Header.tsx"
import { Loading } from "../componentes/Loading.tsx"
import { MensajeFinal } from "../componentes/MensajeFinal.tsx"
import { useGameState } from "../context/useGameState.tsx"
import { Config } from "../componentes/Config.tsx"
import './App.css'
interface Palabra {
  id: number,
  name: string,
  isCompleted: boolean,
  language_id: number,
  difficulty_id: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}

export const App = () => {

  const { sumarIntentos, sumarResueltos,
    sumarVidasGanadas, agregarPalabrasResueltas,
    intentos, vaciarStats
  } = useStats()
  const { modoOscuro, setModoOscuro } = useGameConfig();
  const { respuestaCorrecta, vidasRestantes, respuestas,
    resuelto, setRespuestaCorrecta, setResuelto
    , setRespuestas, setVidasRestantes,
    vaciarRespuestas } = useGameState()
  const [letras, setLetras] = useState<string[]>([])
  const [cantLetras, setCantLetras] = useState<number[]>(() => {
    if (respuestaCorrecta) {
      const arrayAux = []
      for (let i = 0; i < respuestaCorrecta.length; i++) {
        arrayAux.push(i + 1)
      }
      return arrayAux
    }
    return []
  })
  const { dificultad, idioma } = useGameConfig()
  const [finJuego, setFinJuego] = useState<boolean>(false)
  const [animar, setAnimar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const mensajeFinal = finJuego ? (resuelto ? "ganaste" : "perdiste") : "";
  const [cartelVidas, setCartelVidas] = useState<boolean>(false)
  const [modalAbierto, setModalAbierto] = useState<"intro" | "stats" | "config" | null>(null)
  const totalVidas = 5
  const abrirIntro = () => setModalAbierto(modalAbierto === "intro" ? null : "intro")
  const abrirStats = () => setModalAbierto(modalAbierto === "stats" ? null : "stats")
  const abrirConfig = () => setModalAbierto(modalAbierto === "config" ? null : "config")
  const [animarStatsIcon, setAnimarStatsIcon] = useState(false)
  const [animarIntroIcon, setAnimarIntroIcon] = useState(false)
  const [animarConfigIcon, setAnimarConfigIcon] = useState(false)
  const [animarVida, setAnimarVida] = useState(false)

  const cerrarModal = () => {
    const modalActual = modalAbierto
    if (modalActual === "intro") {
      handleTimerGeneral(setAnimarIntroIcon)
    } else if (modalActual === "stats") {
      handleTimerGeneral(setAnimarStatsIcon)
    } else if (modalActual === "config") {
      handleTimerGeneral(setAnimarConfigIcon)
    }
    setModalAbierto(null)
  }
  const handleClickStats = () => {
    abrirStats()
    handleTimerGeneral(setAnimarStatsIcon)
  }
  const handleClickIntro = () => {
    abrirIntro()
    handleTimerGeneral(setAnimarIntroIcon)
  }
  const updateWord = async (respuesta: string) => {
    setLoading(true)
    try {
      await fetch("http://localhost:3000/done", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          palabra: respuesta,
        })
      })


    } catch (error) {
      console.log("Error al actualizar el estado de la palabra", error)
    } finally {
      setLoading(false)
    }

  }
  const forCantLetras = (parametro: string) => {
    const arrayAux = []
    for (let i = 0; i < parametro.length; i++) {
      arrayAux.push(i + 1)
    }
    setCantLetras(arrayAux)
  }
  const vaciarLocalStorage = () => {
    if (vidasRestantes != 0 && finJuego) {
      setRespuestaCorrecta("");
      vaciarRespuestas()
      setFinJuego(false);
      setLetras([]);
      setResuelto(false)
      setCartelVidas(false);
    }
  };
  const quitarAcentos = (letra: string) => {
    return letra.replace(/[áÁ]/g, 'A')
      .replace(/[éÉ]/g, 'E')
      .replace(/[íÍ]/g, 'I')
      .replace(/[óÓ]/g, 'O')
      .replace(/[úÚ]/g, 'U')
  }
  const corazonesAnimacion = () => {
    if (vidasRestantes == 2) {
      return "animate-girar"
    } else if (vidasRestantes == 1) {
      return "animate-bounce"
    }

  }
  const handleTimerGeneral = (
    setAnimacion: (valor: boolean) => void,
    delay: number = 50
  ) => {
    setAnimacion(false)
    const timer = setTimeout(() => {
      setAnimacion(true)
    }, delay)

  }


  const handleClickConfig = () => {
    abrirConfig()
    handleTimerGeneral(setAnimarConfigIcon)

  }

  //FETCH DE LA PALABRA
  useEffect(() => {
    const fetchData = async (dificultadId: number, idiomaId: number) => {
      setLoading(true)
      try {

        if (!finJuego && vidasRestantes !== 0 && respuestas.length === 0) {

          let data: Palabra
          if (dificultadId == 4) {
            const res = await fetch(`http://localhost:3000/word/${idiomaId}`)
            data = await res.json()
          } else {
            const res = await fetch(`http://localhost:3000/word/${idiomaId}/${dificultadId}`)
            data = await res.json()
          }

          setRespuestaCorrecta(quitarAcentos(data.name.toUpperCase()))
          forCantLetras(data.name.toUpperCase())
        }
      } catch (error) {
        console.log("Error al traer palabra", error)

      } finally {
        setLoading(false)

      }
    }
    fetchData(dificultad, idioma)

  }, [finJuego, vidasRestantes, respuestas, dificultad, idioma])

  //Ingreso Letras
  useEffect(() => {

    if (respuestas.length >= 5 || finJuego) return

    const ingresoLetras = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setLetras(prev => prev.slice(0, -1))

        if (cantLetras.length < respuestaCorrecta.length) {
          setCantLetras(prev => [...prev, prev.length + 1])
        }
      }

      if (!/^[a-zA-Z]$/.test(e.key) && e.key !== "ñ" && e.key !== "Ñ") {
        return;
      }
      if (!finJuego) {
        setLetras(prev => {
          if (prev.length >= respuestaCorrecta.length) {
            return prev
          }
          return [...prev, e.key.toUpperCase()]
        })
      }
      setCantLetras(prev => prev.slice(0, -1))
    }
    window.addEventListener("keydown", ingresoLetras)
    return () => {
      window.removeEventListener("keydown", ingresoLetras)
    }

  }, [cantLetras.length, respuestas, finJuego, respuestaCorrecta])


  //CHECK Resultados
  useEffect(() => {

    const checkResults = (e: KeyboardEvent) => {
      if (e.key === "Enter" && letras.length == respuestaCorrecta.length && !finJuego) {
        const nuevosColores: string[] = letras.map((l, i) => {
          if (l === respuestaCorrecta[i]) return `bg-green-400`
          if (l !== respuestaCorrecta[i] && respuestaCorrecta.includes(l)) return "bg-yellow-400"
          return "bg-red-400"
        })

        setRespuestas(
          {
            palabra: letras.join(""),
            colores: nuevosColores
          }
        )
        if (letras.join("") == respuestaCorrecta) {
          setResuelto(true)
          sumarResueltos(1)
          agregarPalabrasResueltas(respuestaCorrecta)
          updateWord(respuestaCorrecta)
          sumarIntentos(1)
          setVidasRestantes(
            vidasRestantes < 4
              ? vidasRestantes + 2
              : vidasRestantes === 4
                ? vidasRestantes + 1
                : vidasRestantes
          );
          sumarVidasGanadas(vidasRestantes < 4 ? 2 : vidasRestantes === 4 ? 1 : 0)
          setCantLetras([])
        } else {
          sumarIntentos(1)
          handleTimerGeneral(setAnimarVida)
          const vidasDiferencia = vidasRestantes - 1;
          setVidasRestantes(vidasDiferencia);
        }
        setLetras([])
        forCantLetras(respuestaCorrecta)
      }

    }
    window.addEventListener("keydown", checkResults)
    return () => {
      window.removeEventListener("keydown", checkResults)
    }
  }, [letras, finJuego, vidasRestantes, agregarPalabrasResueltas, respuestaCorrecta, setResuelto, setRespuestas, setVidasRestantes, sumarResueltos, sumarIntentos, sumarVidasGanadas])


  //Control de intro
  useEffect(() => {
    if (intentos > 0) {
      setModalAbierto(null)
    } else {
      setModalAbierto("intro")
    }
  }, [intentos]);

  //Animación al cargar, chill de cojones
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimar(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  //CHECK game over
  useEffect(() => {
    if (vidasRestantes == 0 || resuelto === true || respuestas.length === 5) {
      setFinJuego(true)
      setCantLetras([])
    }
  }, [respuestas.length, resuelto, vidasRestantes])

  const handleClick = () => {
    vaciarLocalStorage()
    setCartelVidas(vidasRestantes == 0 ? true : false)
  }

  const handleClickContinue = () => {
    vaciarStats()
    setCartelVidas(false)
    setRespuestaCorrecta("");
    vaciarRespuestas()
    setFinJuego(false);
    setResuelto(false)
    setLetras([])
    setVidasRestantes(5)
  }
  return (
    <div className={`w-full h-full box-border ${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>

      <Header animar={animar}
        animarStatsIcon={animarStatsIcon}
        animarConfigIcon={animarConfigIcon}
        animarIntroIcon={animarIntroIcon}
        handleClickStats={handleClickStats}
        handleClickIntro={handleClickIntro}
        handleClickConfig={handleClickConfig}
        animarLogo={() => handleTimerGeneral(setAnimar, 750)}
        cerrarModal={cerrarModal} />

      {modalAbierto === "config" &&
        <Config handleClickConfig={handleClickConfig} />
      }
      {modalAbierto === "intro" &&
        <Intro onClose={cerrarModal} setFinJuego={setFinJuego} setCantLetras={setLetras} />}
      {modalAbierto === "stats" &&
        <Stats onClose={cerrarModal} />}
      {loading && < Loading />}
      {!loading && modalAbierto === null &&

        <main className={modoOscuro ? "bg-black text-white" : "bg-white text-black "}>


          <div className=' w-full flex flex-row relative items-center justify-center'>
            <div className={`flex flex-col w-1/2`}>
              {respuestas.map((intento, i) => (
                <div key={i} className={`flex gap-2 justify-center mb-5 transition-all ease-in-out delay-75 duration-750 transform  ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 translate-x-5"}`}>
                  {intento.palabra.split("").map((letra, j) => (
                    <div key={j} className={`w-[60px] h-[60px] border-2 border-black-400 flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out delay-75 duration-750 transform hover:translate-y-1 cursor-pointer 
                          ${modoOscuro
                        ? intento.colores[j] === "bg-green-400"
                          ? "bg-green-800 animate-pulse"
                          : intento.colores[j] === "bg-yellow-400"
                            ? "bg-yellow-600"
                            : intento.colores[j] === "bg-red-400"
                              ? "bg-red-800"
                              : intento.colores[j]
                        : intento.colores[j]}`}>
                      {letra}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <aside className={`${modoOscuro ? "bg-gray-600 border-white text-white" : "bg-white"}  
            z-10  w-1/6 top-0 right-1/8 flex-wrap  border-2 flex absolute text-black cursor-pointer flex-col 
            items-center rounded-md hover:shadow-md shadow-white transition-all ease-in-out delay-75 duration-900 
            ` }>
              <span className="font-press flex text-xl mb-2 w-auto  flex-wrap ">Vidas:</span>
              <div className={`flex gap-2 text-2xl animate-tresCorazones shadow-custom-1  flex-wrap  `}>
                {Array.from({ length: totalVidas }, (_, i) => (
                  <span key={i} className={i < vidasRestantes ? `text-red-500 text-5xl ${corazonesAnimacion()} ` :
                    `text-gray-400 text-5xl ${animarVida ? "animate-shake" : ""}`}>
                    ♥
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <div className={`flex gap-2   justify-center mb-5 transition-all delay-150 duration-750 ease-in-out ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} `}>

            {letras.map((letra, i) => (
              <div key={i} className={` w-[60px] h-[60px] border-2  border-red-400 flex items-center justify-center  text-2xl font-bold uppercase transition-all ease-in-out delay-150 duration-150 rounded-sm ${modoOscuro ? "border-white" : ""} `}>
                {letra}
              </div>
            ))}

            {cantLetras.map((l) => (
              <div key={l} className={`w-[60px] h-[60px] border-2 z-10  flex items-center justify-center text-2xl font-bold uppercase  ${modoOscuro ? "bg-gray-600 border-white" : " bg-white border-red-700"}  transition-all ease-in-out delay-75 duration-700 transform rounded-sm `}>
              </div>
            )
            )}
          </div>

          <div className='flex justify-center mb-3 animate-girar '>

            {!loading && finJuego && <MensajeFinal mensajeFinal={mensajeFinal} />}
          </div>

          {
            !loading && finJuego &&
            <div className={`transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} flex relative justify-self-center border-2 font-bold border-black  rounded-md bg-blue-400 text-white  cursor-pointer transition-all text-2xl ease-in-out duration-300 hover:bg-white hover:text-black hover:translate-y-1 hover:animate-none`}>
              <button className='cursor-pointer w-full h-full flex p-2' onClick={handleClick}>Jugar de nuevo </button>
            </div>
          }
          {
            !loading && cartelVidas &&
            <div className={` transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} flex gap-1 justify-center flex-col  text-md font-press bg-amber-200 absolute rounded-md border-2 top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-auto items-center ${modoOscuro ? "text-black" : "text:white"}`}>
              <span className='absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={() => setCartelVidas(!cartelVidas)}>x</span>
              <span>Te quedaste sin vidas</span>
              <p>Al jugar de nuevo vas a perder todos tus stats</p>
              <div>
                <button className='px-2 py-2 bg-red-400 rounded-md text-white' onClick={() => setCartelVidas(false)}>Cancelar</button>
                <button className='px-2 py-2 bg-blue-400 rounded-md text-white' onClick={handleClickContinue}>Continuar</button>
              </div>
            </div>
          }
        </main >
      }
    </div >

  )

}

