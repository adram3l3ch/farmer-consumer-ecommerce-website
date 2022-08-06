import axios from "axios";

const axiosConfig = axios.create({
	baseURL: `http://localhost:5000/api/v1`,
	headers: {
		"Cross-Origin-Resource-Policy": "cross-origin",
	},
});

export default axiosConfig;
