import { addDays } from 'date-fns';
import { DateRange } from "react-day-picker"
import Axios from "./axiosConfig"
import { Category, CustomUser, Spending } from "./types"

export async function createUser(login: string, email: string, password: string, first_name: string, last_name: string) {
    return await Axios.post("api/registration/", {
        login, email, password, first_name, last_name, username: email 
    })
}

export async function getCurrentUser() {
    return await Axios.get<CustomUser>("api/current_user/")
}

export async function getCurrentUserCategories() {
    return await Axios.get<Category[]>("api/category/")
}

export async function getCurrentUserSpendings(date: DateRange | undefined) {
    if (date?.from !== undefined && date.to !== undefined)
        return await Axios.get<Spending[]>(`api/spending/?from=${date.from?.toLocaleDateString("ru-RU")}&to=${addDays(date.to, 1)?.toLocaleDateString("ru-Ru")}`)
}

export async function createCategory(user: number | undefined, name: string, color: string, icon: string) {
    if (user !== undefined)
        return await Axios.post<Category>("api/category/", {
            user, name, color, icon
        })
}

export async function deleteCategory(id:number) {
    return await Axios.delete(`api/category/${id}/`)
}

export async function createSpending(user: number | undefined, sum: number | undefined, timestamp: string, category: number | undefined, name: string, text: string) {
    if (user !== undefined &&  sum !== undefined)
        console.log({
            user, sum, timestamp, category, name, text
        })
        return await Axios.post<Category>("api/spending/", {
            user, sum, timestamp, category, name, text
        })
}