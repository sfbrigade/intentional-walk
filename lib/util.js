export function numberWithCommas(num) {
  return num !== undefined
    ? Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : 0;
}
