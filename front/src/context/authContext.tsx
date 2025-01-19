import { createContext, ReactNode, useContext } from "react"
import { useNavigate } from "react-router"
import Axios from "@/lib/axiosConfig"

const AuthContext = createContext<{
    login: (p1: string, p2: string) => void,
    logout: () => void
}>({login: () => {}, logout: () => {}})

export default function AuthProvider(props: {children: ReactNode}) {
    const navigate = useNavigate()

    async function login(login: string, password: string) {
        Axios.get("api/csrf/")
        .then(() => {
            Axios.post("api/login/", {
                login,
                password
            }).then((resp) => {
                console.log(resp)
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
