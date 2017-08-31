/**
 * Created by linger on 2017/7/29.
 */
import Vue from 'vue';
import $ from 'jquery';


var B= Vue.directive('pal', {
  inserted: function (el) {
    $(el).fadeIn(200,function () {
      $(el).fadeOut(200)
    }).delay(2000);
  }
});
export default B

