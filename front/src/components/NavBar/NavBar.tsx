import { useNavigate } from "react-router"
import "./NavBar.css"
import img from "@/assets/react.svg"
import { useTheme } from "../themeProvider"
import { Moon, Sun } from "lucide-react"

export default function NavBar() {
    const navigate = useNavigate()
    const { setTheme, theme } = useTheme()
    return (
        <div className="flex items-center justify-between bg-[--background] p-4">
            <div className="flex-1 flex justify-center items-center space-x-6">
                <img src={img} alt="" />
                <span onClick={() => navigate("/")} className="navbar__title">Financical</span>
            </div>
            
            <div className="ml-auto items-center">
                <span onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {
                        theme === "dark" ? <Sun></Sun> : <Moon></Moon>
                    }
                </span>
            </div>
        </div>
    )
}