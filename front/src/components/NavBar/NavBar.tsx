import { useNavigate } from "react-router"
import "./NavBar.css"
import img from "@/assets/react.svg"

export default function NavBar() {
    const navigate = useNavigate()
    return (
        <div className="navbar bg-[var(--background)]">
            <img src={img} alt="" />
            <span onClick={() => navigate("/")} className="navbar__title">Financical</span>
        </div>
    )
}