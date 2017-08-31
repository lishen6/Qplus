<template>
  <div style="background: #ffffff;" class="choice">
    <!--<div v-title>号码选择</div>-->
    <div class="serarch">
      <input type="text" placeholder="输入号码后四位" class="field oninput" v-model="code" >
      <button type="button" class="btn right" @click="getxuan(code)">搜索</button>
    </div>
    <div class="block"></div>
    <div class="box page-infinite-wrapper wrapper" ref="wrapper">
      <div class="pull after" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div v-for="(item,index) in lists"><span @click="select(item,index)" class="code" :class="{first:!index}">{{item}}</span>
        </div>
        <mt-spinner type="triple-bounce" style="border: none" class="cril" v-show="!lists.length">加载中</mt-spinner>
      </div>
    </div>
    <div class="footer-block"></div>
    <div class="bottomfix footer" v-if="lists.length"><span class="btn" @click="hint">下一步，提交订单</span></div>
    <!--<div v-pal v-show="Msg=='无更多信息'">无更多信息请重新搜索</div>-->
    <div class="rwz-title fixed" v-if="Msg=='无更多信息'">无更多信息,请重新选号</div>
    <div class="rwz-title fixed code">请选择号码</div>
    <div class="rwz-title fixed status">请选择号码</div>
  </div>
</template>
<script>
  import A from '../directive'
  import B from '../pal'
  import document from '../../common/js/title'
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import getsign from '../../common/js/md5'
  import MD5 from 'js-md5'
  import parame from '../../common/js/parame'
  import $ from 'jquery';
  import {Indicator} from 'mint-ui';
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage';
  import browser from '../../common/js/versions';
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        lists: [],
        code: '',
        Msg: '',
        londing: '',
        show: false,
//        pageindex: 0,
        //搜索的索引
        searchindex: 0,
        scrollMode: "auto",
        judge: '',
        //关闭定时器
        timeout: '',
        //判断号码状态

      }
    },
    computed: {
//      cbid(){
//        return this.$store.state.cbid
//      },
      mycode(){
        return this.$store.state.code
      },
      ...mapState({
        cbid: function (state) {
//            console.info('这是什么跟',local)
          let getcbid = local.getItem('cbid');
          if (state.cbid === '' && getcbid) {
            this.$store.commit('cbid', getcbid)
          }
          return state.cbid
        },
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

      }),
      //传递过来的参数
      canshu(){
        return this.$route.params.id
      }
    },
    created(){
      document('号码选择');
    },
    methods: {
      //上拉加载更多
      loadMore() {
          console.info('code的值：',this.code,'..',this.code == '');
          if(this.code == '' && $('input.oninput:focus').length==0 && !($('.right').hasClass('active'))) {
              //非搜索状态下 && 光标失去焦点 && 非点搜索时 加载更多
            $('.cril').addClass('loading');
            this.loading = true;
            setTimeout(() => {
              this.getcode(this.searchindex);
              this.loading = false;
              $('.cril').removeClass('loading');

            }, 2500);
          }

      },
      select(item, index){
        this.$store.commit('code', item);
        $('.first').css({border: '1px solid #979797', color: ' #4D4D4D'});
        $('.code').eq(index).addClass('active').parent().siblings().find('.code').removeClass('active')
      },
      getcode(page, code){
//        this.loading = '';
        let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
        let atimestamp = date();
        let six = sixs();
        let pars = {
          areaid: areaid,
          cbid: this.cbid,
          headnumber: '',
          pageindex: page,
          pagesize: 20,
          searchnumber: code ? code : '',
          sign: '',
          tailrule: '',
          timestamp: atimestamp,
        };
        pars.sign = getsign(pars, 'GetPhoneNumbers', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetPhoneNumbers', {
          params: pars
        }).then((res) => {
          page += 1;
          let data = res.data.Data;
          console.info('这家吧',data);
//          //判断loading的状态
//          console.info('这是下拉的号码', data)
          let first = data[0];
          console.info('这几巴是电话好吗', first);
          //显示状态
          if(first===undefined){
            $('.mint-spinner-triple-bounce').css({display:'none'});
            $('.status').html('号码不存在，请重新搜索').fadeIn(200, function () {
              $('.status').fadeOut(200)
            }).delay(1500)
          }
          this.$store.commit('code', first);
          let msg = res.bodyText;
          this.lists.push(...data);
          this.Msg = JSON.parse(msg).Msg;
//          console.info('这是返回信息', this.Msg)
//          this.$nextTick(() => { this.scroll = new BScroll(this.$refs.wrapper, {
//            scrollY:true,
//            bounce:true
//          }) })
        })
      },
      getxuan(code){

        this.lists = [];
        this.getcode(0, code);
        if(code != '') {//搜索有值
          $('.right').addClass('active');
        } else {
          $('.right').removeClass('active');
        }
        clearTimeout(this.timeout);
        return false;

        /*if (code !== '') {
          this.lists = [];
          this.getcode(0, code);
          clearTimeout(this.timeout);
//          this.searchindex++;
        } else {
//          alert(code);
          this.lists = [];
          this.getcode(this.searchindex);
          this.searchindex++;
        }*/

      },
      getToken(){
//        let openid = "oeHYuxKM5A8J0ax_EXMyKN7ohxa8";
        let openid = parame('openid');
//        let nickname = "去月球";
        let nickname = parame('nickname');
//        let photourl = "http://wx.qlogo.cn/mmopen/9vvZrqiaLFX2WEpUUr1TnH9S5DVsaVCNocZoj07KGAfvnYjW047n0ia5TIsSFjXQ5Y8TOX1ju64YJrQy14a0TXgGMib6EF9ibZTg/0#/";
        let photourl = parame('headimgurl');
        let unionid = parame('unionid');
//        let unionid='oq-qIxAgKAzmhxEX2NCTuV5Iyu8g';
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
          let holduserid = user.userid;
          let holdtoken = user.token;
          this.judge = holdtoken;
          this.$store.dispatch('userid', holduserid);
          this.$store.dispatch('token', holdtoken);
          if (holdtoken && holduserid) {
            let atimestamp = date();
            let six = sixs();
            let submit = {
              orderno: this.canshu,
              phone: this.mycode,
              sign: '',
              timestamp: atimestamp,
              token: this.token,
              userid: this.userid
            };
            console.info('这是2', holdtoken);
            submit.sign = getsign(submit, 'SubmitOrder_V2', six);
            this.$http.post('https://api.bridgingtop.com/Sim/SubmitOrder_V2', submit).then((ress) => {
              console.info('这特么', ress);
              let msg = ress.data.Msg;
              let status = ress.data.Success;
              if (!status) {
                $('.status').html(msg).fadeIn(200, function () {
                  $('.status').fadeOut(200)
                }).delay(1500)
              } else {
                this.$router.go(-1)
              }

            });
          }


        })
      },
      hint(){
        if (!this.mycode) {
          $('.code').fadeIn(200, function () {
            $('.code').fadeOut()
          }).delay(1000)
        } else {
          if (this.canshu != 0) {
            this.getToken()
//                let atimestamp = date();
//                let six = sixs();
//                let submit = {
//                  orderno: this.canshu,
//                  phone: this.mycode,
//                  sign: '',
//                  timestamp: atimestamp,
//                  token: this.token,
//                  userid: this.userid
//                };
//                console.info('这是2',this.token)
//                submit.sign = getsign(submit, 'SubmitOrder_V2', six);
//                this.$http.post('http://api.bridgingtop.com/Sim/SubmitOrder_V2', submit).then((ress) => {
//                  console.info('这特么', ress);
//                  this.$router.go(-1)
//                });


          } else {
            this.$router.push({path: '/submit'})
          }

        }
      }


    },
    mounted(){
      //解决ios光标聚焦到搜索输入框 position：fixed失效
      if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
        $('.oninput').on('focus',function(){
          let top = $(window).scrollTop();
          $(window).scrollTop(0);
          $('html,body').addClass('html');
          $('.serarch').css({position:'absolute',top:0});
        }).on('blur',function(){
          $('html,body').removeClass('html');
          $('.serarch').css({position:'fixed',top:'0'});
        });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
