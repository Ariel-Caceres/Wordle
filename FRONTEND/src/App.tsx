import { useEffect, useState } from 'react'
import { useStats } from "../context/useStats"
import { useDarkMode } from "../context/useDarkMode.tsx"
import { Stats } from "../componentes/Stats.tsx"
import { Intro } from "../componentes/Intro.tsx"
import { Header } from "../componentes/Header.tsx"
import { Loading } from "../componentes/Loading.tsx"
import { Footer } from "../componentes/Footer.tsx"
import { MensajeFinal } from "../componentes/MensajeFinal.tsx"
import './App.css'

interface Palabra {
  palabra: string,
  colores: string[]
}
export const App = () => {
  const [letras, setLetras] = useState<string[]>([])
  const [respuesta, setRespuesta] = useState<string>("")
  const [cantLetras, setCantLetras] = useState<number[]>(() => {
    const respuestaCorrectaLS = localStorage.getItem("respuestaCorrecta")
    if (respuestaCorrectaLS) {
      const arrayAux = []
      for (let i = 0; i < respuestaCorrectaLS.length; i++) {
        arrayAux.push(i + 1)
      }
      return arrayAux
    }
    return []
  })
  const [intentos, setIntentos] = useState<Palabra[]>(() => {
    const intentosLS = localStorage.getItem("respuestas")
    if (intentosLS) {
      return JSON.parse(intentosLS)
    }
    return []

  })
  const [finJuego, setFinJuego] = useState<boolean>(false)
  const [animar, setAnimar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [mensajeFinal, setMensajeFinal] = useState<string>("")
  const totalVidas = 5
  const [vidasRestantes, setVidasRestantes] = useState<number>(() => {
    const vidasLS = localStorage.getItem("vidasRestantes");
    return vidasLS !== null ? Number(vidasLS) : totalVidas;
  });
  const [cartelVidas, setCartelVidas] = useState<boolean>(false)
  const [intro, setIntro] = useState<boolean>()
  const [mostrarStats, setMostrarStats] = useState<boolean>(false)


  const { sumarIntentos, sumarResueltos, sumarVidasGanadas, agregarPalabrasResueltas } = useStats()
  const { modoOscuro, toggleModoOscuro } = useDarkMode();

  const updateWord = async (respuesta: string) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/done", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          palabra: respuesta,
        })
      })
      const data = await res.json()
      throw new Error(data.message || "Error al actualizar el estado de la palabra");
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

      localStorage.removeItem("respuestas");
      localStorage.removeItem("respuestaCorrecta");
      localStorage.removeItem("resuelto");
      localStorage.setItem("vidasRestantes", JSON.stringify(vidasRestantes));

      setRespuesta("");
      setIntentos([]);
      setFinJuego(false);
      setMensajeFinal("");

      setLetras([]);
      setCantLetras([]);
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
    if (vidasRestantes <= 2) {
      return "animate-bounce"
    }
  }

  const handleChangeDark = () => {
    toggleModoOscuro()
  }



  //FETCH DE LA PALABRA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const respuestaCorrectaLS = localStorage.getItem("respuestaCorrecta")
        if (respuestaCorrectaLS) {
          setRespuesta(respuestaCorrectaLS)
          return
        }
        if (!finJuego && vidasRestantes !== 0 && respuestaCorrectaLS == null && intentos.length === 0) {
          const res = await fetch("http://localhost:3000/word")
          const data = await res.json()
          if (!res.ok) {
            const msg = await data.message || "Error al traer palabra";
            throw new Error(msg);
          }
          setRespuesta(quitarAcentos(data.name.toUpperCase()))
          localStorage.setItem("respuestaCorrecta", quitarAcentos(data.name.toUpperCase()))
          forCantLetras(data.name)
        }
      } catch (error) {
        console.log("Error al traer palabra", error)

      } finally {
        setLoading(false)

      }
    }
    fetchData()

  }, [finJuego, vidasRestantes, respuesta, intentos])


  //Ingreso Letras
  useEffect(() => {

    if (intentos.length >= 5 || finJuego) return

    const ingresoLetras = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setLetras(prev => prev.slice(0, -1))

        if (cantLetras.length < respuesta.length) {
          setCantLetras(prev => [...prev, prev.length + 1])
        }
      }

      if (!/^[a-zA-Z]$/.test(e.key) && e.key !== "ñ" && e.key !== "Ñ") {
        return;
      }
      if (!finJuego) {
        setLetras(prev => {
          if (prev.length >= respuesta.length) {
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

  }, [cantLetras.length, intentos.length, respuesta.length, finJuego])


  //CHECK Resultados
  useEffect(() => {

    const checkResults = (e: KeyboardEvent) => {
      if (e.key === "Enter" && letras.length == respuesta.length && !finJuego) {
        const nuevosColores: string[] = letras.map((l, i) => {
          if (l === respuesta[i]) return `bg-green-400`
          if (l !== respuesta[i] && respuesta.includes(l)) return "bg-yellow-400"
          return "bg-red-400"
        })

        setIntentos(prev => [
          ...prev,
          {
            palabra: letras.join(""),
            colores: nuevosColores
          }
        ])
        if (letras.join("") == respuesta) {
          localStorage.setItem("resuelto", "true")
          sumarResueltos(1)
          agregarPalabrasResueltas(respuesta)
          updateWord(respuesta)
          setFinJuego(true)
          sumarIntentos(1)
          setVidasRestantes(
            vidasRestantes < 4
              ? vidasRestantes + 2
              : vidasRestantes === 4
                ? vidasRestantes + 1
                : vidasRestantes
          );
          sumarVidasGanadas(2)

          localStorage.setItem("vidasRestantes", JSON.stringify(vidasRestantes));
          setCantLetras([])
          setMensajeFinal("ganaste")
        } else {
          sumarIntentos(1)

          localStorage.setItem("resuelto", "false")
          const vidasDiferencia = vidasRestantes - 1;
          setVidasRestantes(vidasDiferencia);
          localStorage.setItem("vidasRestantes", JSON.stringify(vidasDiferencia));
        }
        setLetras([])
        forCantLetras(respuesta)
      }

    }
    window.addEventListener("keydown", checkResults)
    return () => {
      window.removeEventListener("keydown", checkResults)
    }
  }, [letras, respuesta, intentos, finJuego, vidasRestantes])


  //Control de intentos y vidas en el LocalStorage
  useEffect(() => {
    if (intentos.length > 0) {
      localStorage.setItem("respuestas", JSON.stringify(intentos));
      setIntro(false)
    } else {
      setIntro(true)

    }
    const resueltoLS = localStorage.getItem("resuelto");


    if (vidasRestantes === 0) {
      setFinJuego(true);
      localStorage.setItem("resuelto", "false");
      setMensajeFinal("perdiste");
      setCantLetras([]);
    }

    if (finJuego) {
      if (resueltoLS === "false") {
        setMensajeFinal("perdiste");
        setCantLetras([]);
      }
    }

    if (finJuego) {
      if (resueltoLS === "true") {
        setMensajeFinal("ganaste");
        setCantLetras([]);
      }
    }

  }, [intentos, vidasRestantes, finJuego]);


  //Animación al cargar, chill de cojones
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimar(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const resueltoLS = localStorage.getItem("resuelto")
    if (vidasRestantes == 0 || resueltoLS === "true" || intentos.length == 5) {
      setFinJuego(true)
    }

  }, [intentos, vidasRestantes])



  return (
    <div className={`w-full h-full ${modoOscuro ? "bg-black text-white" : "bg-white text-black"}`}>

      <Header onOpenStats={() => setMostrarStats(!mostrarStats)} onOpenIntro={() => setIntro(!intro)} />

      {mostrarStats && <Stats onClose={() => setMostrarStats(false)} />}
      {!mostrarStats && intro && <Intro onClose={() => setIntro(false)} />}
      {loading && < Loading />}
      {!mostrarStats && !intro && !loading &&

        <main className={modoOscuro ? "bg-black text-white" : "bg-white text-black "}>

          <button onClick={handleChangeDark} className="w-8 absolute cursor-pointer pl-5 pr-5 pt-2 pb-2 left-60 transition-all ease-in-out duration-750 transform  z-10 border-2 rounded-md items-center justify-center flex "><i className={modoOscuro ? "fa-solid fa-toggle-off text-2xl" : "fa-solid fa-toggle-on w-full text-2xl"}></i></button >

          <div className=' w-full flex flex-row relative items-center justify-center'>
            <div className={`flex flex-col w-1/2`}>
              {intentos.map((intento, i) => (
                <div key={i} className={`flex gap-2 justify-center mb-5 transition-all ease-in-out delay-75 duration-750 transform  ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 translate-x-5"}`}>
                  {intento.palabra.split("").map((letra, i) => (
                    <div key={i} className={`w-[60px] h-[60px] border-2 border-black-400 flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out delay-75 duration-750 transform hover:translate-y-1 cursor-pointer 
                          ${modoOscuro
                        ? intento.colores[i] === "bg-green-400"
                          ? "bg-green-800 animate-pulse"
                          : intento.colores[i] === "bg-yellow-400"
                            ? "bg-yellow-600"
                            : intento.colores[i] === "bg-red-400"
                              ? "bg-red-800"
                              : intento.colores[i]
                        : intento.colores[i]}`}>
                      {letra}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <aside className={`hover:bg-amber-200 bg-white z-10  w-1/6 top-0 right-1/8 flex-wrap  border-2 flex absolute text-black cursor-pointer flex-col items-center rounded-md hover:shadow-md shadow-white transition-all ease-in-out delay-75 duration-900  ${animar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
              <span className="font-press flex text-xl mb-2 w-auto  flex-wrap ">Vidas:</span>
              <div className={`flex gap-2 text-2xl  flex-wrap  `}>
                {Array.from({ length: totalVidas }, (_, i) => (
                  <span key={i} className={i < vidasRestantes ? `text-red-500 text-5xl ${corazonesAnimacion()}` : 'text-gray-400 text-5xl'}>
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
              <div key={l} className={`w-[60px] h-[60px] border-2   flex items-center justify-center text-2xl font-bold uppercase  ${modoOscuro ? "bg-gray-600 border-white" : " bg-white border-red-700"}  transition-all ease-in-out delay-75 duration-700 transform rounded-sm `}>
              </div>
            )
            )}
          </div>

          <div className='flex justify-center mb-3 animate-girar '>

            {finJuego && <MensajeFinal mensajeFinal={mensajeFinal} />}
          </div>

          {
            finJuego &&
            <div className='flex relative justify-self-center border-2 font-bold border-black  rounded-md bg-blue-400 text-white  cursor-pointer transition-all text-2xl ease-in-out duration-300 hover:bg-white hover:text-black hover:translate-y-1 hover:animate-none'>
              <button className='cursor-pointer w-full h-full flex p-2' onClick={() => [vaciarLocalStorage(), setCartelVidas(vidasRestantes == 0 ? true : false)]}>Jugar de nuevo </button>
            </div>
          }
          {
            cartelVidas &&
            <div className={`flex gap-1 justify-center flex-col  text-md font-press bg-amber-200 absolute rounded-md border-2 top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-20 items-center ${modoOscuro ? "text-black" : "text:white"}`}>
              <span>Te quedaste sin vidas</span>
              <p>Inténtalo nuevamente mas tarde</p>
              <span className='absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={() => setCartelVidas(!cartelVidas)}>x</span>
            </div>
          }


          <Footer />
        </main >
      }
    </div >

  )

}

