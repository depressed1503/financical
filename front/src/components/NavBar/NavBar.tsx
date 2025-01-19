import "./NavBar.css"
import img from "@/assets/react.svg"

export default function NavBar() {
    return (
        <div className="navbar">
            <img src={img} alt="" />
            <span>Financical</span>
        </div>
    )
}