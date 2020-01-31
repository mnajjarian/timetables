export const parseTime = (start: Date, end: Date): string => {
    let msec = +new Date(end) - +new Date(start);
    const hh = Math.floor(msec / 1000 / 60 / 60);
    if(hh === 0) {
        return Math.ceil(msec / 1000 / 60) + ' min'
    }
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    if(mm === 0) return hh + ' h'
    return hh + ' h ' + mm + ' min'
}

export const getTime = (unix: string): string => {
    const date = new Date(unix);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();

    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
};