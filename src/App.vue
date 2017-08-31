<template>
  <div id="app">
    <div style="display: none;">{{userid}}{{token}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import date from  './common/js/data'
  import sixs from  './common/js/six'
  import MD5 from 'js-md5'
  import getsign from './common/js/md5'
  import parame from './common/js/parame'
  import axios from 'axios'
  import $ from 'jquery';
  import {mapActions} from 'vuex'
  let user, userid, token;
  export default{
    data(){
      return {
        parames: {}
      }
    },
    created(){
      //获取token
//      ／／decodeURI()
//      let openid = "oeHYuxKM5A8J0ax_EXMyKN7ohxa8";
      let openid = parame('openid');
//      let nickname = "去月球";
      let nickname = parame('nickname');
//      let photourl = "http://wx.qlogo.cn/mmopen/9vvZrqiaLFX2WEpUUr1TnH9S5DVsaVCNocZoj07KGAfvnYjW047n0ia5TIsSFjXQ5Y8TOX1ju64YJrQy14a0TXgGMib6EF9ibZTg/0#/";
      let photourl = parame('headimgurl');
      let unionid = parame('unionid');
//       let unionid='oq-qIxAgKAzmhxEX2NCTuV5Iyu8g';
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
        console.info('微信rwwwwwuwwwsssssssangren', res);
        let user = res.body.Data;
        console.info('这是微信入网人信息', user);
        let userid = user.userid;
        let token = user.token;
        console.info('卧槽', token);
        this.$store.dispatch('userid', userid);
        this.$store.dispatch('token', token);
        //获取用户信息
        let six = sixs();
        console.info('用户信息当前时间', six);
        let timestamp = date();
        let params = {
          sign: '',
          timestamp: timestamp,
          token: token,
          userid: userid,
        };
        params.sign = getsign(params, 'GetMemberInfo', six);
        return this.$http.get('https://api.bridgingtop.com/Member/GetMemberInfo', {
          params
        })
      }).then((res => {
//         console.info(res)
        let info = res.body.Data;
        console.info('歪日111', info);
        console.info('这几巴是邀请码', info.invitecode);
//        this.$store.dispatch('invitecode', info.invitecode);
        this.$store.dispatch('jifen', info.jifen);
      }));
      //获取用户信息
    },
    computed: {
      userid(){
        return this.$store.state.userid
      },
      token(){
        return this.$store.state.token

      },
      invitecode(){
        return this.$store.state.invitecode
      },
      jifen(){
        return this.$store.state.jifen

      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "./common/sass/common.scss";

  #app {
    height: 100%;
  }

  #banli {
    & > div {
      padding-left: 15px;
      padding-right: 15px;
    }
    .header {
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: 17px;
      color: #675757;
      letter-spacing: 0;
      border-bottom: 1px solid #D4D7DC;
    }
    h3 {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #4D4D4D;
      letter-spacing: 0px;
    }
    .target {
      a {
        display: inline-block;
        border: 1px solid #F5A623;
        border-radius: 2px;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
    .tc-type {
      a {
        flex: 1;
        text-align: center;
        margin-right: 18px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        color: #F5A623;
        border: 1px solid #F5A623;
        width: 80px;
        border-radius: 2px;
        &:nth-of-type(1) {
          width: 120px;
        }
        display: inline-block;
      }
    }
    .tc-price {
      h3 {
        &:after {
          content: '(套餐金额不能低于39元哦)';
          display: inline-block;
          font-size: 12px;
          color: #F5A623;
          padding-left: 10px;
        }
      }

    }
  }

</style>
