<template>
  <div class="my-oreder">
    <!--<div v-title>我的订单</div>-->
    <div class="items after" v-for="(it,index) in list" v-if="list.length" :key="it.oiid" @click="godetail(it.orderno)">
      <div class="img left">
        <img src="../../img/deluft.png" alt="">
      </div>
      <div class="detail left">
        <div class="item">
          号码：<span>{{it.phone}}</span>
        </div>
        <div class="item tc">
          套餐：<span>{{it.cbname}}</span>
        </div>
        <div class="item">
          {{it.gnvoice}}语音通话
        </div>
        <div class="item">
          <span>{{it.gntraffic}}全国流量</span>／<span>{{it.gnsms}}条短信</span>
        </div>
      </div>
      <!--这是什么鬼　{{holduserid}}{{holdtoken}}-->
      <div class="state right">
        <div class="pay-state">{{it.statusname}}</div>
        <div class="name">{{it.name}}</div>
        <a class="go" v-html="turnvalue(it.status,it.statusname)"
           @click.stop="go(it.status,it.orderno,it.statusname)" :class="'go'+it.status"></a>
        <!--<router-link to="/xuanhao" v-for="(state,key) in it.orderstatushistory" v-if="key==1&&it.status==key"-->
        <!--:key="key">-->
        <!--<div class="go">{{state.statusname}}</div>-->
        <!--</router-link>-->
        <!--<router-link to="/details" v-for="(state,key) in it.orderstatushistory" v-if="key!=0&&key!=1&&it.status==key"-->
        <!--:key="key">-->
        <!--<div class="go">{{state.statusname}}</div>-->
        <!--</router-link>-->
        <!--{{token}}-->
      </div>
    </div>
    <div class="blank">
      <h3>暂无订单</h3>
      <p>你可以在APP，微信公众号下单<a href="http://api.bridgingtop.com/wxinfo/wxinfo.aspx"></a></p>
    </div>
  </div>
</template>

<script>
  import A from '../directive'
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import getsign from '../../common/js/md5'
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage'
  import biaoti from '../../common/js/title'
  import parame from '../../common/js/parame'
  import $ from 'jquery';
  export default {
    data () {
      return {
        list: '',
        holduserid: '',
        holdtoken: '',
        scrollWatch: false
      }
    },
    watch: {
      '$route': 'myorder'
    },
    created(){
      biaoti('我的订单');
      this.getToken();
      this.$nextTick(() => {
        let top=sessionStorage.getItem("top")*1;
        console.info('这几巴是ddd位置记录',top);
      $(window).scrollTop(top+'px');
        $('html body').animate({scrollTop: top}, 100);
      })
    },
    mounted(){
      let top=sessionStorage.getItem("top")*1;
       console.info('这几巴是位置记录',top);
//      $(document).scrollTop(top+'px');
      $('html body').animate({scrollTop: top}, 100);
      console.info('这是几巴执行记录',$(document).scrollTop())
    },
    computed: {
      //      token(){
      ////        alert(this.$store.state.token)
      //        return this.$store.state.token
      //
      //      },
      //      userid(){
      ////        alert(this.$store.state.userid)
      //        return this.$store.state.userid
      //
      //      },
      ...mapState({
        token: function (state) {
//            console.info('这是什么跟',local)
          let gettoken = local.getItem('tokens');
          console.info('linger', local.getItem('tokens'));
          if (state.token === '' && gettoken) {
            this.$store.commit('token', gettoken)
          }
          return state.token
        },
        userid: function (state) {
          let getuserid = local.getItem('userids');
          if (state.userid === '' && getuserid) {
            this.$store.commit('userid', getuserid)
          }
          return state.userid

        }

      })
    },
    methods: {
      //组件的方法 傻逼孩子这是 所以要加this来调用
      getToken(){
//        let openid = "oeHYuxKM5A8J0ax_EXMyKN7ohxa8";
        let openid = parame('openid');
//        let nickname = "去月球";
        let nickname = parame('nickname');
//        console.info('这是森么',nickname);
//        let photourl = "http://wx.qlogo.cn/mmopen/9vvZrqiaLFX2WEpUUr1TnH9S5DVsaVCNocZoj07KGAfvnYjW047n0ia5TIsSFjXQ5Y8TOX1ju64YJrQy14a0TXgGMib6EF9ibZTg/0#/";
        let photourl=parame('headimgurl');
               let unionid=parame('unionid');
//        let unionid = 'oq-qIxAgKAzmhxEX2NCTuV5Iyu8g';
        let timestamp = date();
        let six = sixs();
//       这是参数
        let pars = {
          devicename: '',
//        logintype: 1,
          nickname: nickname,
          openid: openid,
          photourl: photourl,
//        registrationid: '',
          sign: '',
          timestamp: timestamp,
          unionid: unionid
        };
        pars.sign = getsign(pars, 'OtherLoginWX', six);
        this.$http.post('https://api.bridgingtop.com/Member/OtherLoginWX', pars).then((res) => {
          let user = res.body.Data;
          console.info('这是入网jjjj222j人信息', user);
          this.holduserid = user.userid;
          this.holdtoken = user.token;
          if (this.holdtoken && this.holduserid) {
            this.myorder()
          }
        })
      },
      myorder(){
        let six = sixs();
        let timestamp = date();
        let pars = {
          pageindex: 1,
          pagesize: 30,
          sign: '',
          timestamp: timestamp,
          token: this.holdtoken,
          userid: this.holduserid,
        };
        pars.sign = getsign(pars, 'GetOrderList', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetOrderList/', {params: pars}).then((res) => {
          let data = res.body.Data;
          console.info('这是wwwdddsss套操列表', data);
          if(!data.length){
            $('.blank').css({display:'block'})
          }
          console.info('我日sss222ssssssssssss1s1', six);
          this.list = data;
        });
      },
//      combotype(value){
//        if (value == 0) {
//          return '乐享4G'
//        } else if (value == 1) {
//          return '个人定制'
//        }
//      },
      orderStatus(value){
        if (value == 0) {
          return '待支付'
        } else if (value == 1) {
          return '-预约已受理'
        } else if (value == 2) {
          return '受理成功'
        } else if (value == 3) {
          return '已取卡'
        } else if (value == 4) {
          return '运营商审核中'
        } else if (value == 5) {
          return '运营商审核失败'
        } else if (value == 6) {
          return '办理成功'
        } else if (value == 7) {
          return '受理失败'
        } else if (value == 8) {
          return '电信已退款'
        } else if (value == 9) {
          return '退款处理中'
        } else if (value == 10) {
          return '退款完成'
        } else if (value == 11) {
          return '已支付'
        } else if (value == 12) {
          return '提交失败'
        } else if (value == 13) {
          return '订单取消'
        } else if (value == 14) {
          return '已上传puk'
        } else if (value == 15) {
          return '已通过实名校验'
        } else if (value == 16) {
          return '实名校验审核中'
        } else if (value == 17) {
          return '未通过实名校验'
        } else if (value == 18) {
          return 'PUK校验失败'
        }
      },
      godetail(code){
        //获取订单编号
        let top = $(document).scrollTop();
//        alert(top);
        sessionStorage.setItem("top", top);
        //code 重新提交订单编号
        this.$store.commit('orderno', code);
        this.$router.push({path: '/details'});
        return false
      },
      turnvalue(value, name){
//          alert(name)
//          alert(value)
        if (value === 0) {
          return '去支付'
        } else if (value === 11) {
          return '重新选号'
        } else if (value === 1) {
          return ''
        } else if (value === 4) {
//            运营商开卡激活中
          return ''
        }
        else if (value === 16) {
          return ''
        } else if (value === 18) {
          return '下载APP'
        }
        else if (value === 15) {
          return '下载APP'
        }
        else if (value === 2) {
          return '下载APP'
        } else if (value === 3 || value === 14) {
          return '下载APP'
        }

//        else if (value === 15 && name !== '号码预占') {
//          return '重新选号'
//        }

        else {
          return '再次下单'
        }
      },
      go(value, order, name){
        if (value === 0) {
//              alert(order);
          this.$store.commit('orderno', order);
          this.$router.push({path: '/pay'})
        } else if (value === 11) {
//              alert(order)
          this.$router.push({name: 'xuanhao', params: {id: order}})
        } else if (value === 1) {

        }
        else if (value === 15) {
          $('.go15').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        } else if (value === 18) {
          $('.go18').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        }
        else if (value === 2) {
//          this.$router.push({name: 'xuanhao', params: {id: order}})
          $('.go2').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        } else if (value === 3 || value === 14) {
          $('.go3').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q');
          $('.go14').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        }

//        else if (value === 15 && name !== '号码预占') {
//          this.$router.push({name: 'xuanhao', params: {id: order}})
//        }

        else {
          this.$router.push({name: 'banli'})
        }
      },
//      get(a, b){
//        alert(a)
//        alert(b)
//      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
