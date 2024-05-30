export const API_KEY = 'AIzaSyASRuLl23A7ixsfMUPP4CR8xpDQ6SZXHvc';

export const value_converter = (value) => {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 10000) {
        return Math.floor(value / 1000) + 'K';
    } else {
        return value;
    }
};
