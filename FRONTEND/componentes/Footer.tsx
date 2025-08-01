
export interface animarinterface {
    animar: boolean
    animacion: string
}

export const Footer = (animar: animarinterface) => {
    return (
        <footer className={`font-press font-extralight w-full sticky-b-0 absolute bottom-0 justify-center flex ${animar ? animar.animacion : ""}`}>
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
    )
}