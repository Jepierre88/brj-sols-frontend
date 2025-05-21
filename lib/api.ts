import axios from "axios";
import { auth } from "./auth";

export const createApi = async () => {
    const session = await auth()
    const token = ""
    return axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'idCompany': session?.selectedCompany?.id
        },
    });
};
