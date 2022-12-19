import {PsiParameterInterface} from "../interfaces";

export function usePsiQuery(siteUrl: string, device: 'MOBILE' | 'DESKTOP') {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters:PsiParameterInterface = {
        url: encodeURIComponent(siteUrl),
        strategy: device,
    };
    let query = `${api}?`;
    for (let key in parameters) {
        query += `${key}=${parameters[key as keyof PsiParameterInterface]}&`;
    }

    // Add API key to query
    query += `&key=${import.meta.env.VITE_PSI_APIKEY}`;
    return query;
}
