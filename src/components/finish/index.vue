<template>
  <div class="finsh">
    <!--<div v-title>支付结果</div>-->
    <div class="hint">
      <div class="content">
        <img src="../../img/tick@2x.png" alt="">
        <span>支付成功</span>
      </div>
    </div>
    <div class="box">
      <div class="share">
        <h4>分享至好友</h4>
        <p>
          平台办理的手机注册分享办理成功后可获得50000
          积分，兑换通话时长、流量等业务，拿到你手软，
          快去分享吧
        </p>
        <button @click="share">分享</button>
      </div>
      <!--<div class="share">-->
        <!--<h4>查看订单列表</h4>-->
        <!--&lt;!&ndash;<p>&ndash;&gt;-->
          <!--&lt;!&ndash;查找附近的终端机，选择“Q+预约取卡”，取出你的&ndash;&gt;-->
        <!--&lt;!&ndash;</p>&ndash;&gt;-->
        <!--<button>-->
          <!--<router-link to="/myorder" class="chakan">订单列表</router-link>-->
        <!--</button>-->
      <!--</div>-->
    </div>
    <div class="rwz-title fixed">请点击右上角分享</div>
  </div>
</template>

<script>
  import A from '../directive'
  import $ from 'jquery';
  import date from  '../../common/js/data'
  import sixs from  '../../common/js/six'
  import MD5 from 'js-md5'
  import getsign from '../../common/js/md5'
  import document from '../../common/js/title'
  export default {
    data () {
      return {}
    },
    created(){
        document('支付结果');
    },
    methods: {
      gopayready(){
        let atimestamp = date();
        let six = sixs();
//        this.active=true;
        console.info(111);
//          alert(111);
        let pars={
          sign:'',
          timestamp:atimestamp,
          url:window.location.href.split('#')[0],
        };
        pars.sign=getsign(pars,'GetConfig',six);
        this.$http.post('https://api.bridgingtop.com/Other/GetConfig/',pars).then((res)=>{
          console.info('这是接口参数',res);
          console.info('这是配置的啥',res);
          let cs=res.data.Data;
          let appId=cs.appId;
          let timestamp=cs.timestamp;
          let nonceStr=cs.nonceStr;
          let signature=cs.signature;
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
          let title='Q+';
          let link='';
          let imgUrl='';
          let desc='电信办理';
          wx.ready(function() {
            console.log('wx ok');
            wx.onMenuShareTimeline({
              title:title, // 分享标题
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
          wx.error(function(res) {
            console.log(res);
          });
        });
      },
      share(){
          $('.rwz-title').fadeIn(300,function () {
            $('.rwz-title').fadeOut(300)
          }).delay(1500);
//       alert(111);
//       this.gopayready();
//        this.$router.beforeEach((to, from, next) => {
//          // 动态修改页面的title
////          console.info('我将要去哪里',to);
////          console.info('我来自哪里',from)
//////          setTitleHack(to.meta.title);
//          // 根据自定义的路由元信息来做判断：
////          if (to.meta.isNeedAuth !== false) {
////            // do something
////          } else {
////            // do something
////          }
//          next();
//        });

      }
    },
    destroyed(){
      this.$router.push({path: '/'})

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>

