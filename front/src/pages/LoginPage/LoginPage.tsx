import { useState } from "react"
import "./LoginPage.css"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login: loginFunction } = useAuth()
    const loginMutation = useMutation({
        mutationFn: async () => loginFunction(login, password)
    })

    return (
        <>
            <div className="flex flex-col gap-1 mx-auto max-w-60">
                <Input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <Button onClick={() => loginMutation.mutate()}>Войти</Button>
            </div>
        </>
    )
}