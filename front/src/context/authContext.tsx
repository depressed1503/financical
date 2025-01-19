import { createContext, ReactNode, useContext, useState } from "react"
import { useNavigate } from "react-router"
import Axios from "@/lib/axiosConfig"

const AuthContext = createContext<{
    user: object | null,
    login: (p1: string, p2: string) => void,
    logout: () => void
}>({user: null, login: () => {}, logout: () => {}})

export default function AuthProvider(props: {children: ReactNode}) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    async function login(login: string, password: string) {
        Axios.get("api/csrf/")
        .then(() => {
            Axios.post("api/login/", {
                login,
                password
            }).then((resp) => {
                console.log(resp)
                setUser(resp.data["user"])
                navigate("/")
            }).catch((error) => {
                console.warn(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    async function logout() {
        Axios.get("api/auth/logout/")
        navigate("/")
    }

    return (
        <AuthContext.Provider value={
            {
                user,
                login,
                logout
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
