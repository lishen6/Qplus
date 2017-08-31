<template>
  <div id="city">
    <div v-title>切换城市</div>
    <div>
      <div id="showCityContent"></div>
      <div v-for="item in showCity" class="letter-item">
        <div><a :id="item.letter">{{item.letter}}</a></div>
        <div v-for="(i,index) in item.citylist" :key="item.id">
          <router-link to="/"><span @click="change(i)" class="it" ref="it">{{i}}</span></router-link>
        </div>
      </div>
    </div>
    <aside class="letter-aside">
      <ul>
        <li v-for="item in showCity" @click="naver(item.letter)">{{item.letter}} </li>
      </ul>
    </aside>
    <div id="tip">
      {{tipString}}
    </div>
  </div>
</template>

<script>
  import pinyin from 'pinyin'
  import $ from 'jquery';
  var cityLists = [];
  var cityNames = [];
  var cityNamesFilter = [];
  var letter = [];
  var countPage = 0;
  var tipLetter = '';
  var citySearch = '';
  var showCity = [];
  var showCityList = [];
  var showCityTemp;
  var ids={};
  export default {
    beforeCreated: function () {
    },
    updated: function () {

    },
    created: function () {
      countPage++;
      if (countPage < 2) {
        this.$http.get('http://test.bridgingtop.com/Member/GetCity/').then(response => {
          // get status
//          获取城市数组
          let cityList = response.body.Data;
          console.log(cityList)
          console.info('这是data',response.body.Data);
          for (let i in cityList) {
            cityLists = cityList[i];
            console.info('这是数组',cityLists);
            for (let j of cityLists) {
                //我的目的就是要获取城市名称;
              cityNames.push(j.name);
              ids[j.name]=j.areaid;
            }
          }
          console.info(ids)
          cityNamesFilter = cityNames;
          this.cityFilter(this.citySearch);
          this.someData = response.data.body
        }, response => {
            document.write('暂无数据')
        })
      }
    },
    mounted: function () {
     this.init()
    },
    methods: {
      buildLetter: function () {  // 构建字母项
        letter = [];
        for (let i = 0; i < 26; i++) {
          let obj = {};
          obj.letter = String.fromCharCode((65 + i));
          obj.citylist = [];
          letter.push(obj)
        }
      },
      getFirstLetter: function (str) { //  得到城市第一个字的首字母
        return pinyin(str)[0][0].charAt(0).toUpperCase()
      },
      buildItem: function (cityNamesFilter) {  // 构建城市
        this.buildLetter();
        let _this = this;
        for (let i = 0; i < 26; i++) {
          letter[i].citylist = []
        }
        for (let i = 0; i < cityNamesFilter.length; i++) {
          let _index = Number(_this.getFirstLetter(cityNamesFilter[i]).charCodeAt() - 65)
          if (_index >= 0 && _index < 26) {
            letter[_index].citylist.push(cityNamesFilter[i])
          }
        }
        // 如果letter中citylist中没有值的话，过滤这一项
        showCity = showCityTemp = letter.filter(function (value) {
          let len = value.citylist.length;
          return len > 0
        });
        console.info('鬼鬼',showCity)
      },
      naver: function (id) { // 点击右边字母滚动
        this.tipString = id;
        let obj = document.getElementById(id);
        let tip = document.getElementById('tip');
        tip.setAttribute('class', 'tipAppear');
        setTimeout(function () {
          tip.removeAttribute('class')
        }, 500);
        let oPos = obj.offsetTop;
        return window.scrollTo(0, oPos - 36)
      },
      cityFilter: function (city) {  // 城市搜索筛选
        let showCityListTemp;
        this.buildItem(cityNamesFilter);
        showCity = showCityTemp;
        showCity = showCity.filter(function (value) {
          showCityList = value.citylist
          showCityListTemp = showCityList.filter(function (val) {
            return (val.indexOf(city) > -1)
          });
          value.citylist = showCityListTemp
          return value.citylist.length > 0
        });
        this.showCity = showCity
        if (showCity.length === 0) {
          let _showCityContent = document.getElementById('showCityContent')
          _showCityContent.innerText = '查询不到结果'
          _showCityContent.setAttribute('class', 'tipShow')
        } else {
          document.getElementById('showCityContent').innerText = ''
        }
      },
      change(txt){
        console.info('这是现在的城市',txt);
        this.$store.commit('increment',txt)
      },
      init(){
        this.$nextTick(function () {
//          var dom=this.$refs.it;
          var dom=$('.it');
          console.info('caoco',dom)
//          alert('dom 已经完成');

        })


      }

    },
    data () {
      return {
        cityNames: cityNamesFilter,
        letter: letter,
        tipString: tipLetter,
        citySearch: citySearch,
        showCity: showCity
      }
    },
    watch: {
      citySearch: function (newCitySearch) {
        this.cityFilter(newCitySearch)
      }
    },

  }
</script>

<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
