
import { useEffect, useState } from 'react'
import './App.css'

interface Palabra {
  palabra: string,
  colores: string[]
}

export const App = () => {
  const [letras, setLetras] = useState<string[]>([])
  const [respuesta, setRespuesta] = useState<string>("")
  const [cantLetras, setCantLetras] = useState<number[]>([])
  const [intentos, setIntentos] = useState<Palabra[]>([])
  const [finJuego, setFinJuego] = useState<boolean>(false)
  const [animar, setAnimar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [mensajeFinal, setMensajeFinal] = useState<string>()
  const totalVidas = 5
  const vidasRestantes = totalVidas - intentos.length


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
      if (!res.ok) throw new Error("Error al actualizar el estado de la palabra", data.message);
      setLoading(false)
    } catch (error) {
      console.log("Error al actualizar el estado de la palabra", error)
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
    if (vidasRestantes != 0) {

      localStorage.removeItem("resuelto")
      localStorage.removeItem("respuesta")
      localStorage.removeItem("respuestaCorrecta")
      setMensajeFinal("")
      window.location.reload()
    } else {
      console.log("te quedaste sin vidas")
    }
  }
  const quitarAcentos = (letra: string) => {
    return letra.replace(/[áÁ]/g, 'A')
      .replace(/[éÉ]/g, 'E')
      .replace(/[íÍ]/g, 'I')
      .replace(/[óÓ]/g, 'O')
      .replace(/[úÚ]/g, 'U')
  }
  const corazonesAnimacion = () => {
    if (vidasRestantes <= 2) {
      return "animate-girar"
    }

  }
  //FETCH DE LA PALABRA
  useEffect(() => {

    const resuelto = localStorage.getItem("resuelto")
    const intentosLS = localStorage.getItem("respuesta")
    if (!resuelto && !intentosLS && vidasRestantes !== 0) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const res = await fetch("http://localhost:3000/word")
          const data = await res.json()
          if (!res.ok) {
            throw new Error("Error al traer productos"), await data.message;
          }
          setRespuesta(quitarAcentos(data.name.toUpperCase()))
          localStorage.setItem("respuestaCorrecta", quitarAcentos(data.name.toUpperCase()))
          forCantLetras(data.name)
          setLoading(false)
        } catch (error) {
          console.log("Error al traer palabra", error)

        }
      }
      fetchData()
    }
  }, [])


  // CONSOLE LOG PARA CONTROLAR 
  useEffect(() => {
    console.log(respuesta)
  }, [respuesta])


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
          if (l === respuesta[i]) return `bg-green-400 animate-pulse  hover:-translate-y-20`
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
          updateWord(respuesta)
          setFinJuego(true)
          setCantLetras([])
          setMensajeFinal("ganaste")
        }
        setLetras([])
        forCantLetras(respuesta)
      }

    }
    window.addEventListener("keydown", checkResults)
    return () => {
      window.removeEventListener("keydown", checkResults)
    }
  }, [letras, respuesta, intentos.length, finJuego])


  //Agregar intentos al LS
  useEffect(() => {
    if (intentos.length != 0) {
      localStorage.setItem("respuesta", JSON.stringify(intentos))
    }

  }, [intentos])


  //Fin del juego si hay 5 intentos
  useEffect(() => {
    if (intentos.length >= 5) {
      setCantLetras([]);
      setFinJuego(true)
    }

    const resuelto = localStorage.getItem("resuelto")
    if (intentos.length >= 5 && !resuelto) {
      setMensajeFinal("perdiste")
    }
    if (resuelto) {
      setCantLetras([]);
      setMensajeFinal("ganaste")
    }
  }, [intentos.length]);


  //CHECK localStorage
  useEffect(() => {
    setLoading(true)
    const respuestaStorage = localStorage.getItem("resuelto")
    if (respuestaStorage) {
      setCantLetras([])
      setFinJuego(true)
      setMensajeFinal("ganaste")
    }

    const intentosLS = localStorage.getItem("respuesta")
    const respuestaCorrectaLS = localStorage.getItem("respuestaCorrecta")
    if (intentosLS && respuestaCorrectaLS) {
      setIntentos(JSON.parse(intentosLS))
      setRespuesta(respuestaCorrectaLS)
      forCantLetras(respuestaCorrectaLS)
      setLoading(false)
    }
    const timer = setTimeout(() => {
      setAnimar(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])



  return (

    <>
      <h1 className={` font-press justify-self-center text-3xl p-10 transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Wordle </h1>

      {loading ? (
        <span className='flex justify-self-center font-press animate-bounce'>CARGANDO...</span>
      ) :

        <div className=' w-full flex flex-row relative items-center justify-center '>
          <div className={`flex flex-col  w-1/2`}>
            {intentos.map((intento, i) => (
              <div key={i} className={`flex gap-2 justify-center mb-5 transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 translate-x-5"}`}>
                {intento.palabra.split("").map((letra, i) => (
                  <div key={i} className={`w-[60px] h-[60px] border-2 border-black-400 flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out delay-75 duration-750 transform hover:translate-y-1 cursor-pointer ${intento.colores[i]}`}>
                    {letra}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <aside className='bg-amber-200 w-1/6 top-0 right-40 border-2 flex absolute text-black flex-col items-center rounded-md'>
            <span className="font-press block text-xl mb-2 w-auto ">Vidas:</span>
            <div className={`flex gap-2 text-2xl `}>
              {Array.from({ length: totalVidas }, (_, i) => (
                <span key={i} className={i < vidasRestantes ? `text-red-500 text-5xl ${corazonesAnimacion()}` : 'text-gray-400 text-5xl  transition-all ease-in-out duration-200 delay-100 '}>
                  ♥
                </span>


              ))}


            </div>
          </aside>
        </div>
      }


      <div className={`flex gap-2  justify-center mb-5 transition-all delay-150 duration-750 ease-in-out ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} `}>

        {letras.map((letra, i) => (
          <div key={i} className={` w-[60px] h-[60px] border-2 border-red-400 flex items-center justify-center  text-2xl font-bold uppercase transition-all ease-in-out delay-150 duration-150 rounded-sm  `}>
            {letra}
          </div>
        ))}

        {cantLetras.map((l) => (
          <div key={l} className={`w-[60px] h-[60px] border-2 border-red-700 flex items-center justify-center text-2xl font-bold uppercase bg-white transition-all ease-in-out delay-75 duration-700 transform rounded-sm `}>
          </div>
        )
        )}
      </div>

      <div className='flex justify-center mb-3 animate-girar '>

        {mensajeFinal?.split("").map((l, i) =>
          <div key={i} className={`w-[40px] h-[40px]  cursor-pointer delay-300  text-white ${mensajeFinal == "perdiste" ? "bg-orange-400 animate-wiggle hover:animate-none" : "bg-blue-400 animate-girar hover:animate-none"}  border-2 border-white flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out  duration-300  hover:translate-y-1  }`}>
            {l}
          </div>)}
      </div>

      {finJuego &&
        <div className='flex relative  justify-self-center border-2 font-bold border-black p-2 rounded-md bg-blue-400 text-white  cursor-pointer transition-all text-2xl ease-in-out duration-300 hover:bg-white hover:text-black hover:translate-y-1 hover:animate-none'>
          <button className='cursor-pointer' onClick={vaciarLocalStorage}>Jugar de nuevo </button>
        </div>
      }
      {vidasRestantes == 0 &&
        <div className='flex justify-center bg-amber-200 absolute rounded-md border-2 top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-20 items-center '>
          <span>Te quedaste sin vidas</span> 
          <p>Intentalo nuevamente mas tarde</p>
          <span className='absolute top-[-2px] right-0 text-2xl bg-white rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2'>x</span>
        </div>
      }


      <footer className='font-press font-extralight w-full sticky-b-0  absolute bottom-0 justify-center flex'>
        <div className='w-1/2 justify-evenly flex-row '>
          <h2 className='text-2xl justify-self-center'>Aclaraciones:</h2>
          <ul className='flex gap-[10px] justify-center'>
            <li>
              <span>Correcto</span>
              <span >🟩</span>
            </li>
            <li>
              <span>Parcialmente Correcto</span>
              <span>🟨</span>
            </li>
            <li>
              <span>Incorrecto</span>
              <span>🟥</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

