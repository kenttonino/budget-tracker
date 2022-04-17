export default function toNum(str) {
  let arr = [...str];
  const elementNoComma = arr.filter(element => element !== ",");

  return parseInt(elementNoComma.reduce((firstElement, nextElement) => firstElement + nextElement));
};
