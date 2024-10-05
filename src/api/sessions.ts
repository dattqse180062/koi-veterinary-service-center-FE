import axios from "axios";
import { User } from "./types"
export async function login(params: { email: string; password: string; }): Promise<User> {
    const response = await axios.post("/api/sessions", { session: params });
    return response.data.data;
}

export async function logout(): Promise<void> {
    await axios.delete("/api/sessions");
}
