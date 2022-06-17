export const convertUtcToWord = (str) =>  {
    let date = new Date(str).toDateString();
    date = `${date.split(' ')[2]} ${date.split(' ')[1]} ${date.split(' ')[3]}`;
    return date;
}