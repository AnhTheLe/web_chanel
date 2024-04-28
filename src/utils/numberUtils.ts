export function getExactNumberValue(num: number) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}
export function isNumber(num: string) {
  return /^\d+$/.test(num);
}
