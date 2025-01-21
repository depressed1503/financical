import { Input } from "@/components/ui/input"
import { useState } from "react"
import "./CategoryIconChooseComponent.css"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/lib/queryFunctions"
import { useAuth } from "@/context/authContext"
import { Button } from "@/components/ui/button"
import CategoryIcon from "../CategoryIcon/CategoryIcon"

export default function CategoryIconChooseComponent(props: {onClose: () => void}) {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [currentName, setCurrentName] = useState<string>("")
    const [currentColor, setCurrentColor] = useState<string>("#000000")
    const [currentIcon, setCurrentIcon] = useState<string>("😀")
    const categoryCreateMutation = useMutation({
        mutationFn: () => createCategory(user?.id, currentName, currentColor, currentIcon),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["user_categories"]})
    })
    return (
        <div className="flex flex-col gap-1 justify-center w-100">
            <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)}placeholder="Название"></Input>
            <CategoryIcon color={currentColor} icon={currentIcon}></CategoryIcon>
            <Input value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} type="color"></Input>
            <Input value={currentIcon} onChange={(e) => {if (e.target.value.length <= 3) setCurrentIcon(e.target.value)}} placeholder="Иконка или эмодзи"></Input>
            <Button onClick={() => {categoryCreateMutation.mutate(); props.onClose()}}>Добавить категорию</Button>
        </div>
    )
}