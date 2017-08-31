<template>
  <div class="school">
    <div v-title>学校选择</div>
    <div class="search">
     <input type="text" placeholder="输入你的学校名称" class="btn sousuo" v-model="sc" @blur="onBlur">
   </div>
    <!-- 学校列表-->
   <span to="/id1">
     <div class="item schoolitem" v-for="(it,index) in list" :key="it.sid" @click="getschool(it.sname,it.sid,index)">{{it.sname}}</div>
   </span>
  </div>
</template>

<script>
  import A from '../directive'
  import $ from 'jquery';
  import document from '../../common/js/title'
  export default {
        data () {
          return{
            title:'学校选择',
            list:[],
            sc:''
          }
        },
        created(){
          document('学校选择');
          this.getlist()
          //学校搜索
          if(this.sc){

          }
        },
       methods:{
         getschool(school,num,index){
           this.$store.commit('school',school);
           this.$store.commit('schoolId',num);
           $('.schoolitem').eq(index).addClass('schoolactive').siblings('.schoolitem').removeClass('schoolactive')
          this.$router.go(-1)
         },
         getlist(sc){
           let areaid=this.$store.state.id=='' ? 1018 :this.$store.state.id;
           this.$http.get('https://api.bridgingtop.com/Member/GetSchoolList',{
             params: {
               areaid:areaid,
               sname:sc?sc:''
             }
           }).then((res)=>{
             console.info(res)
             let data=res.body.Data;
             this.list=data;
             console.info('这是data',this.list)
           });
         },
         onBlur(){
           this.list='';
           this.getlist(this.sc)
         }

       },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
