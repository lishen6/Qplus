/**
 * Created by linger on 2017/7/26.
 */
let parame =function GetQueryString(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return unescape(decodeURI(r[2])); return null;
};

export default parame

// unescape(decodeURI(location.search))
