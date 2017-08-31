<template>
<div>
  <div class="deo">
    <div id="diao" class="tran"></div>
  </div>
</div>
</template>

<script>
  var Domain='http:// test.bridgingtop.com';
  export default {
    created:function () {
      this.$http.get('http://test.bridgingtop.com/Member/GetCity/').then(res=>{
          console.info(res.body.Data)
      })
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.deo{
  width: 300px;
  height: 500px;
  background: red;
  position:relative;
  display: flex;
 #diao{
   width:100px;
   height:100px;
   background:#000000;
 }
}
</style>
