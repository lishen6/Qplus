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
          套餐：<span v-html="combotype(it.combotype)"></span>
        </div>
        <div class="item">
          {{it.gnvoice}}分钟语音通话
        </div>
        <div class="item">
          <span>{{it.gntraffic}}全国流量</span>／<span>{{it.gnsms}}条短信</span>
        </div>
      </div>
      <div class="state right">
        <div class="pay-state" v-html="orderStatus(it.status)"></div>
        <div class="name">{{it.name}}</div>
        <div class="go" v-html="turnvalue(it.status)" @click.stop="go(it.orderno)"></div>
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
  </div>
</template>

<script>
  import A from '../directive'
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import getsign from '../../common/js/md5'
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage'
  import document from '../../common/js/title'
  export default {
    data () {
      return {
        list: ''
      }
    },
    watch: {
      '$route': 'myorder'
    },
    created(){
      document('我的订单');
      if (this.token && this.userid) {
        this.myorder();
      }

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
      myorder(){
        let six = sixs();
        let timestamp = date();
        let pars = {
          pageindex: 1,
          pagesize: 30,
          sign: '',
          timestamp: timestamp,
          token: this.token,
          userid: this.userid,
        };
        pars.sign = getsign(pars, 'GetOrderList', six);
        this.$http.get('http://test.bridgingtop.com/Sim/GetOrderList/', {params: pars}).then((res) => {
          let data = res.body.Data;
          console.info('这特么是wiaei什么鬼', res);
          console.info('我日sss222ssssssssssss1s1', six)
          this.list = data;
        });
      },
      combotype(value){
        if (value == 0) {
          return '乐享4G'
        } else if (value == 1) {
          return '个人定制'
        }
      },
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
//        alert(111);
        //code 重新提交订单编号
        this.$store.commit('orderno', code);
        this.$router.push({path: '/details'})
        return false
      },
      turnvalue(value){
        if (value == 0) {
          return '去支付'
        } else if (value == 11) {
          return '重新选号'
        } else if (value !=0 && value !=11) {
          return '再次下单'
        }
      },
      go(code){
        this.$store.commit('orderno', code);
        this.$router.push({path: '/details'});
        return false
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
