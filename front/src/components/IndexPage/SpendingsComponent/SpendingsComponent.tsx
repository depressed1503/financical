import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { 
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { deleteSpending, getCurrentUserCategories, getCurrentUserSpendings, updateSpending } from "@/lib/queryFunctions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DateRange } from "react-day-picker"
import CategoryIcon from "@/components/IndexPage/CategoryIcon"
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AxiosResponse } from "axios";
import { Category, Spending } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import hexToRgba from "@/lib/hexToRgba";

export default function SpendingsComponent(props: {date: DateRange | undefined}) {
    const queryClient = useQueryClient()
    const [dialogShown, setDialogShown] = useState<boolean>(false)
    const { data: userSpendings } = useQuery({
        queryKey: ["user_spendings", props.date],
        queryFn: () => getCurrentUserSpendings(props.date)
    })
    const { data: userCategories } = useQuery({
        queryKey: ["user_categories"],
        queryFn: getCurrentUserCategories
    })
    const updateSpendingMutation = useMutation({
        mutationFn: () => updateSpending({id: dialogId, name: dialogName, sum: parseInt(dialogSum), text: dialogDescription, timestamp: dialogTimestamp, category: dialogCategory}),
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["user_spendings"]}); setDialogShown(false)}
    })
    const deleteSpendingMutation = useMutation({
        mutationFn: () => deleteSpending(dialogId),
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["user_spendings"]}); setDialogShown(false)}
    })
    const [dialogId, setDialogId] = useState<number>(-1)
    const [dialogName, setDialogName] = useState<string>("")
    const [dialogSum, setDialogSum] = useState<string>("")
    const [dialogDescription, setDialogDescription] = useState<string>("")
    const [dialogTimestamp, setDialogTimeStamp] = useState<string>("")
    const [dialogCategory, setDialogCategory] = useState<number | null>(null)
    const groupedItems = useMemo(() => {
        return userSpendings?.data.reduce<Record<string, Spending[]>>((acc, item) => {
            const date = item.timestamp.split("T")[0]
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});
      }, [userSpendings]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Траты за период</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                {groupedItems && Object.entries(groupedItems).reverse().map(([timestamp, spendings]) => {
                    return (
                        <>
                            <strong>{new Date(timestamp).toLocaleDateString("ru-RU")}</strong>
                            {spendings.map((spending) =>{
                                const category = userCategories?.data.find((category) => category.id === spending.category)
                                return (
                                    <Dialog open={dialogShown} onOpenChange={(flag) => {
                                        setDialogId(spending?.id)
                                        setDialogName(spending?.name)
                                        setDialogSum(spending?.sum.toString())
                                        setDialogDescription(spending?.text)
                                        setDialogCategory(spending.category)
                                        setDialogTimeStamp(spending.timestamp)
                                        setDialogShown(flag)
                                    }}>
                                        <DialogTrigger asChild>
                                            <div className="flex items-center gap-2">
                                                <CategoryIcon color={hexToRgba(category?.color)} icon={category?.icon}></CategoryIcon>
                                                <span>{spending.name}</span><div className="flex-1 border-dotted border-foreground border-b-[2px]"></div><span className="ml-auto">{spending.sum}₽</span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{spending.name}</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription className="flex flex-col gap-1">
                                                <Input onChange={(e) => setDialogName(e.target.value)} value={dialogName} placeholder="Название"></Input>
                                                <Input onChange={(e) => setDialogSum(e.target.value)} value={dialogSum} placeholder="Сумма" type="number"></Input>
                                                <Input onChange={(e) => setDialogDescription(e.target.value)} value={dialogDescription} placeholder="Описание" type="text"></Input>
                                                <Select value={dialogCategory?.toString()} onValueChange={(value) => setDialogCategory(parseInt(value))}>
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
                                                <Input onChange={(e) => setDialogTimeStamp(e.target.value)} value={dialogTimestamp} type="datetime-local" ></Input>
                                                <div className="flex gap-1">
                                                    <Badge onClick={() => deleteSpendingMutation.mutate()} variant={"destructive"} className="cursor-pointer">
                                                        <Trash2></Trash2>
                                                    </Badge>
                                                    <Button className="flex-1" onClick={() => updateSpendingMutation.mutate()}>Сохранить</Button>
                                                </div>
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                )
                            })}
                        </>
                    )
                })}
            </CardContent>
        </Card>
    )
}