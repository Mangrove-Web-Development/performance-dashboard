export const timestampToDate = (timestamp: number) => {
    const dateObject = new Date(timestamp * 1000);
    const day = dateObject.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[dateObject.getMonth()];
    const hours = dateObject.getHours();
    const minutes = "0" + dateObject.getMinutes();
    const seconds = "0" + dateObject.getSeconds();
    return `${month} ${day} / ${hours}:${minutes.substring(0, 2)}:${seconds.substring(0, 2)}`;
}
