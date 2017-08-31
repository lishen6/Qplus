<template>
  <div class="tc-price">
    <div v-title>SIM办理</div>
    <h3>套餐金额</h3>
    <span class="title"></span>
    <div class="tc-choice">
      <div class="list">
        <span class="mar">流量</span>
        <input type="text" placeholder="500" class="mar">
        <span>MB</span>
        <span class="pri right"><i>0.086</i>元每兆</span>
      </div>
      <div class="list">
        <span class="mar">语音</span>
        <input type="text" placeholder="500" class="mar">
        <span>MB</span>
        <span class="pri right"><i>0.086</i>元每兆</span>
      </div>
      <div class="list">
        <span class="mar">短信</span>
        <input type="text" placeholder="500" class="mar">
        <span>MB</span>
        <span class="pri right"><i>0.086</i>元每兆</span>
      </div>
      <p class="detail">赠送1.5G本地流量（APP预约专享）</p>
      <p class="detail">赠送100M校园光纤宽带（APP预约专享）</p>
      <p class="detail">套餐价格：<span>59.00元／月</span></p>
      <hr>
      <div class="tw">
        <span>套外资费</span>
        <p>
          国内语音0.15元/分钟，短/彩信0.1元/条，国内流量0.0001
          元/KB。其它按标准资费执行（标准资费请咨询10000号或
          当地营业厅）</p>
      </div>
    </div>
  </div>
</template>

<script>
  import A from '../../directive'
//  console.info(this.$store);
  export default {

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../../common/sass/common";
  @import "./index";
</style>
