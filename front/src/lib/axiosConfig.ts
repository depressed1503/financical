import axios from "axios"

export const backendHost = ((import.meta.env.VITE_DEBUG == "1") ? "http://" : "https://") + (import.meta.env.VITE_BACKEND_IP ?? "localhost:8000") + '/'
const Axios = axios.create({
    xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
	withCredentials: true,
	withXSRFToken: true,
	baseURL: "http://127.0.0.1:8000/",
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	},
})

export default Axios