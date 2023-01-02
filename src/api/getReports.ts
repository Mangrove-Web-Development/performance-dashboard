import {getData} from "./getData";

export async function getReports(clientId: string) {
    try {
        const clientIdQuery = clientId ? `/clients/${clientId}` : '';
        return await getData(`${import.meta.env.VITE_REPORTS_API_URL}${clientIdQuery}`);
    } catch (error: any) {
        console.log(error.body);
    }
}
