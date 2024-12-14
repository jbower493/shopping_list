import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://5e34-106-70-122-79.ngrok-free.app",
    headers: {
        common: {
            "Content-Type": "application/json",
        },
    },
});
