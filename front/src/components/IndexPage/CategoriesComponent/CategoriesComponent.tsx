import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { deleteCategory, getCurrentUserCategories, getCurrentUserSpendings } from "@/lib/queryFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import CategoryIconChooseComponent from "../CategoryIconChooseComponent";
import { DateRange } from "react-day-picker";
import hexToRgba from "@/lib/hexToRgba";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoriesComponent(props: {date: DateRange | undefined}) {
    const queryClient = useQueryClient()
    const { data: userCategories } = useQuery({
        queryKey: ["user_categories"],
        queryFn: getCurrentUserCategories
    })
    const { data: userSpendings } = useQuery({
        queryKey: ["user_spendings", props.date],
        queryFn: () => getCurrentUserSpendings(props.date)
    })
    const deleteCategoryMutation = useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["user_categories"]})
    })
    const datasets = useMemo(() => 
        [...userCategories?.data || [], {id: null}].map((category) => userSpendings?.data.filter((spending) => spending.category == category.id).map((spending2) => spending2.sum).reduce((a, b) => a+b, 0)),
    [userCategories, userSpendings])
    const [newCategoryDialogShown, setNewCategoryDialogShown] = useState<boolean>(false)

    return (
        <div className="flex flex-col justify-center">
            <Dialog open={newCategoryDialogShown} onOpenChange={setNewCategoryDialogShown}>
                <div className="flex gap-1">
                    <DialogTrigger asChild>
                        <Badge className="h-12 flex-1">
                            <Plus></Plus>
                            Категория
                        </Badge>
                    </DialogTrigger>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Badge variant={"destructive"}>
                                <Trash2></Trash2>
                            </Badge>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader></DialogHeader>
                            <DialogTitle>Удаление категорий</DialogTitle>
                            <DialogDescription>
                                <div>
                                    {userCategories?.data.map((category) => {
                                        return (
                                            <>
                                                <div className={`mb-3 h-6 bg-[${category.color}]`}>
                                                    <Trash2 onClick={() => deleteCategoryMutation.mutate(category.id)} style={{display: "inline", cursor: "pointer"}}></Trash2><span className="align-middle">{category.icon} {category.name}</span>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                </div>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Новая категория</DialogTitle>
                    <DialogDescription>
                        <CategoryIconChooseComponent onClose={() => setNewCategoryDialogShown(false)}/>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Doughnut data={{
                labels: [...userCategories?.data.map((category) => category.icon + " " + category.name) || [], "Без категории"],
                datasets: [
                    {
                        label:"₽ потрачено: ",
                        data: datasets,
                        backgroundColor: [...userCategories?.data.map((category) => hexToRgba(category.color)) || [], hexToRgba("#ddd")],
                        borderWidth: 0
                    }
                ]
            }}></Doughnut>
            <span className="font-semibold">Всего: {datasets?.flat().reduce((a, b) => (a ?? 0) + (b ?? 0), 0)}</span>
        </div>
    )
}