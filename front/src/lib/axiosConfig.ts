import axios from "axios"	
import Cookies from "js-cookie"

export const backendHost = ((import.meta.env.VITE_DEBUG == "1") ? "http://" : "https://") + (import.meta.env.VITE_BACKEND_IP ?? "127.0.0.1:8000") + '/'
const Axios = axios.create({
    xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
	withCredentials: true,
	withXSRFToken: true,
	baseURL: backendHost,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"X-CSRFToken": Cookies.get("csrftoken")
	},
})

export default Axios