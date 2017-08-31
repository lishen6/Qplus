/**
 * Created by linger on 2017/7/26.
 */
function pad2(n) { return n < 10 ? '0' + n : n }

var paytiem=function paytiem() {
  var date = new Date().getTime()+1800000;
  date=new Date(date)
  console.info('这是当前时间+6',date)
  return date.getFullYear().toString()+'/'
    + pad2(date.getMonth() + 1)+'/'
    + pad2(date.getDate())+' '
    + pad2(date.getHours())+':'
    + pad2(date.getMinutes())+':'
    + pad2(date.getSeconds());
};
export default paytiem
