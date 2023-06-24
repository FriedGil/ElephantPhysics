export function roundToNearestThousandth(num: number): number {
    return Math.round(num * 1000) / 1000;
}