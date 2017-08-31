<template>
  <div class="submit">
    <!--<div v-title>提交订单</div>-->
    <!--{{Msg}}{{cbid}}-->
    <div class="detail flex">
      <div class="left imgbox">
        <img src="./../../img/deluft.png" alt="">
      </div>
      <div class="right">
        <div>
          号码：<span>{{code}}</span>（{{city}}）
        </div>
        <div class="tc">
          套餐：<span v-if="list.length">{{list[key].cbname}}</span>
        </div>
        <div v-if="list.length && list[key].offertypename=='dz'">
          <div>
            {{cyuyins}}分钟语音通话
          </div>
          <div>
            <span>{{cliuliangs}}</span>MB全国流量／<span>{{cdxs}}</span>条短信
          </div>
        </div>
        <div v-else="list.length && list[key].offertypename=='fdz'">
          <!--在直接使用的地方追加判断 在直接使用的地方追加判断 沙皮孩子-->
          <div v-if="list.length">
            {{list[key].gnvoice}}语音通话
          </div>
          <div v-if="list.length">
            <span>{{list[key].gntraffic}}</span>MB全国流量／<span>{{list[key].gnsms}}</span>条短信
          </div>
        </div>
      </div>
    </div>
    <div class="yc after" v-if="discount.length">
      <h3>预存话费</h3>
      <div class="left yh" @click="turn(index,it.amount,it.psid,it.couponprice)"  v-for="(it,index) in discount" :class="{active:!index}"  v-if="it">
        <div class="price center">
          <span>{{it.amount}}元</span>
          <span class="discount">立减{{it.couponprice}}元</span>
        </div>
      </div>
    </div>
    <div class="info">
      <div style="display: none">{{ycid}}</div>
      <div v-if="userlist">
        <p>入网人信息</p>
        <p>姓名：<span>{{userlist.name}}</span></p>
        <p>身份证号：<span>{{userlist.idcard}}</span></p>
        <router-link to="/list">
          <div class="btn"><img src="../../img/arrow-right.png" alt=""></div>
        </router-link>
      </div>
      <!--<div v-else-if="Msg=='保存成功'">-->
      <!--<p>入网人信息</p>-->
      <!--<p>姓名：<span>{{names}}</span></p>-->
      <!--<p>身份证号：<span>{{cardid}}</span></p>-->
      <!--<router-link to="/list"><div class="btn"><img src="../../img/arrow-right.png" alt=""></div></router-link>-->
      <!--</div>-->
      <div class="rwr" v-else @click="add">
        <span><i>+</i></span><span>新建入网人</span>
      </div>
    <!--zhe{{detailnum}}-->
    </div>
    <div class="code after">
      <h3>邀请码</h3>
      <div>
        <input type="text" class="left" placeholder="使用邀请码您将获得50000积分" @input="getinvitecode" :value="invitecode">
        <button class="right">
          <router-link to="/codeuse" class="use">使用说明</router-link>
        </button>
      </div>
    </div>
    <div class="money" v-if="payprice">
      商品金额：<span>{{payprice}}元</span>
    </div>
    <!--<div class="money" v-else="list.length && list[key].offertypename=='fdz'">-->
      <!--商品金额：<span v-if="list.length">{{list[key].price}}元</span>-->
    <!--</div>-->
    <div class="footer bottomfix">
      <span class="btn stoppay" @click="topay()">去支付</span>
    </div>
    <div class="limit fixed"><span class="center">该用户的订单数已达上限了（每张身份证限办5张哟）</span></div>
    <!--<div class="rwz-title fixed" v-pal v-show="!userlist">请添加入网人信息哦</div>-->
    <div class="rwz-title fixed stop">请添加入网人信息</div>
    <div class="rwz-title fixed zhan">该号码已占用，请重新选号</div>
  </div>
</template>
<script>
  import header from '../header/index.vue'
  import A from '../directive'
  import B from '../pal'
  import $ from 'jquery';
  import date from '../../common/js/data'
  import sixs from '../../common/js/six'
  import sign from '../../common/js/md5'
  import MD5 from 'js-md5'
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage'
  import document from '../../common/js/title'
  import getsign from '../../common/js/md5'
  import parame from '../../common/js/parame'

  export default {
    data () {
      return {
        title: '提交订单',
        list: [],
        discount: '',
        status: true,
        //入网人信息列表
        userlist: '',
        //判断入网人信息 进而确定支付状态
        paylist: '',
        //刷新token
        retoken:'',
        reuserid:'',
        payprice:''

      }
    },
    components: {
      'v-header': header
    },
    computed: {
      code(){
        return this.$store.state.code
      },
      city(){
        return this.$store.state.city
      },
      key(){
        return this.$store.state.key
      },
      //套操内容
//      cliuliangs(){
//        return this.$store.state.cliuliang
//      },
      //套操内容
      cliuliangs(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return this.$store.state.cliuliang;
        } else {
          return 0
        }
      },
      cdxs(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return this.$store.state.cdx
        } else {
          return 0
        }
      },
//      cyuyins(){
//        return this.$store.state.cyuyin
//      },
      cyuyins(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return this.$store.state.cyuyin
        } else {
          return 0
        }

      },
      combotype(){
        let dz = this.$store.state.combotype;
        if (dz == 'dz') {
          return 1
        } else {
          return 0
        }
      },

      //用户信息保存状态
      Msg(){
        return this.$store.state.Msg
      },
      //邀请码
      invitecode(){
        return this.$store.state.invitecode
      },
      //预存款编号
      ycid(){
        return this.$store.state.ycid
      },
      cbid(){
        return this.$store.state.cbid
      },
      //获取入网人信息id
      riid(){
        return this.$store.state.riid
      },
      //入网人信息
      names(){
        return this.$store.state.names
      },
      cardid(){
        return this.$store.state.cardid
      },
//      userid(){
//        return this.$store.state.userid
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
        detailnum: function (state) {
          let getusernum = local.getItem('detailnum');
          if (state.detailnum == '' && getusernum) {
            this.$store.commit('detailnum', getusernum)
          }
          return state.detailnum

        }


      })
    },
    created(){
      document('提交订单');
      this.gettc();
      this.getyh();
      if (this.userid) {
        this.getlist()
      }
//      this.getToken()

    },
    methods: {
      //获取套餐信息
      gettc(){
        let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
        this.$http.get('https://api.bridgingtop.com/Sim/GetComboInfo_V2', {
          params: {
            areaid: areaid
          }
        }).then((res) => {
          let data = res.body.Data;
          this.list = data;
        });
      },
      //获取优惠信息 获取预存款信息
      getyh(){
        let atimestamp = date();
        let six = sixs();
        let pars = {
          cbid: this.cbid,
          timestamp: atimestamp,
          sign: sign
        };
        pars.sign = sign(pars, 'GetPreStoreInfo_V2', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetPreStoreInfo_V2', {
          params: pars
        }).then((res) => {
          let datas = res.body.Data;
          console.info('这是ssddds优惠信息',datas[0]);
          let prices=datas[0].amount;
          let count=datas[0].couponprice;
          this.payprice=prices*1-count*1;
          //储存psid psid
          let psid=datas[0].psid;
          this.$store.commit('ycid', psid);
          console.info('预存id',psid);
          this.discount = datas;
          console.info('歪日啦sssssss', this.discount)
        });
      },
      //获取入网人信息列表
      getlist(){
        let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
        let timestamp = date();
        let six = sixs();
        let pars = {
          areaid: areaid,
          sign: '',
          timestamp: timestamp,
          userid: this.userid,
        };
        pars.sign = sign(pars, 'GetRWRInfo', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetRWRInfo', {
          params: pars
        }).then((res) => {
          console.info('这真够wwsswwwwswww操蛋的啊', res)
          let lists = res.body.Data;
          this.paylist = lists;
//          console.info(reminder);
          if (lists.length) {
            this.userlist = lists[this.detailnum];
            let riid = this.userlist.riid;
            let name = this.userlist.name;
            let idcard = this.userlist.idcard;
//            this.$store.commit('names', name);
//            this.$store.commit('cardid', idcard);
            this.$store.commit('riid', riid);
            console.info(riid);
            console.info('这是入网人ww信xxxx息列表', lists[0])
          }else {
            $('.stop').html('请添加入网人信息哦').fadeIn(300, function () {
              $('.stop').fadeOut(200);
            }).delay(1000)
          }
//          console.info(lists.length)
        });
      },
      turn(num, price,id,count){
          //psid 也是必须的 沙皮孩子
        this.$store.commit('ycid', id);
        this.payprice=price*1-count*1;
//        alert(this.payprice);
        $('.active').css({border:'1px solid #979797',color:'#000'});
        $('.yh').eq(num).addClass('ycactive').siblings('.yh').removeClass('ycactive');

      },
      //计算总价的方法
      lls(num){
        if (num < 100) {
          return num * 0.15
        } else if (num >= 100 && num < 500) {
          return 100 * 0.15 + (num - 100) * 0.07
        } else {
          return 100 * 0.15 + 400 * 0.07 + (num - 500) * 0.05
        }
      },
      yyins(num){
        if (num < 500) {
          return num * 0.15
        } else if (num >= 500 && num < 1000) {
          return 500 * 0.15 + (num - 500) * 0.12
        } else {
          return 500 * 0.15 + 900 * 0.12 + (num - 1000) * 0.08
        }
      },
      dxs(num){
        if (num < 50) {
          return num * 0.1
        } else if (num >= 50 && num < 500) {
          return 50 * 0.1 + (num - 50) * 0.06
        } else {
          return 50 * 0.1 + 450 * 0.06 + (num - 500) * 0.05
        }
      },
      add(){
//        $('.rwz-title').hide(100);
        this.$router.push({name: 'id', params: {id: 99999}})
      },

      // 将邀请码存入 vuex
      getinvitecode(e) {
        this.$store.commit('invitecode', e.target.value)
      },
      //获取token
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
        this.$http.post('https://api.bridgingtop.com/Member/OtherLoginWX', pars).then((res) => {
          let user = res.body.Data;
          console.info('这是入网jjjjj人信息', user);
          let holduserid = user.userid;
          let holdtoken = user.token;
          this.$store.dispatch('userid', holduserid);
          this.$store.dispatch('token', holdtoken);
//          console.info('卧槽', this.holdtoken);
//          console.info('卧槽', this.holduserid);
          if (holdtoken && holduserid) {
            this.topayredy()
          }

        })
      },
      //提交订单
      topayredy(){
        if (!this.paylist.length) {
          $('.stop').fadeIn(300, function () {
            $('.stop').fadeOut(200);
          }).delay(1000)
        } else {
          //提交订单接口
          let atimestamp = date();
          let six = sixs();
          console.info('这几巴是加6分钟的时间', six)
          let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
          //生成订单
          //订单 riid 暂时是死的
          let pars = {
            areaid: areaid,
            cbid: this.cbid,
            combotype: this.combotype,
            flowid: this.cliuliangs,
            invitecode: this.invitecode?this.invitecode:'',
            phonenumber: this.code,
            psid: this.ycid,
            riid: this.riid,
            sign: '',
            smsid: this.cdxs,
            timestamp: atimestamp,
            token: this.token,
            userid: this.userid,
            voiceid: this.cyuyins,
          };
          pars.sign = sign(pars, 'CreateOrder_WX', six);
          this.$http.post('https://api.bridgingtop.com/Sim/CreateOrder_WX', pars).then((res) => {
            console.info('这特么kkkk支付waiei订单wowoowoooooooo成功了', res);
            let data = res.body.Data;
            let msg =res.data.Msg;
//
            console.info('zhesho',msg);
            if(msg !='生成订单成功'){
              $('.zhan').html(msg).fadeIn(300,function () {
                $('.zhan').fadeOut(200)
              }).delay(1000)
            }
            else {
              console.info('歪日', data.orderno);
              let orderno = data.orderno;
              console.info('这是订单编号', orderno);
//          this.ordernum=orderno;
              //暂时注释掉orderno
              this.$store.commit('orderno', orderno);
              if (this.userlist && orderno) {
                this.$router.push({path: '/pay'})
              }
            }

          });


        }
      },
      topay(){
        this.getToken()
      }

    },
    mounted(){
//      if(this.Msg!='保存成功'){
//        $('.rwz-title').show(300);
//      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
