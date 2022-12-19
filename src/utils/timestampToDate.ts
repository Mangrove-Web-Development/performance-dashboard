export const timestampToDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
}
