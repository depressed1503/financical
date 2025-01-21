import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getCurrentUserCategories, getCurrentUserSpendings } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import CategoryIconChooseComponent from "../CategoryIconChooseComponent";
import { DateRange } from "react-day-picker";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoriesComponent(props: {date: DateRange | undefined}) {
    const { data: userCategories } = useQuery({
        queryKey: ["user_categories"],
        queryFn: getCurrentUserCategories
    })
    const { data: userSpendings } = useQuery({
        queryKey: ["user_spendings", props.date],
        queryFn: () => getCurrentUserSpendings(props.date)
    })
    const datasets = useMemo(() => 
        [...userCategories?.data || [], {id: null}].map((category) => userSpendings?.data.filter((spending) => spending.category == category.id).map((spending2) => spending2.sum).reduce((a, b) => a+b, 0)),
    [userCategories, userSpendings])
    console.log(datasets)
    const [newCategoryDialogShown, setNewCategoryDialogShown] = useState<boolean>(false)

    return (
        <div className="flex flex-col justify-center">
            <Dialog open={newCategoryDialogShown} onOpenChange={setNewCategoryDialogShown}>
                <DialogTrigger asChild>
                    <Badge className="h-12">
                        <Plus></Plus>
                        Категория
                    </Badge>
                </DialogTrigger>
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
                        backgroundColor: [...userCategories?.data.map((category) => category.color) || [], "#ddd"],
                        borderWidth: 0
                    }
                ]
            }}></Doughnut>
            <span className="font-semibold">Всего: {datasets?.flat().reduce((a, b) => (a ?? 0) + (b ?? 0), 0)}</span>
        </div>
    )
}