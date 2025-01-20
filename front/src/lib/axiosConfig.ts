import axios from "axios"

export const backendHost = ((import.meta.env.VITE_DEBUG == "1") ? "http://" : "https://") + (import.meta.env.VITE_BACKEND_IP ?? "localhost:8000") + '/'
console.log(import.meta.env.VITE_DEBUG, backendHost)
const Axios = axios.create({
    xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
	withCredentials: true,
	withXSRFToken: true,
	baseURL: backendHost,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	},
})

export default Axios