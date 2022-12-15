export async function getData(query: string) {
    const res = await fetch(query);

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();
}
