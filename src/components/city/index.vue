<template>
  <div id="city">
    <!--<div v-title>切换城市</div>-->
    <!--<div class="search"><input type="text" placeholder="输入城市"></div>-->
    <div>
      <div class="letter-item" v-for="(pinyin,key) in cityLists">
        <div><a :id="key">{{key}}</a></div>
        <div v-for="item in pinyin" :key="item.areaid">
          <router-link to="/"><span @click="change('海口','1045')" class="it" ref="it">{{item.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <aside class="letter-aside">
      <ul>
        <li v-for="(pinyin,key) in cityLists" @click="naver(key)">{{key}} </li>
      </ul>
    </aside>
    <div id="tip">
      {{tipString}}
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import local from '../../common/js/localStorage'
  import document from '../../common/js/title'
  var cityLists = [];
  export default {
    data () {
      return {
        cityLists,
        tipString: '',
      }
    },
    created: function () {
      document('切换城市');
      this.$http.get('https://api.bridgingtop.com/Member/GetCity/').then(response => {
        // get status
//          获取城市数组
        this.cityLists = response.body.Data;
        console.info('成熟ddd列表', this.cityLists)
      }, response => {
        document.write('暂无数据')
      })
    },
    mounted: function () {
    },
    methods: {
      naver(id){ // 点击右边字母滚动
//        alert(id);
        this.tipString = id;
        console.info(this.tipString);
        let obj = $('#'+id);
        console.info('这是obj',obj);
        let tip = $('#tip');
        console.info('这厮', tip);
        tip.attr('class', 'tipAppear');
        setTimeout(function () {
          tip.removeClass('tipAppear')
        }, 500);
        let oPos = obj.offset().top;
        console.info('这是距离',oPos);
        return window.scrollTo(0, oPos - 36)
      },
      change(txt, id){
        console.info('这是现在的城市', txt);
        this.$store.commit('city', txt);
        this.$store.commit('changeId', id);
      },
    },


  }
</script>

<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
