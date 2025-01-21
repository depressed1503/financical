import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getCurrentUserCategories, getCurrentUserSpendings } from "@/lib/queryFunctions"
import { useQuery } from "@tanstack/react-query"
import { DateRange } from "react-day-picker"
import CategoryIcon from "@/components/IndexPage/CategoryIcon"

export default function SpendingsComponent(props: {date: DateRange | undefined}) {
    const { data: userSpendings } = useQuery({
        queryKey: ["user_spendings", props.date],
        queryFn: () => getCurrentUserSpendings(props.date)
    })
    const { data: userCategories } = useQuery({
        queryKey: ["user_categories"],
        queryFn: getCurrentUserCategories
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle>Траты за период</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                {userSpendings?.data.map((spending) => {
                    const category = userCategories?.data.find((category) => category.id == spending.category)
                    return (
                        <div className="flex items-center gap-2">
                            <CategoryIcon color={category?.color} icon={category?.icon}></CategoryIcon>
                            <span>{spending.name}</span><div className="flex-1 border-dotted border-foreground border-b-[2px]"></div><span className="ml-auto">{spending.sum}₽</span>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}