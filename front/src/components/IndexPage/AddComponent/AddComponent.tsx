import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/authContext";
import { createSpending } from "@/lib/queryFunctions";
import { Category } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddComponent() {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const userCategories = queryClient.getQueryData(["user_categories"])
    const [addSpendingDialogShow, setAddSpendingDialogShown] = useState<boolean>(false)
    const [currentName, setCurrentName] = useState<string>("")
    const [currentText, setCurrentText] = useState<string>("")
    const [currentCategory, setCurrentCategory] = useState<string>()
    const [currentSum, setCurrentSum] = useState<string>("")
    const [currentTime, setCurrentTime] = useState(() => {
        const now = new Date()
        return now.toISOString()
    })
    const createSpendingMutation = useMutation({
        mutationFn: () => createSpending(user?.id, parseFloat(currentSum), currentTime, parseInt(currentCategory!), currentName, currentText),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["user_spendings"]})
    })
    return (
        <>
            <Dialog open={addSpendingDialogShow} onOpenChange={setAddSpendingDialogShown}>
                <DialogTrigger asChild>
                    <Badge className="h-12">
                        <Plus></Plus>
                        Трата
                    </Badge>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Добавление траты</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col gap-1">
                            <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)} type="text" placeholder="Название"></Input>
                            <Input value={currentSum} onChange={(e) => setCurrentSum(e.target.value)} type="number" placeholder="Сумма"></Input>
                            <Input value={currentText} onChange={(e) => setCurrentText(e.target.value)} type="text" placeholder="Описание"></Input>
                            <Select value={currentCategory} onValueChange={setCurrentCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Категория" />
                            </SelectTrigger>
                            <SelectContent>
                                {userCategories && (userCategories as AxiosResponse).data?.map((category: Category) => 
                                {
                                    return <SelectItem key={category.name} value={category.id.toString()}>{category.icon} {category.name}</SelectItem>
                                })}
                            </SelectContent>
                            </Select>
                            <Input type="datetime-local" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)}></Input>
                            <Button onClick={() => {createSpendingMutation.mutate(); setAddSpendingDialogShown(false)}}>Создать трату</Button>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}