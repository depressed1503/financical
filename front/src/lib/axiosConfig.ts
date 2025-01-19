import axios from "axios"

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