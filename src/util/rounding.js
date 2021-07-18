/**
 * @param {number} num Number to round
 * @param {number} roundTo Closest N to round to. e.g. 50
 */
export function roundTo(num, roundTo) {
    return Math.round(num / roundTo) * roundTo;
}
