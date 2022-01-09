export function formatDate(date, format) {
    const map = {
        mm: ("0" + String(date.getMonth() + 1)).slice(-2),
        dd: ("0" + String(date.getDate())).slice(-2),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
}
