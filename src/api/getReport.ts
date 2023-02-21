import {getData} from "./getData";

export async function getReport(reportId: string) {
    try {
        const reportIdQuery = reportId ? `/reports/${reportId}` : '';
        return await getData(`${import.meta.env.VITE_REPORTS_API_URL}${reportIdQuery}`);
    } catch (error: any) {
        console.log(error.body);
    }
}
