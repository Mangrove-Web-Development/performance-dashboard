import {getData} from "./getData";

export async function getClients(filter?: any , sorts?: any) {
    try {
        console.log(`${import.meta.env.VITE_REPORTS_API_URL}/clients`)
        return await getData(`${import.meta.env.VITE_REPORTS_API_URL}/clients`);
    } catch (error: any) {
        console.log(error.body);
    }
}
