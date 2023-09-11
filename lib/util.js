export function numberWithCommas(num) {
  return num !== undefined
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : 0;
}
