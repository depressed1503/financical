import AddComponent from "@/components/IndexPage/AddComponent"
import CategoriesComponent from "@/components/IndexPage/CategoriesComponent"
import { useAuth } from "@/context/authContext"

export default function IndexPage() {
    const { user } = useAuth()

    return (
        <>
            <h1>Index Page</h1>
            <div className="flex flex-col gap-1 justify-center mx-auto max-w-[400px] text-[#fff]">
                <CategoriesComponent></CategoriesComponent>
                <AddComponent></AddComponent>
            </div>
            {user ?
                <>
                    
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