import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router"
import AuthProvider, { useAuth } from "@/context/authContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoginPage from "@/pages/LoginPage"
import IndexPage from "@/pages/IndexPage"
import NavBar from "./components/NavBar"
import RegistrationPage from "./pages/RegistrationPage"

type PrivateRouteProps = {
	isForAuthenticated: boolean,
}

function PrivateRoute({isForAuthenticated}: PrivateRouteProps) {
	const { pathname, search } = useLocation()
	const redirectRoute = new URLSearchParams(search).get('redirect') ?? '/'
	const { user } = useAuth()
	return (
		!((user == undefined) !== !isForAuthenticated) ? <Outlet></Outlet> : <Navigate  to={!isForAuthenticated ? `${redirectRoute}` : `/login/?redirect=${pathname}`}/>
	)
}

const queryClient = new QueryClient()

export default function AppRoutes() {
    return (
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NavBar></NavBar>
                <div style={{ padding: "15px "}}>
                    <Routes>
                        <Route element={<PrivateRoute isForAuthenticated={true} />}>

                        </Route>
                        <Route element={<PrivateRoute isForAuthenticated={false} />}>
                            <Route path="/login" element={<LoginPage/>}></Route>
                            <Route path="/registration" element={<RegistrationPage/>}></Route>
                        </Route>
                        <Route>
                            <Route path="/" element={<IndexPage/>}></Route>
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </QueryClientProvider>
        </BrowserRouter>
    )
}

