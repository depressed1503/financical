import AddComponent from "@/components/IndexPage/AddComponent"
import CategoriesComponent from "@/components/IndexPage/CategoriesComponent"
import SpendingsComponent from "@/components/IndexPage/SpendingsComponent"
import { useAuth } from "@/context/authContext"
 
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export default function IndexPage() {
    const { user } = useAuth()
    const [date, setDate] = useState<DateRange | undefined>(() => { 
        const today = new Date()
        return {
            from: new Date(today.getFullYear(), today.getMonth(), 1),
            to: new Date(today.getFullYear(), (today.getMonth() + 1) % 12, 0),
        }
    })
    return (
        <>
            {user ?
                <>
                    <div className="flex flex-col gap-1 justify-center mx-auto max-w-[400px]">
                        <div className={"grid gap-2"}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                        "justify-start text-left font-normal",
                                        "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <CategoriesComponent date={date}></CategoriesComponent>
                        <AddComponent></AddComponent>
                        <SpendingsComponent date={date}></SpendingsComponent>
                    </div>
                </>
                :
                <>
                    <div className="flex flex-col">
                        <a href="/login">login page</a>
                        <a href="/registration">registration page</a>
                    </div>
                </>
            }
        </>
    )
}