import { useState } from "react"
import "./LoginPage.css"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"

export default function LoginPage() {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login: loginFunction } = useAuth()
    const loginMutation = useMutation({
        mutationFn: async () => loginFunction(login, password)
    })

    return (
        <>
            <div>
                <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <button onClick={() => loginMutation.mutate()}>Войти</button>
            </div>
        </>
    )
}