import { useEffect, useState } from 'react'
import './App.css'

interface Palabra {
  palabra: string,
  colores: string[]
}

export const App = () => {
  const [letras, setLetras] = useState<string[]>([])
  // const [respuesta, setRespuesta] = useState<string>(localStorage.getItem("respuestaCorrecta") || "")
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
  // const [finJuego, setFinJuego] = useState<boolean>(() => {
  //   const resueltoLS = localStorage.getItem("resuelto");
  //   const vidasLS = Number(localStorage.getItem("vidasRestantes"));
  //   return resueltoLS === "true" || vidasLS === 0;
  // });
  const [finJuego, setFinJuego] = useState<boolean>(false)
  const [animar, setAnimar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [mensajeFinal, setMensajeFinal] = useState<string>("")
  const totalVidas = 5
  const [vidasRestantes, setVidasRestantes] = useState<number>(() => {
    const vidasLS = localStorage.getItem("vidasRestantes");
    return vidasLS !== null ? Number(vidasLS) : totalVidas;
  });
  const [modoOscuro, setModoOscuro] = useState(false);
  const [cartelVidas, setCartelVidas] = useState<boolean>(false)
  const [intro, setIntro] = useState<boolean>(true)


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
    const nuevoModo = !modoOscuro
    setModoOscuro(nuevoModo)

    if (nuevoModo) {
      localStorage.setItem("modoOscuro", "true")
      document.documentElement.classList.add("dark")
    } else {
      localStorage.setItem("modoOscuro", "false")
      document.documentElement.classList.remove("dark")
    }
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
          // if (l === respuesta[i]) return `animate-pulse dark:bg-green-800 bg-green-400 `
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
          updateWord(respuesta)
          setFinJuego(true)
          setVidasRestantes(
            vidasRestantes < 4
              ? vidasRestantes + 2
              : vidasRestantes === 4
                ? vidasRestantes + 1
                : vidasRestantes
          );
          localStorage.setItem("vidasRestantes", JSON.stringify(vidasRestantes));
          setCantLetras([])
          setMensajeFinal("ganaste")
        } else {
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
  }, [respuesta])


  //Escuchador al lado oscuro god
  // useEffect(() => {
  //   const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     // setModoOscuro(e.matches);
  //     localStorage.setItem("modoOscuro", `${e.matches}`)
  //     const oscuro = localStorage.getItem("modoOscuro")
  //     const oscuro2 = oscuro === "true"
  //     if (oscuro2) {
  //       setModoOscuro(oscuro2);
  //     }
  //   };

  //   matchDark.addEventListener('change', handleChange); // Detectar cambios
  //   return () => matchDark.removeEventListener('change', handleChange);
  // }, []);

  //game over
  useEffect(() => {
    const resueltoLS = localStorage.getItem("resuelto")
    if (vidasRestantes == 0 || resueltoLS === "true" || intentos.length == 5) {
      setFinJuego(true)
    }

  }, [intentos, vidasRestantes])


  useEffect(() => {
    const temaGuardado = localStorage.getItem("modoOscuro")
    if (temaGuardado) {
      const dark = temaGuardado === "true"
      setModoOscuro(dark)
      document.documentElement.classList.add("dark")
    }
    console.log(modoOscuro)
  }, [modoOscuro])



  return (
    <>
      {loading ? (
        <div className='flex flex-row justify-center w-full items-center h-full dark:bg-black text-white'>
          <span className='flex justify-self-center font-press animate-bounce'>CARGANDO...</span>
          <div className='animate-bounce'>
            <span className='flex  font-press animate-spin'>🕓</span>
          </div>
        </div>
      ) :
        <main className={modoOscuro ? "bg-black text-white h-full " : "bg-white text-black h-full "}>
          <h1 className={`font-press justify-self-center text-3xl p-10 transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Wordle </h1>
          <button onClick={handleChangeDark} className="w-8 absolute cursor-pointer pl-5 pr-5 pt-2 pb-2 left-60  z-10 border-2 rounded-md items-center justify-center flex"><i className={modoOscuro ? "fa-solid fa-toggle-off text-2xl" : "fa-solid fa-toggle-on w-full text-2xl"}></i></button>
          {intro ?
            <div className={`absolute font-press gap-5 h-4/7 flex flex-col border-2  rounded-md ${modoOscuro ? "border-white" : "border-black"} -translate-y-50% w-1/3 z-20  items-center  bg-amber-300 text-black justify-self-center `}>
              <span className='absolute -top-1 right-0 text-3xl p-1 border-2 rounded-b-xl bg-white cursor-pointer hover:-translate-y-1' onClick={() => setIntro(false)}>✖</span>
              <span className='text-2xl pt-2'>Reglas del juego</span >
              <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-red-400 shadow-md'>
                <h3 className='p-1'>Al equivocarte:</h3>
                <p>Al equivocarte vas a perder una vida 💔➖</p>
                <p>El juego terminara al quedarte sin vidas</p>
              </div>
              <div className='w-[90%] border-2 p-1 rounded-md hover:shadow-green-200 shadow-md'>
                <h3 className='p-1'>Al acertar:</h3>
                <p>Al acertar vas a ganar dos vidas ♥➕</p>
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
              <button className={`justify-self-center border-2 p-2 rounded-md bg-blue-400 text-white text-2xl cursor-pointer `} onClick={() => setIntro(false)}>JUGAR</button>
            </div>
            :
            <>
              <div className=' w-full flex flex-row relative items-center justify-center  '>
                <div className={`flex flex-col w-1/2`}>
                  {intentos.map((intento, i) => (
                    <div key={i} className={`flex gap-2 justify-center mb-5 transition-all ease-in-out delay-75 duration-750 transform  ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 translate-x-5"}`}>
                      {intento.palabra.split("").map((letra, i) => (
                        <div key={i} className={`w-[60px] h-[60px] border-2 border-black-400 flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out delay-75 duration-750 transform hover:translate-y-1 cursor-pointer 
                          ${modoOscuro
                            ? intento.colores[i] === "bg-green-400"
                              ? "bg-green-800"
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

                {finJuego ? mensajeFinal?.split("").map((l, i) =>
                  <div key={i} className={`w-[40px] h-[40px]   cursor-pointer delay-300  text-white ${mensajeFinal == "perdiste" ? "bg-orange-400 animate-girar hover:animate-none dark:bg-orange-800" : "bg-blue-400 animate-girar hover:animate-none "}  border-2 dark:border-gray-800 border-white flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out  duration-300  hover:translate-y-1  }`}>
                    {l}
                  </div>) : ""}
              </div>

              {finJuego &&
                <div className='flex relative dark:shadow-white dark:shadow-xl/20 justify-self-center border-2 font-bold border-black p-2 rounded-md bg-blue-400 text-white  cursor-pointer transition-all text-2xl ease-in-out duration-300 hover:bg-white hover:text-black hover:translate-y-1 hover:animate-none'>
                  <button className='cursor-pointer' onClick={() => [vaciarLocalStorage(), setCartelVidas(vidasRestantes == 0 ? true : false)]}>Jugar de nuevo </button>
                </div>
              }
              {cartelVidas &&
                <div className='flex gap-1 justify-center  dark:text-black text-md font-press bg-amber-200 absolute rounded-md border-2 top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-20 items-center '>
                  <span>Te quedaste sin vidas</span>
                  <p>Inténtalo nuevamente mas tarde</p>
                  <span className='absolute top-[-2px] right-0 text-2xl bg-white hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2' onClick={() => setCartelVidas(!cartelVidas)}>x</span>
                </div>
              }

              <footer className='font-press font-extralight w-full sticky-b-0 absolute bottom-0 justify-center flex'>
                <div className='w-1/2 justify-evenly flex-row '>
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

          }
        </main>
      }

    </>

  )
}

