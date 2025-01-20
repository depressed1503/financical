import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getCurrentUserCategories, getCurrentUserSpendings } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import CategoryIconChooseComponent from "../CategoryIconChooseComponent";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoriesComponent() {
    const { data: userCategories } = useQuery({
        queryKey: ["user_categories"],
        queryFn: getCurrentUserCategories
    })
    const { data: userSpendings } = useQuery({
        queryKey: ["user_spendings"],
        queryFn: getCurrentUserSpendings
    })

    const [newCategoryDialogShown, setNewCategoryDialogShown] = useState<boolean>(false)

    return (
        <div className="flex flex-col justify-center">
            <Dialog open={newCategoryDialogShown} onOpenChange={setNewCategoryDialogShown}>
                <DialogTrigger asChild>
                    <Badge>
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
                labels: userCategories?.data.map((category) => category.icon + " " + category.name),
                datasets: [
                    {
                        label:"₽ потрачено: ",
                        data: userCategories?.data.map((category) => userSpendings?.data.filter((spending) => spending.category == category.id).map((spending2) => spending2.sum)),
                        backgroundColor: userCategories?.data.map((category) => category.color),
                        borderWidth: 0
                    }
                ]
            }}></Doughnut>
        </div>
    )
}