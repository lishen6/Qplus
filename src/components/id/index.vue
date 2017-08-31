<template>
  <div class="id">
    <!--<div v-title>入网人信息</div>-->
    <div class="form ">
      <div class="after">
        <span class="icon">姓名</span><input type="text" class="output must" :value="names" placeholder="姓名"
                                           @input="getname" key="1">
      </div>
      <div class="after">
        <span class="icon">身份证号</span><input type="text" class="output must" :value="cardid" placeholder="身份证号"
                                             @input="getcardid" key="2">
      </div>
      <div class="after">
        <span class="none">身份证有效期</span><input type="text" class="youxiao output" :value="validtime"
                                               placeholder="身份证有效期" @input="getvalidtime">
      </div>
      <div class="after">
        <span class="none">住址</span><input type="text" class="output" :value="address" placeholder="住址"
                                           @input="getaddress">
      </div>
    </div>
    <div style="display: none">{{token}}</div>
    <div class="owner form">
      <div class="after">
        <span class="icon">我的身份</span>
        <!-- placeholder="我的身份" :value="sfs" readonly="readonly"-->
        <span type="text" class=" output must router" @click="show" :class="{active:sfs}" >{{sfs?sfs:'我的身份'}}</span>
      </div>
      <div class="after">
        <span class="icon">紧急联系人手机号</span><input type="text" class="output must" placeholder="请输入号码" :value="phone"
                                                 @input="getphone">
      </div>
    </div>
    <!--学校-->
    <div class="owner form">
      <div class="">
        <span class="icon">学校</span>
        <router-link to="/school" class=" output must router" :class="{active:getschool}">
          {{getschool ? getschool : '选择学校'}}
        </router-link>
      </div>
      <div class="after">
        <span class="none">入学年份</span><input type="text" class="output" placeholder="入学年份" :value="rxyear"
                                             @input="getrxyear">
      </div>
      <div class="after">
        <span class="none">所学专业</span><input type="text" class="output" placeholder="填写你的专业" :value="major"
                                             @input="getmajor">
      </div>
    </div>
    <!--{{riid}}-->
    <!--&lt;!&ndash;foooter&ndash;&gt;{{names}}+{{sfs}}+{{getschool}}-->
    <div class="footer">
      <!--{{riid}}-->
      <!--:disabled="unabled"-->
      <span><button class="save" @click="send" :class="{clicksave:clicktrue}" >保存</button></span>
    </div>
    <div class="palbox"></div>
    <div class="student">
      <div class="content">
        <div class="select">
          <div><span>选择身份</span></div>
          <div class="yes select-item" @click="xuesheng('学生')"><span>学生</span></div>
          <div class="no select-item" @click="fxsheng('非学生')"><span>非学生</span></div>
        </div>
        <button class="btn" type="button" @click="hide">确定</button>
      </div>
    </div>
    <div class="rwz-title fixed">请完善个人信息 <span style="color: #FF001F;">*</span>为必填</div>
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
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage'
  export default {
    data(){
      return {
//        names:'张建',
//        cardid:'',
//        validtime:'',
//        address:'',
//          sfs:this.sfs,
//        phone:'',
//        rxyear:'',
//        major:''
//          dis:true,
        par: '',
        //禁止点击
        unabled: true,
        clicktrue:false
      }
    },
    computed: {
      getschool(){
        return this.$store.state.school
      },
      sf(){
        return this.$store.state.sf
      },
      schoolId(){
        return this.$store.state.schoolId
      },
//      userid(){
//        return this.$store.state.userid
//      },
////      token(){
////        return this.$store.state.token
////
////      },
//      token(){
//        return this.$store.state.token
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

      }),

      //用户信息的保存
      names(){
        return this.$store.state.names
      },
      cardid(){
        return this.$store.state.cardid
      },
      validtime(){
        return this.$store.state.validtime
      },
      address(){
        return this.$store.state.address
      },
      phone(){
        return this.$store.state.phone
      },
      rxyear(){
        return this.$store.state.rxyear
      },
      major(){
        return this.$store.state.major
      },
      sfs(){
        return this.$store.state.sfs
      },
      riid(){
        return this.$route.params.id
      }

    },
    methods: {
      show(){
        $('.palbox').fadeIn(500);
        setTimeout(function () {
          $('.student').addClass('studentShow');
        },1000);

      },
      hide(){
        $('.student').removeClass('studentShow');
        $('.palbox').fadeOut(200);
      },
      xuesheng(items){
        this.$store.commit('sfs', items);
        $('.select-item').eq(0).addClass('selectactive').siblings().removeClass('selectactive')
      },
      fxsheng(items){
        this.$store.commit('sfs', items);
        $('.select-item').eq(1).addClass('selectactive').siblings().removeClass('selectactive')
      },
      //发送 post 请求
      send(){
//          alert( 'token',this.token);
        console.info('zhesheshemme', this.userid)
        console.info('学校id', this.schoolId);
        if (this.riid == 99999 || this.riid == 99998) {
          let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
          let timestamp = date();
          let six = sixs();
          console.info('当前时间', timestamp);
          console.info('这是加6', six);
          //测试
          let params = {
            address: this.address,
            areaid: areaid,
            contactphone: this.phone,
            fmurl: "",
            idcard: this.cardid,
            major: this.major,
            name: this.names,
            rxyear: this.rxyear,
            school: this.getschool,
            sf: this.sfs,
            sid: this.schoolId,
            sign: '',
            timestamp: timestamp,
            token: this.token,
            userid: this.userid,
            validtime: this.validtime,
            zmurl: '',
          };
          params.sign = getsign(params, 'AddRWRInfo', six);
          if (this.token) {
            this.$http.post('https://api.bridgingtop.com/Sim/AddRWRInfo', params).then((res) => {
              console.info(res);
              console.info('这是用户信息开始吧少你啊', res);
              let Msg = res.body.Msg;
              let riid = res.data.Data;
//            console.info('wairi',manid);
              console.info('卧槽啦', Msg);
              this.$store.commit('riid', riid);
              this.$store.dispatch('Msg', Msg);
              if (this.unabled == true) {
                $('.rwz-title').fadeIn(300, function () {
                  $('.rwz-title').fadeOut(200)
                }).delay(1000)
              } else {
                  //清🈳vuex
                this.$store.commit('names','');
                this.$store.commit('cardid', '');
                this.$store.commit('validtime','');
                this.$store.commit('address','');
                this.$store.commit('phone','');
                this.$store.commit('rxyear','');
                this.$store.commit('major','');
                this.$store.commit('school','');
                this.$store.commit('schoolId','');
                this.$store.commit('sfs', '');
                //路由跳转
                this.$router.push({path: '/submit'})
              }

            });
          }
        } else {
//          this.$router.push({path:'/list'})
          console.info('zhesheshemme', this.userid)
          console.info('学校id', this.schoolId)
          let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
          let timestamp = date();
          let six = sixs();
          console.info('当前时间', timestamp);
          console.info('这是加6', six);
          //测试
          let params = {
            address: this.address,
            areaid: areaid,
            contactphone: this.phone,
            fmurl: "",
            idcard: this.cardid,
            major: this.major,
            name: this.names,
            riid: this.riid,
            rxyear: this.rxyear,
            school: this.getschool,
            sf: this.sfs,
            sid: this.schoolId,
            sign: '',
            timestamp: timestamp,
            token: this.token,
            userid: this.userid,
            validtime: this.validtime,
            zmurl: '',
          };
          params.sign = getsign(params, 'EditRWRInfo', six);
          if (this.token) {
            this.$http.post('https://api.bridgingtop.com/Sim/EditRWRInfo', params).then((res) => {
              console.info(res);
              console.info('这是用户信息开始吧少你啊', res);
              let Msg = res.body.Msg;
//              let manid=res.data.Data;
//              console.info('wairi',manid)
              console.info('卧槽啦', Msg);
              if (this.unabled == true) {
                $('.rwz-title').fadeIn(300, function () {
                  $('.rwz-title').fadeOut(200)
                }).delay(1000)
              }else {
                //清🈳vuex
                this.$store.commit('names','');
                this.$store.commit('cardid', '');
                this.$store.commit('validtime','');
                this.$store.commit('address','');
                this.$store.commit('phone','');
                this.$store.commit('rxyear','');
                this.$store.commit('major','');
                this.$store.commit('school','');
                this.$store.commit('schoolId','');
                this.$store.commit('sfs', '');
                //路由跳转
                this.$router.push({path: '/list'})
              }

            });
          }
        }


      },
      //保存mess
      getname(e) {
        this.$store.commit('names', e.target.value)
      },
      getcardid(e){
        this.$store.commit('cardid', e.target.value)
      },
      getvalidtime(e){
        this.$store.commit('validtime', e.target.value)
      },
      getaddress(e){
        this.$store.commit('address', e.target.value)
      },
      getphone(e){
        this.$store.commit('phone', e.target.value)
      },
      getrxyear(e){
        this.$store.commit('rxyear', e.target.value)
      },
      getmajor(e){
        this.$store.commit('major', e.target.value)
      },
//      getpar(){
//          let riid= this.$route.params.id;
//          this.par=riid
//      }
    },
    created(){
      document('入网人信息');
      if(this.names && this.phone  && this.cardid && this.sfs && this.getschool){
        this.unabled=false;
        this.clicktrue=true;
      }else {
        this.unabled=true;
        this.clicktrue=false;
      }
    },
    updated(){
      if(this.names && this.phone  && this.cardid && this.sfs && this.getschool){
        this.unabled=false;
        this.clicktrue=true;
      }else {
        this.unabled=true;
        this.clicktrue=false;
      }
    },
//    mounted(){
//////        console.info('aswwwd',$('.must').val());
//////       if($('.must').val()!='' ){
//////           alert(111)
//////           this.unabled=false;
//////           $('.save').addClass('clicksave')
//////
//////       }
//      let arr = $('.must');
//      console.info(arr)
//      var status = 1;
//      arr.each(function (index, val) {
//        if (val.tagName == 'A') {
//          if ($(val).html().trim() == '') {
//            status = 0;
//          }
//          ;
//
////          this.unabled=false;
//          //$('.save').addClass('clicksave')
//        }
//        ;
//        if (val.tagName == 'INPUT') {
//          if ($(val).val().trim() == '') {
//            status = 0;
//          }
//        }
//      });
//      console.info('dani4', status);
//      if (status == 1) {
//        this.unabled = false;
//        $('.save').addClass('clicksave');
//      }else {
//        this.unabled = true;
//        $('.save').removeClass('clicksave');
//      }
//    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>

