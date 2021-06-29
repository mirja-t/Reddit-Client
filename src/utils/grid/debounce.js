/**
 * Debounces function calls triggered by event fired
 * @param {function} callback
 * @param {number} wait - interval
 * @return {function}
 */
 export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}