<template>
  <div class="pay">
    <!--<div v-title>支付</div>-->
    <div class="time">
      <span>{{date}}</span>前支付有效
    </div>
    <div class="detail padding after">
      <div class="left imgbox">
        <img src="../../img/deluft.png" alt="">
      </div>
      <div class="left details" v-for="(it,index) in list">
        <div>
          号码：<span>{{it.phone}}</span>（{{it.aname}}）
        </div>
        <div>
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
            预付款：<span>{{(it.orderprice).toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info padding" v-for="(it,index) in list" @click="godetails">
      <p>入网人信息</p>
      <p>姓名：<span>{{it.name}}</span></p>
      <p>身份证号：<span>{{it.idcard}}</span></p>
      <img src="../../img/arrow-right.png" alt="">
    </div>
    <div class="paystyle padding">
      <h3>支付方式</h3>
      <div class="wei">
        <span :class="{btn:active}">
           <img src="../../img/WeChat@3x.png" alt="">
            <i>微信</i>
        </span>
      </div>
    </div>
    <div class="footer"><span to="/finish" class="btn" @click="gopay">确认</span></div>
    <!--<input type="text" v-model="iiii">-->
    <div class="rwz-title fixed zhan">订单已支付</div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import getsign from '../../common/js/md5'
  import MD5 from 'js-md5'
  import A from '../directive'
  import {mapState} from 'vuex'
  import paytiem from '../../common/js/paytiem'
  import parame from '../../common/js/parame'
  import document from '../../common/js/title'
  import local from '../../common/js/localStorage'

  //  import wx from 'jweixin'
  export default {
    data(){
      return {
        list: '',
        date: paytiem(),
        active: true,
        iiii: 'cc',
        ordernum: '',
      }
    },
    computed: {
//      code(){
//        return this.$store.state.code
//      },
      city(){
        return this.$store.state.city
      },
      key(){
        return this.$store.state.key
      },
      //套操内容
      cliuliangs(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return this.$store.state.cliuliang;
        } else {
//            return this.list[this.key].gntraffic.split('MB')[0]
          return 0
        }
      },
      cyuyins(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return this.$store.state.cyuyin
        } else {
//            return this.list[this.key].gnvoice.split('分钟')[0]
          return 0
        }

      },
//      cdxs(){
//        let dz=this.$store.state.combotype;
//        if(dz=='dz'){
//          return this.$store.state.cdx
//        }else {
////            return this.list[this.key].gnsms.split('条')[0]
//          return 0
//        }
//
//      },
      //预存款
      ycprice(){
        return this.$store.state.ycprice
      },
//      //预存款编号
//      ycid(){
//        return this.$store.state.ycid
//      },
      //提取套餐类型
      combotype(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return 1
        } else {
          return 0
        }
      },
      invitecode(){
        return this.$store.state.invitecode
      },
      jifen(){
        return this.$store.state.jifen

      },
      //tocken
//      token(){
//        return this.$store.state.token
//
//      },
//      userid(){
//        return this.$store.state.userid
//
//      },
      //选择的号码
      code(){
        return this.$store.state.code
      },
      cbid(){
        return this.$store.state.cbid
      },
//      //获取入网人信息id
//      riid(){
//        return this.$store.state.riid
//      },
      names(){
        return this.$store.state.names
      },
      cardid(){
        return this.$store.state.cardid
      },
//      orderno(){
//        return this.$store.state.orderno
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

        },
        orderno: function (state) {
          let getuserorderno = local.getItem('orderno');
          if (state.orderno === '' && getuserorderno) {
            this.$store.commit('userid', getuserorderno)
          }
          return state.orderno

        }

      })
    },
    created(){
      document('支付');
      this.myorder();
      this.gopayready();
//      this.createpay();
    },
    methods: {
      //获取订单列表
      myorder(){
        let six = sixs();
        let timestamp = date();
        let pars = {
          orderno: this.orderno,
          sign: '',
          timestamp: timestamp
        };
        pars.sign = getsign(pars, 'GetOrderInfoByOrderNo', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetOrderInfoByOrderNo', {params: pars}).then((res) => {
          console.info('这是订单详情这特么操蛋', res);
          let data = res.body.Data;
          this.list = data;
//            console.info('这是订单详情',res)
        })
      },
      //刷新token
      getToken(){
//        let openid = "oeHYuxKM5A8J0ax_EXMyKN7ohxa8";
        let openid = parame('openid');
//        let nickname = "去月球";
        let nickname = parame('nickname');
//        let photourl = "http://wx.qlogo.cn/mmopen/9vvZrqiaLFX2WEpUUr1TnH9S5DVsaVCNocZoj07KGAfvnYjW047n0ia5TIsSFjXQ5Y8TOX1ju64YJrQy14a0TXgGMib6EF9ibZTg/0#/";
        let photourl = parame('headimgurl');
        let timestamp = date();
        let unionid = parame('unionid');
//        let unionid='oq-qIxAgKAzmhxEX2NCTuV5Iyu8g';
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
        this.$http.post('https://.bridgingtop.com/Member/OtherLoginWX', pars).then((res) => {
          let user = res.body.Data;
          console.info('这是入网jjjjj人信息', user);
          let holduserid = user.userid;
          let holdtoken = user.token;
          this.$store.dispatch('userid', holduserid);
          this.$store.dispatch('token', holdtoken);
//          console.info('卧槽', this.holdtoken);
//          console.info('卧槽', this.holduserid);
          if (holdtoken && holduserid) {
            this.createpay()
          }

        })
      },
      createpay(){
        let self = this;
        let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
        let atimestamp = date();
        let six = sixs();
//        let openid = "oeHYuxKM5A8J0ax_EXMyKN7ohxa8";
        let openid = parame('openid');
        let pay = {
          desc: '哦哈哈',
          name: '个人定制套餐',
          openid: openid,
          orderno: this.orderno,
          sign: '',
          timestamp: atimestamp,
          token: this.token,
          userid: this.userid
        };
        //支付订单
        pay.sign = getsign(pay, 'WXPay_WX', six);
        return this.$http.post('https://api.bridgingtop.com/Other/WXPay_WX', pay).then((res) => {
          console.info('付款逻辑', res);
//          alert('订单',JSON.stringify(res))
          let fk = res.data.Data;
          let packages = fk.package;
          let timestamp = fk.timeStamp;
          let nonceStr = fk.nonceStr;
//          let packages='prepay_id='+prepay_id;
          let paySign = fk.paySign;
          let signType = fk.signType;
          let appId = fk.appId;
//          alert(appId);
          this.iiii = JSON.stringify(fk);

          function onBridgeReady() {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": appId,     //公众号名称，由商户传入
                "timeStamp": timestamp,         //时间戳，自1970年以来的秒数
                "nonceStr": nonceStr, //随机串
                "package": packages,
                "signType": signType,         //微信签名方式：
                "paySign": paySign //微信签名
              },
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  //提交订单接口
                  let atimestamp = date();
                  let six = sixs();
                  let submit = {
                    orderno: self.orderno,
                    phone: self.code,
                    sign: '',
                    timestamp: atimestamp,
                    token: self.token,
                    userid: self.userid
                  };
                  submit.sign = getsign(submit, 'SubmitOrder_V2', six);
                  self.$http.post('https://api.bridgingtop.com/Sim/SubmitOrder_V2', submit).then((ress) => {
                    // get status
                    //          获取城市数组
//                    alert(JSON.stringify(ress));
                    console.info('成熟列表', ress);
                    self.$router.push({path: '/finish'})
                  }, response => {

                  });

                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          }

          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            if(appId){
              onBridgeReady();
            }else {
              $('.zhan').fadeIn(200, function () {
                $('.zhan').fadeOut(200)
              }).delay(1500)
            }

//
          }
        });
      },
      gopayready(){
        let atimestamp = date();
        let six = sixs();
//        this.active=true;
        console.info(111);
        let pars = {
          sign: '',
          timestamp: atimestamp,
          url: window.location.href.split('#')[0],
        };
        pars.sign = getsign(pars, 'GetConfig', six);
        this.$http.post('https://api.bridgingtop.com/Other/GetConfig/', pars).then((res) => {
          console.info('这是接口参数', res);
          console.info('这是配置的啥', res);
          let cs = res.data.Data;
          let appId = cs.appId;
          let timestamp = cs.timestamp;
          let nonceStr = cs.nonceStr;
          let signature = cs.signature;
//           document.write(JSON.stringify(cs))
//          let data=res.body.Data;
//          this.list=data;
//          console.info('这是data',this.list)
          wx.config({
//             title:'',
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'onVoicePlayEnd',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ]
          });
          let title = 'Q+';
          let link = 'http://api.bridgingtop.com/wxinfo/wxinfo.aspx';
//          let imgUrl = '';
          let imgUrl = parame('headimgurl');
          let desc = '电信办理';
          wx.ready(function () {
            console.log('wx ok');
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareQQ({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareWeibo({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareQZone({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
          });
          wx.error(function (res) {
            console.log(res);
          });
        });
      },
      //开始支付
      gopay(){
        this.getToken();
      },
      //进入个人信息详情
      godetails(){
        this.$router.push({name: 'p_detail'})
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
