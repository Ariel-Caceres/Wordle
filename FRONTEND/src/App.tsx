
import { useEffect, useState } from 'react'
import './App.css'

interface Palabra {
  palabra: string,
  colores: string[]
}

export const App = () => {
  const [letras, setLetras] = useState<string[]>([])
  const [respuesta, setRespuesta] = useState<string>("")
  const [cantLetras, setCantLetras] = useState<number[]>([1, 2, 3, 4, 5])
  const [intentos, setIntentos] = useState<Palabra[]>([])
  const [finJuego, setFinJuego] = useState<boolean>(false)
  const [animar, setAnimar] = useState<boolean>(false)
  const [arrayAnimaciones, setArrayDeAnimaciones] = useState<boolean[]>([])

  const updateWord = async (respuesta: string) => {
    const res = await fetch("http://localhost:3000/done", {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        palabra: respuesta,
      })
    })
    if (!res) throw new Error("No anda ja");

  }

  useEffect(() => {
    const resuelto = localStorage.getItem("resuelto")
    if (!resuelto) {
      const fetchData = async () => {
        const res = await fetch("http://localhost:3000/word")
        const data = await res.json()
        setRespuesta(data.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        const numero = []
        for (let i = 0; i < data.name.length; i++) {
          numero.push(i + 1)
        }
        setCantLetras(numero)
        if (cantLetras.length == numero.length) {
          setAnimar(true)
        }

      }
      fetchData()
    } else {
      setFinJuego(true)
      const respuesta = localStorage.getItem("respuesta")
      if (respuesta) {
        const jsonrespuesta = JSON.parse(respuesta)
        setIntentos(jsonrespuesta)
        const respuestaCorrecta = jsonrespuesta[jsonrespuesta.length - 1]
        setRespuesta(respuestaCorrecta.palabra)
        const cantLetrasFetch = []
        for (let i = 0; i < respuestaCorrecta.palabra.length; i++) {
          cantLetrasFetch.push(i + 1)
        }
        setCantLetras(cantLetrasFetch)
      }
    }

  }, [])

  const vacialLocalStorage = () => {
    localStorage.removeItem("resuelto")
    localStorage.removeItem("respuesta")
    window.location.reload()
  }

  useEffect(() => {

    const ingresoLetras = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setLetras(prev => prev.slice(0, -1))
        setArrayDeAnimaciones(prev => prev.slice(0, -1))

        if (intentos.length == 5) return
        if (cantLetras.length <= respuesta.length) {
          setCantLetras(prev => [...prev, prev.length + 1])
        }
      }

      if (!/^[a-zA-Z]$/.test(e.key)) {
        return;
      }
      if (intentos.length <= 4) {
        setLetras(prev => {
          if (prev.length >= respuesta.length) {
            return prev
          }
          return [...prev, e.key.toUpperCase()]
        })
      }
      setCantLetras(prev => prev.slice(0, -1))
      setArrayDeAnimaciones(prev => [...prev, true])


    }
    window.addEventListener("keydown", ingresoLetras)

    return () => {
      window.removeEventListener("keydown", ingresoLetras)
    }

  }, [cantLetras, intentos.length, arrayAnimaciones, respuesta.length])

  useEffect(() => {

    const checkResults = (e: KeyboardEvent) => {
      if (e.key === "Enter" && letras.length == respuesta.length && intentos.length <= 4) {
        const nuevosColores: string[] = letras.map((l, i) => {
          if (l === respuesta[i]) return "bg-green-400 animate-pulse"
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
        }
        setLetras([])
        const arrayAux = []
        for (let i = 0; i < respuesta.length; i++) {
          arrayAux.push(i + 1)
        }
        setCantLetras(arrayAux)

      }

    }
    window.addEventListener("keydown", checkResults)
    return () => {
      window.removeEventListener("keydown", checkResults)
    }
  }, [letras, respuesta, cantLetras, intentos.length])

  useEffect(() => {

    if (intentos.length != 0) {
      localStorage.setItem("respuesta", JSON.stringify(intentos))
    }
    const respuestaStorage = localStorage.getItem("resuelto")
    if (respuestaStorage) {

      setCantLetras([])
    }

  }, [intentos])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimar(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  return (

    <>
      <h1 className={`justify-self-center text-2xl p-10 transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Wordle locura total y absoluta</h1>

      <div className={`flex flex-col`}>
        {intentos.map((intento, i) => (
          <div key={i} className={`flex gap-2 justify-center mb-5 `}>
            {intento.palabra.split("").map((letra, i) => (
              <div key={i} className={`w-[60px] h-[60px] border-2 border-black-400 flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out delay-75 duration-750 transform hover:translate-y-1 cursor-pointer ${intento.colores[i]}`}>
                {letra}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={`flex gap-2 justify-center mb-5 transition-all delay-150 duration-750 ease-in-out ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} `}>

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
      {finJuego &&

        <div className='flex fixed top- justify-self-center border-2 border-black p-2 rounded-md bg-blue-400 text-white animate-bounce cursor-pointer transition-all ease-in-out duration-300 hover:bg-blue-200 hover:text-black hover:translate-y-1 hover:animate-none'>
          <button className='cursor-pointer' onClick={vacialLocalStorage}>Jugar de nuevo por $10 dolares</button>
        </div>
      }

      <footer className='w-full sticky-b-0  absolute bottom-0 justify-center flex'>
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

