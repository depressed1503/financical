import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router"
import AuthProvider, { useAuth } from "@/context/authContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/themeProvider"
import LoginPage from "@/pages/LoginPage"
import IndexPage from "@/pages/IndexPage"
import TestPage from "./pages/TestPage"
import RegistrationPage from "./pages/RegistrationPage"
import NavBar from "./components/NavBar"

type PrivateRouteProps = {
	isForAuthenticated: boolean,
}

function PrivateRoute({isForAuthenticated}: PrivateRouteProps) {
	const { pathname, search } = useLocation()
	const redirectRoute = new URLSearchParams(search).get('redirect') ?? '/'
	const { user } = useAuth()
    console.log(user)
	return (
		!((user == undefined) !== !isForAuthenticated) ? <Outlet></Outlet> : <Navigate  to={!isForAuthenticated ? `${redirectRoute}` : `/login/?redirect=${pathname}`}/>
	)
}

const queryClient = new QueryClient()

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> 
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
                                    <Route path="/test" element={<TestPage></TestPage>}></Route>
                                </Route>
                            </Routes>
                        </div>
                    </AuthProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

