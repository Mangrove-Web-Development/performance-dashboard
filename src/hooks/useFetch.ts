import {useState, useEffect} from "react";

export function useFetch(query: string) {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching');
            const response = await fetch(query);
            const data = await response.json();
            setData(data);
            setStatus('fetched');
        };

        fetchData();
    }, [query]);

    return { status, data };
}
