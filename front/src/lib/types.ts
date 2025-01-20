export type CustomUser = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    login: string,
}

export type Category = {
    id: number,
    name: string,
    user: number,
    color: string,
    icon: string,
}

export type Spending = {
    id: number,
    user: number,
    sum: number,
    timestamp: string,
    name: string,
    text: string,
    category: number
}