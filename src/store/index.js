/**
 * Created by linger on 2017/7/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import local from  '../common/js/localStorage'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
     city:'杭州',
    //套餐id
     cbid:'',
     id:'',
     key:0,
     cliuliang:'',
     cyuyin:'',
     cdx:'',
     code:'',
    //定制金额
     dzprice:'',
     ycprice:0,
    //预存款id
     ycid:'',
    //选择学校
    school:'',
    schoolId:'',
    // 身份 学生 非学生
    sf:'学生',
    // 获取用户信息
    userid:'',
    token:'',
    nickname:'',
    //用户信息保存状态
    Msg:'',
    //套餐类型
    combotype:'dz',
    //邀请码
    invitecode:'',
    jifen:'',
  //  记录订单编号
    orderno:'',
    //个人信息记录
    names:'',
    cardid:'',
    validtime:'',
    address:'',
    phone:'',
    rxyear:'',
    major:'',
    sfs:'',
    //保存用户信息详情索引值
    detailnum:0,
    //保存入网人信息id
    riid:'',
  },
  mutations: {
    //选择城市
    city(state,now){
      state.city=now;
    },
    changeId(state,now){
      state.id=now;
    },
    //ceshi
    names(state,now){
      state.names=now;
    },
    cardid(state,now) {
      state.cardid=now;
    },
    validtime(state,now) {
      state.validtime=now;
    },
    address(state,now) {
      state.address=now;
    },
    phone(state,now) {
      state.phone=now;
    },
    rxyear(state,now) {
      state.rxyear=now;
    },
    major(state,now) {
      state.major=now;
    },
    sfs(state,now) {
      state.sfs=now;
    },
    //城市id 选择
    //套餐id
    cbid(state,now){
      state.cbid=now;
      local.setItem('cbid',now)

    },
    //获取key值
    changeKey(state,now){
      state.key=now;

    },
    //套餐类型存值
    combotype(state,now){
      state.combotype=now;

    },
    //选择套餐存值
    cliuliang(state,now){
      state.cliuliang=now;

    },
    cyuyin(state,now){
      state.cyuyin=now;

    },
    cdx(state,now){
      state.cdx=now;

    },
    code(state,now){
      state.code=now;

    },
    //定制套餐金额
    dzprice(state,now){
      state.dzprice=now;

    },
    ycid(state,now){
      state.ycid=now;

    },
    //预存款
    ycprice(state,now){
      state.ycprice=now;

    },
    //获取 学校内容
    school(state,now){
      state.school=now;
      local.setItem('school',now)
    },
    schoolId(state,now){
      state.schoolId=now;

    },
    //身份
    sf(state,now){
      state.sf=now;

    },
    //用户 useid
    userid(state,now){
      state.userid=now;
      local.setItem('userids',now)
    },
    token(state,now){
      state.token=now;
      local.setItem('tokens',now)
    },
    nickname(state,now){
      state.nickname=now;

    },
    //保存用户状态
    Msg(state,now){
      state.Msg=now;

    },
    //邀请码和积分
    invitecode(state,now){
      state.invitecode=now;

    },
    jifen(state,now){
      state.jifen=now;

    },
    //记录订单编号
    orderno(state,now){
      state.orderno=now;
      local.setItem('orderno',now)
    },
    //保存用户信息详情索引值
    detailnum(state,now){
      state.detailnum=now;
      local.setItem('detailnum',now)
    },
    //操作入网人信息id
    riid(state,now){
      state.riid=now;
    },
    },
  actions: {
    userid ({commit},now) {
         commit('userid',now)
    },
    token ({commit},now) {
         commit('token',now)
    },
    //用户保存状态
    Msg ({commit},now) {
      commit('Msg',now)
    },
    //用户信息
    invitecode ({commit},now) {
      commit('invitecode',now)
    },
    jifen ({commit},now) {
      commit('jifen',now)
    },

  }

})
