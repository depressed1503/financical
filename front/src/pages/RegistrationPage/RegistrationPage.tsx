import { useMutation } from "@tanstack/react-query"
import "./RegistrationPage.css"
import { createUser } from "@/lib/queryFunctions"
import { useState } from "react"
import { useAuth } from "@/context/authContext"

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
        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
            <input placeholder="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
            <input placeholder="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
            <input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
            <input placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <input placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={() => registrationMutation.mutate()}>Зарегистрироваться</button>
        </div>
    )
}