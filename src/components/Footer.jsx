import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import controller from '../assets/game-controller.png'

const Footer = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-3 items-center border-t border-white/40 p-4 text-zinc-300 mt-3">
            <div className="flex flex-col flex-wrap gap-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                    <img src={controller} className="w-7 h-7" />
                    <h1 className="font-bold text-zinc-100">About Input Scope</h1>
                </div>
                <p className="text-zinc-200">
                    Test your controller or steering wheel with this tool to diagnose input failures, and calibration issues.
                </p>
                <p className="hidden lg:block text-zinc-300">
                    Feel free to reach out regarding issues, and help improve the experience.
                </p>
                <span className="self-center lg:self-start text-sm text-zinc-300">Built for gamers, By a gamer.</span>
            </div>
            <a href="https://github.com/Pradeesh-Raj/InputScope"
                className="text-lg flex justify-center items-center gap-2 hover:text-zinc-500 transition-colors"
            >
                <FontAwesomeIcon icon={faGithub} className="text-3xl" />
            </a>
        </div>
    )
}

export default Footer