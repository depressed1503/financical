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
	},
})

Axios.interceptors.request.use(config => {
    // Правильный способ получения куки
    const csrfToken = Cookies.get("csrftoken");
    
    // Для дебага - проверим значение токена
    console.log("[AXIOS] Current CSRF Token:", csrfToken);
    
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    } else {
        console.warn("CSRF token not found in cookies!");
    }
    
    return config;
});
export default Axios