<template>
  <div class="header">
     <div> {{title}}</div>
  </div>
</template>

<script>
    export default {
        data () {

        },
      props:{
        title:{
          type:String
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
