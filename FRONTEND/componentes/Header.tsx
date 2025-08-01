
interface HeaderProps {
    onOpenStats: () => void
    onOpenIntro: () => void
    animar: boolean
}

export const Header = ({ onOpenStats, onOpenIntro, animar }: HeaderProps) => {


    return (
        <header className={`flex justify-center items-center font-press `}>
            <div className={`items-center justify-center flex  pl-2 pr-2 pt-2 pb-2  hover:border-white hover:inset-ring-2 cursor-pointer rounded-xl transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} `} onClick={onOpenStats}>
                <i className="fa-solid fa-chart-simple"></i>
            </div>
            <div>
                <h1 className={`font-press justify-self-center text-3xl p-10 transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Wordle </h1>
            </div>
            <div className={`items-center justify-center flex  pl-2 pr-2 pt-2 pb-2  hover:border-white hover:inset-ring-2 cursor-pointer  rounded-xl transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} onClick={onOpenIntro}>
                <i className="fa-solid fa-question" ></i>
            </div>
        </header>
    )
}