<template>
  <div class="tc-price">
    <div v-title>SIM办理</div>
    <h3>套餐金额</h3>
    <span class="title"></span>
    <div class="tc-choice">
      <div class="list">
        <span class="mar">流量</span>
        <span class="pri right">500MB</span>
      </div>
      <div class="list">
        <span class="mar">语音</span>
        <span class="pri right">100分钟</span>
      </div>
      <div class="list">
        <span class="mar">短信</span>
        <span class="pri right">10条</span>
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
  export default {

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .tc-price{
    h3{
      &:after{
        content:'(套餐金额不能低于39元哦)';
        display:inline-block;
        font-size: 12px;
        color: #F5A623;
        padding-left: 10px;
      }
    }
    .tc-choice{
      .list{
        margin-bottom:25px;
        span{
          flex:1;
        }
        .pri{
          vertical-align:middle;
          font-size: 12px;
        }
        .mar{
          margin-right: 16px;
        }
        &:last-of-type{
          margin-bottom: 14px;
        }
      }
      .tw{
        opacity: 0.5;
        font-size: 12px;
        color: #000000;
        margin-top: 11px;
      }
      background: #F9F9FA;
      padding:26px 22px;
      font-size: 14px;
      input{
        border: 1px solid #979797;
        border-radius: 2px;
        width:120px;
        height: 30px;
        text-align: center;
      }
      .detail{
        opacity: 0.5;
        font-size: 12px;
        color: #000000;
        margin-bottom: 2px;
        &:last-of-type{
          margin-top: 11px;
          margin-bottom: 10px;
          font-size: 18px;
          color: #4D4D4D;
          span{
            color:rgba(245,166,35,1);
          }
        }
      }

    }
  }
</style>
