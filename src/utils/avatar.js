
const colorMap = [
  'rgb(243,128,147)',
  'rgb(245,154,103)',
  'rgb(150,204,112)',
  'rgb(108,211,223)',
  'rgb(126,186,239)',
  'rgb(177,157,219)',
];


export function getColorByChar(str) {
  const random = str.charCodeAt(0) % 6;
  return colorMap[random];
}
