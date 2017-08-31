/**
 * Created by linger on 2017/8/2.
 */
let documents= function(t) {
  document.title = t;
  var i = document.createElement('iframe');
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function(){
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
};
export  default documents

