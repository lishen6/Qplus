<template>
  <div class="agreement">
    <!--<div v-title>用户协议</div>-->
    <div class="xy-content" v-if="lists.content">
      <!--<h3>中国电信股份有限公司<span class="name">浙江分公司</span>移动电话<br>-->
      <!--入网服务协</h3>-->
      <h3 @click="turn">{{lists.title}}</h3>
      <div class="content-box" v-html="unescape(lists.content)"></div>
    </div>
    <div class="footer-block"></div>
    <div class="footer bottomfix" v-if="lists.content"><span class="btn" @click="show">确认</span></div>
    <!--弹窗蒙层-->
    <div class="pal-box"></div>
    <div class="agree">
      <h3>我已阅读并同意《入网服务协议》</h3>
      <div>
        <button @click="close()">不同意</button>
        <button>
          <router-link to="/xuanhao0">同意</router-link>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../header/index.vue'
  import A from '../directive'
  import $ from 'jquery';
  import local from '../../common/js/localStorage'
  import {mapState} from 'vuex'
  import document from '../../common/js/title'
  export default {
    data () {
      return {
        title: '用户协议',
        lists: ''
      }
    },
    methods: {
      show(){
        $('.pal-box').fadeIn(200);
        $('.agree').show(300);
      },
      close(){
        $('.pal-box').fadeOut(200);
        $('.agree').hide();
      },
      turn(){
        // console.info($('.content-box').html())
      },
      unescape: function (value) {
        return value
          .replace(value ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      }

    },
//      computed:{
//
//      },
    components: {
      'v-header': header
    },
    created(){
      document('用户协议');
      let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
      this.$http.get('https://api.bridgingtop.com/Sim/GetProtocol', {
        params: {
          areaid: areaid
        }
      }).then((res) => {
        console.info('协议', res);
        let data = res.bodyText;
        this.lists = JSON.parse(data).Data;
//        $('.content-box').css({color:'red'})
      });

    },
    mounted(){
      $('.content-box').find('p').css({textIndent:0})
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
