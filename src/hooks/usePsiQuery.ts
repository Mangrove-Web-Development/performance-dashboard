export function usePsiQuery(siteUrl: string) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        url: encodeURIComponent(siteUrl)
    };
    let query = `${api}?`;
    for (let key in parameters) {
        query += `${key}=${parameters[key]}`;
    }

    // Add API key to query
    query += `&key=${import.meta.env.VITE_PSI_APIKEY}`;
    return query;
}
