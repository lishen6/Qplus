 function pad2(n) { return n < 10 ? '0' + n : n }

let sixs=function sixs() {
  let date = new Date().getTime()+360000;
  date=new Date(date)
  console.info('这是当前时间+6',date)
  return date.getFullYear().toString()
    + pad2(date.getMonth() + 1)
    + pad2(date.getDate())
    + pad2(date.getHours())
    + pad2(date.getMinutes())
    + pad2(date.getSeconds());
};
export default sixs

