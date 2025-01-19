import Axios from "./axiosConfig"

export async function createUser(login: string, email: string, password: string, first_name: string, last_name: string) {
    return await Axios.post("api/registration/", {
        login, email, password, first_name, last_name, username: email 
    })
}