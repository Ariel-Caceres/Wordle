
interface HeaderProps {

    cerrarModal: () => void
    animarLogo: () => void
    animar: boolean

    animarStatsIcon: boolean
    animarIntroIcon: boolean
    handleClickStats: () => void
    handleClickIntro: () => void
}

export const Header = ({ animar, cerrarModal, animarLogo, animarStatsIcon, animarIntroIcon, handleClickStats, handleClickIntro }: HeaderProps) => {

    const handleClick = () => {
        cerrarModal()
        animarLogo()
    }



    return (
        <header className={`flex justify-center items-center font-press p-10 gap-10 `}>
            <div className={`items-center justify-center flex  pl-2 pr-2 pt-2 pb-2  hover:border-white hover:inset-ring-2 cursor-pointer rounded-xl transition-all ease-in-out delay-75 duration-250 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} `} onClick={handleClickStats}>
                <i className={`fa-solid fa-chart-simple justify-self-start ${animarStatsIcon ? "animate-girarIconos" : ""}`}></i>

            </div>
            <div className={` hover:animate-girar  transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} onClick={handleClick}>
                <h1 className={`font-press justify-self-center cursor-pointer p-0 text-3xl `}>Wordle </h1>
            </div>
            <div className={`items-center justify-center flex px-2 py-2  hover:border-white hover:inset-ring-2 cursor-pointer  rounded-xl transition-all ease-in-out delay-75 duration-250 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} onClick={handleClickIntro}>
                <i className={`fa-solid fa-question justify-self-start ${animarIntroIcon ? "animate-girarIconos" : ""}`}></i>
            </div>
        </header >
    )
}