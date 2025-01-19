import { createContext, ReactNode, useContext } from "react"
import { useNavigate } from "react-router"
import Axios from "@/lib/axiosConfig"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "@/lib/queryFunctions"

const AuthContext = createContext<{
    user: object | undefined,
    login: (p1: string, p2: string) => void,
    logout: () => void
}>({user: undefined, login: () => {}, logout: () => {}})

export default function AuthProvider(props: {children: ReactNode}) {
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    })
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    async function login(login: string, password: string) {
        Axios.get("api/csrf/")
        .then(() => {
            Axios.post("api/login/", {
                login,
                password
            }).then((resp) => {
                console.log(resp)
                queryClient.invalidateQueries({queryKey: ["user"]})
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
