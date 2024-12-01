import axios from "axios";
import { baseUrl } from "./constants";

const apiClient = axios.create({baseURL:baseUrl});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('auth-token')

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

export default apiClient;