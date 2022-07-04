export function isNumber(s: string) {
    if (['-', '-.', '.', ''].includes(s)) {
        return true;
    }
    const rgx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    return s.match(rgx);
}
