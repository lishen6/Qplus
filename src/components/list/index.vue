<template>
  <div>
    <!--<div v-title>入网人列表</div>-->
    <!--&lt;!&ndash;{{Msg}}{{userid}}&ndash;&gt;{{riid}}-->
    <div class="box" v-for="(list,index) in listinfor" :key="list.riid" @click="gopdetail(index)">
      <div class="list after">
        <div class="item after">
          <span class="left">姓名</span><span class="right">{{list.name}}</span>
        </div>
        <div class="item after">
          <span class="left">身份证号</span><span class="right">{{list.idcard}}</span>
        </div>
        <div class="item after">
          <span class="left">身份证有效期</span><span class="right">{{list.validtime}}</span>
        </div>
        <div class="item after">
          <span class="left">住址</span><span class="right">{{list.address}}</span>
        </div>
        <div class="item after">
          <span class="left">我的身份</span><span class="right">{{list.sf}}</span>
        </div>
        <div class="item after">
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
      <div class="opt after">
        <div>
          <span class="mar" @click.stop="compile(listinfor[index].riid,listinfor[index])"><span>编辑</span></span>
          <span @click.stop="del(list.riid)" class="mar" v-if="list.riid">删除</span>
        </div>
      </div>
    </div>
    <div class="footer-block"></div>
    <div class="footer bottomfix"><span class="btn" @click="goid">新建入网人</span></div>
    <!--删除入网人提示　-->
    <div class="pal-box"></div>
    <div class="agree">
      <h3>确认删除此入网人信息</h3>
      <div>
        <button @click="close()">取消</button>
        <button @click="qr()">
          确认
        </button>
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
  import {mapState} from 'vuex'
  import local from '../../common/js/localStorage'
  export default {
    data () {
      return {
        listinfor: '',
        delid:''
      }
    },
    computed: {
      Msg(){
        return this.$store.state.Msg
      },
//      userid(){
//        return this.$store.state.userid
//      },
//      token(){
//        return this.$store.state.token
//      },
      riid(){
        return this.$store.state.riid
      },
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
          console.info('这是入网dd人信息列表', res);
          let lists = res.body.Data;
          this.listinfor = lists
        });
      },
//关闭提示
      close(){
        $('.pal-box').fadeOut(200);
        $('.agree').hide();
      },
//确认删除
      qr(){
        this.close();
//          alert(111);
        let timestamp = date();
        let six = sixs();
//        alert(id);
        let pars = {
          riid:this.delid,
          sign: '',
          timestamp: timestamp,
          token: this.token,
          userid: this.userid,
        };
        pars.sign = getsign(pars, 'DeleteRWRInfo', six);
        this.$http.post('https://api.bridgingtop.com/Sim/DeleteRWRInfo', pars).then((res) => {
          console.info('这是列表', res);
          console.info(res);
          //删除列表
          this.getlist()
        });
      },
      del(id){
        this.delid=id;
        $('.pal-box').fadeIn(200);
        $('.agree').show(200);
        console.info('删除s成功');
      },
      gopdetail(num){
//        alert(num)
        this.$store.commit('detailnum',num);
        this.$router.push({path:'/submit'})
      },
//      compile(key){
//          alert( key);
//        console.info('zhesheshemme', this.userid)
//        console.info('学校id',this.schoolId)
//        let areaid = this.$store.state.id == '' ? 1018 : this.$store.state.id;
//        let timestamp = date();
//        let six=sixs();
//        console.info('当前时间',timestamp);
//        console.info('这是加6',six);
//        //测试
//        let params = {
//          address:this.listinfor[key].address,
//          areaid: areaid,
//          contactphone:this.listinfor[key].contactphone,
//          fmurl: "",
//          idcard: this.listinfor[key].idcard,
//          major: this.listinfor[key].major,
//          name: this.listinfor[key].name,
//          riid:this.listinfor[key].riid,
//          rxyear: this.listinfor[key].rxyear,
//          school: this.listinfor[key].school,
//          sf: this.listinfor[key].sf,
//          sid:this.listinfor[key].sid,
//          sign: '',
//          timestamp:timestamp,
//          token: this.token,
//          userid: this.userid,
//          validtime: this.listinfor[key].validtime,
//          zmurl: '',
//        };
//        params.sign = getsign(params,'EditRWRInfo',six);
//        if(this.token){
//          this.$http.post('http://api.bridgingtop.com/Sim/EditRWRInfo', params).then((res) => {
//            console.info(res);
//            console.info('这是用户信息开始吧少你啊',res);
//            let Msg = res.body.Msg;
////            let manid=res.data.Data;
////            console.info('wairi',manid)
//            console.info('卧槽啦', Msg);
//
//          });
//        }
//
//      },
      compile(riid,info){
          console.info('这是用户信息',info);
          // 添加 vuex数据
        this.$store.commit('names',info.name);
        this.$store.commit('cardid', info.idcard);
        this.$store.commit('validtime',info.validtime);
        this.$store.commit('address',info.address);
        this.$store.commit('phone',info.contactphone);
        this.$store.commit('rxyear',info.rxyear);
        this.$store.commit('major',info.major);
        this.$store.commit('school',info.school);
        this.$store.commit('schoolId',info.sid);
        this.$store.commit('sfs', info.sf);
//          alert(riid)
        this.$router.push({ name: 'id', params:{id:riid }})
      },
      goid(){
//          alert(111)
        // 添加 vuex数据
        this.$store.commit('names','');
        this.$store.commit('cardid', '');
        this.$store.commit('validtime','');
        this.$store.commit('address','');
        this.$store.commit('phone','');
        this.$store.commit('rxyear','');
        this.$store.commit('major','');
        this.$store.commit('school','');
        this.$store.commit('schoolId','');
        this.$store.commit('sfs','');
        this.$router.push({ name: 'id', params:{id:99998 }})
      }
    },

    created(){
      document('入网人列表');
      this.getlist()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
