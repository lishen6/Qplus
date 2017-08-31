<template>
 <div>
   <!--<div v-title>邀请码说明</div>-->
   <div class="rule">
     <div class="content">
        <h3>50000</h3>
        <p class="jifen">积分</p>
       <div class="img"><img src="../../img/tra@2x.png" alt=""></div>
       <span>兑换流量 短信 通话</span>
     </div>
   </div>
   <div class="text">
     <p>1、用户成功注册登录后，可获取一个专属于个人的邀请码。</p>
     <p>2、如果你的朋友用你的邀请码办理SIM卡成功，你和你的朋友都可以获取 <span>50000</span> 积分奖励。</p>
     <p>3、每个用户最多可得<span>500000</span>分享积分奖励。</p>
   </div>
 </div>
</template>

<script>
  import A from '../directive'
  import document from '../../common/js/title'
  export default {
     created(){
         document('邀请码说明')
     }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>

