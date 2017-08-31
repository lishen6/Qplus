<template>
  <div class="order-details">
    <div v-title>订单详情</div>
    <div v-for="(it,index) in list">
      <div class="detail padding after">
        <div class="left imgbox">
          <img src="../../img/deluft.png" alt="">
        </div>
        <div class="left details">
          <div>
            号码：<span>{{it.phone}}</span>（{{it.aname}}）
          </div>
          <div class="tc">
            套餐：<span>{{it.cbname}}</span>
          </div>
          <div>
            {{it.gnvoice}}语音通话
          </div>
          <div>
            <span>{{it.gntraffic}}</span>全国流量／<span>{{it.gnsms}}</span>条短信
          </div>
          <div>
            <!--预付款：<span>200.00</span>-->
          </div>
        </div>
      </div>
      <div class="info padding">
        <p>入网人信息</p>
        <p>姓名：<span>{{it.name}}</span></p>
        <p>身份证号：<span>{{it.idcard}}</span></p>
      </div>
      <!--流程-->
      <div class="flow after">
        <div class="string"></div>
        <div>
          <div class="item" v-for="(state,key) in it.orderstatushistory">
            <!--{{v-bind="getenabled(state.enabled)       :class="'big'+state.enabled""}}-->
            <div class="block"><span class="big" :class="'big'+state.enabled"></span></div>
            <div class="til"><span>{{state.statusname}}</span><span class="times">{{state.createtime}}</span></div>
            <span class="right">{{state.desc}}</span>
          </div>
        </div>
        <!--<div v-else>-->
        <!--&lt;!&ndash;<div class="item">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="block"><span :class="{big:state.createtime,small:!state.createtime}"></span></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="til" ><span>订单支付</span><span  class="times">{{it.createtime}}</span></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="right" v-html="paystatus(it.ispay)"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="item">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="block"><span :class="{big:state.createtime,small:!state.createtime}"></span></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="til" ><span>订单取消</span><span  class="times">{{it.createtime}}</span></div>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;<span class="right" v-html="paystatus(it.ispay)"></span>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div class="item" v-for="(state,key) in it.orderstatushistory">-->
        <!--<div class="block"><span :class="[big]"></span></div>-->
        <!--<div class="til">-->
        <!--<span>{{state.statusname}}</span><span class="times">{{state.createtime}}</span>-->
        <!--<span>日这个世界台风款欧 {{state.enabled}}</span>-->
        <!--</div>-->
        <!--<span class="right">{{state.desc}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--{{being}}-->
      </div>
      <div class="footer-block"></div>
      <div class="footer bottomfix" v-if="">
        <a class="btn" v-html="turnvalue(it.status,it.statusname)"
           @click="go(it.status,it.orderno,it.statusname)" :class="'go'+it.status"></a>
        <!--:disabled="{state:being}" :class="{active:being}"-->
      </div>
    </div>
  </div>
</template>

<script>
  import header from '../header/index.vue'
  import A from '../directive'
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import getsign from '../../common/js/md5'
  import document from '../../common/js/title'
  import $ from 'jquery';
  export default {
    data () {
      return {
        title: '订单详情',
        list: '',
        state: false,
        being: '',
        //订单状态
        history: '',
        now: '',
        future: '',
        big: '',
        1: 'zhang',
        2: 'jian',
        0: 'li'
      }
    },
    components: {
      'v-header': header
    },
    methods: {
      getdetail(){
        let self = this;
        let six = sixs();
        let timestamp = date();
        let pars = {
          orderno: this.orderno,
          sign: '',
          timestamp: timestamp
        };
        pars.sign = getsign(pars, 'GetOrderInfoByOrderNo', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetOrderInfoByOrderNo', {params: pars}).then((res) => {
          console.info('这是订单详情这特么操蛋', res)
          let data = res.body.Data;
          this.list = data;
          console.info('这是订单详情', data);
          let going = data[0].orderstatushistory;
          console.info(going);
          $.each(going, function (index, val) {
            console.info('这是几巴状态', val)
            if (val.enabled === 1) {

            } else if (val.enabled === 2) {

            } else {
//              $('.dot')[index].addClass('future')
            }
          })
          //查询预占中状态

        })
      },
      getenabled(dot){
        alert(dot)
      },
      paystatus(value){
        if (value == 0) {
          return '还未支付'
        } else if (value == 1) {
          return '已经支付'
        }
      },
      turnvalue(value, name){
        if (value === 0) {
          return '去支付'
        } else if (value === 11) {
          return '重新选号'
        } else if (value === 1) {
          return ''
        }
        else if(value===4){
//            运营商开卡激活中
          return ''
        }
        else if (value === 15) {
          return '下载APP'
        } else if (value === 18) {
//             失败
          return '下载APP'
        }
        else if (value === 16) {
//            身份校验
          return ''
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
      //value 状态码 order 订单 编号
      go(value, order, name){
        if (value === 0) {
//              alert(order);
          this.$store.commit('orderno', order);
          this.$router.push({path: '/pay'})
        } else if (value === 11) {
//              alert(order)
          this.$router.push({name: 'xuanhao', params: {id: order}})
        }else if(value === 15){
          $('.go15').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        }else if(value === 18){
          $('.go18').attr('href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.anyikuai.q')
        }
        else if (value === 2) {
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
      }
    },
    computed: {
      orderno(){
        return this.$store.state.orderno
      }
    },
    created(){
      document('订单详情');
      this.getdetail()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
