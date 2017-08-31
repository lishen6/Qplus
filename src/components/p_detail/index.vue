<template>
  <div class="p-detail">
    <!--<div v-title>入网人信息</div>-->
    <div class="items after" v-for="(list,index) in listinfor" v-if="index==detailnum">
      <div class="item  after">
        <span class="left">姓名</span><span class="right">{{list.name}}</span>
      </div>
      <div class="item  after">
        <span class="left after">身份证号</span><span class="right">{{list.idcard}}</span>
      </div>
      <div class="item  after">
        <span class="left">身份证有效期</span><span class="right">{{list.validtime}}</span>
      </div>
      <div class="item  after">
        <span class="left">住址</span><span class="right">{{list.address}}</span>
      </div>
      <div class="item  after">
        <span class="left">我的身份</span><span class="right">{{list.sf}}</span>
      </div>
      <div class="item  after">
        <span class="left">紧急联系人手机号</span><span class="right">{{list.contactphone}}</span>
      </div>
      <div class="item after">
        <span class="left">学校</span><span class="right">{{list.school}}</span>
      </div>
      <div class="item after">
        <span class="left">入学年份</span><span class="right">{{list.rxyear}}</span>
      </div>
      <div class="item after">
        <span class="left">所学专业</span><span class="right">{{list.major}}</span>
      </div>
    </div>
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
    data(){
        return {
          listinfor:""
        }
    },
    computed: {
      detailnum(){
        return this.$store.state.detailnum
      },
      userid(){
        return this.$store.state.userid
      },
    },
    methods: {
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
        pars.sign = getsign(pars, 'GetRWRInfo', six);
        this.$http.get('https://api.bridgingtop.com/Sim/GetRWRInfo', {
          params: pars
        }).then((res) => {
          let lists = res.body.Data
          this.listinfor = lists
          console.info('这是几巴扯淡的', lists);
        });
      }
    },
    created(){
        document('入网人信息');
        this.getlist()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
