/**
 * Created by linger on 2017/7/20.
 */
import Vue from 'vue';

 var A= Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText;
    el.remove()
  }
});
 export default A

