import { useMutation } from "@tanstack/react-query"
import "./RegistrationPage.css"
import { createUser } from "@/lib/queryFunctions"
import { useState } from "react"
import { useAuth } from "@/context/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegistrationPage() {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [login, setLogin] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const {login: loginFunction} = useAuth()
    const registrationMutation = useMutation({
        mutationFn: () => createUser(login, email, password, firstName, lastName).then(() => loginFunction(email, password)).catch((err) => console.log(err))
    })
    return (
        <div className="flex flex-col gap-1 mx-auto max-w-60">
            <Input placeholder="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
            <Input placeholder="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
            <Input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
            <Input placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <Input placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <Button onClick={() => registrationMutation.mutate()}>Зарегистрироваться</Button>
        </div>
    )
}