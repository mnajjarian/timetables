import { Legs } from './api/interfaces';

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

export const switchMode = (mode: string): string => {
    switch (mode) {
        case Legs.WALK:
            return 'fa fa-ellipsis-v fa-lg mt-2 mb-2'
        case Legs.RAIL:
            return 'fa fa-grip-lines-vertical fa-lg mt-2 mb-2'
        case Legs.BUSS:
            return 'fa fa-grip-lines-vertical fa-lg mt-2 mb-2'
        default:
            return '';
    }
}