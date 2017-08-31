<template>
  <div id="banli">
    <!--<div v-title>SIM办理</div>-->
    <div style="display: none">{{cbid}}</div>
    <div class="target">
      <h3>目标申办城市</h3>
      <a>
        <span>海口</span>
      </a>
    </div>
    <div class="after">
      <h3>套餐类型</h3>
      <div class="tc-type">
        <span v-if="list.length" v-for="(item,index) in list" @click="tabToggle(index,item.offertypename,item.cbid)"
              :class="'tab'+index" class="tab">{{item.cbname}}</span>
        <div class="tc-price dz" v-for="(item,index) in list" v-if="item.offertypename=='dz'">
          <h3>套餐金额</h3><span class="after">(套餐金额不能低于{{item.price}}元哦)</span>
          <div class="tc-choice">
            <div class="list">
              <span class="mar">流量</span>
              <input type="text" placeholder="500" class="mar" :value="cliuliangs" @input="cliuliang">
              <span class="unit">MB</span>
              <span class="pri right">{{item.ccll}}</span>
            </div>
            <div class="list">
              <span class="mar">语音</span>
              <input type="text" placeholder="500" class="mar" :value="cyuyins" @input="cyuyin">
              <span class="unit">分钟</span>
              <span class="pri right">{{item.ccyy}}</span>
            </div>
            <div class="list">
              <span class="mar">短信</span>
              <input type="text" placeholder="500" class="mar" :value="cdxs" @input="cdx">
              <span class="unit">条</span>
              <span class="pri right">{{item.gnsms}}</span>
            </div>
            <p class="detail" v-for="it in item.notelist">{{ it.note }}</p>
            <p class="detail">套餐价格：<span class="">{{ (lls(cliuliangs) + yyins(cyuyins) + dxs(cdxs)).toFixed(2)
              }}元／月</span></p>
            <div class="tw">
              <span>套外资费</span>
              <p class="tcw">
                {{item.overage}}
              </p>
            </div>
          </div>
        </div>
        <div class="tc-price dz" v-for="(item,index) in list" v-if="item.offertypename=='fdz'">
          <h3>套餐金额</h3>
          <span class="title"></span>
          <div class="tc-choice fdz">
            <div class="list fdz">
              <span class="mar">流量</span>
              <span class="pri">{{item.gntraffic}}</span>
            </div>
            <div class="list fdz">
              <span class="mar">语音</span>
              <span class="pri">{{item.gnvoice}}</span>
            </div>
            <div class="list fdz">
              <span class="mar">短信</span>
              <span class="pri">{{item.gnsms}}</span>
            </div>
            <p class="detail" v-for="it in item.notelist">{{ it.note }}</p>
            <p class="detail">套餐价格：<span>{{item.price}}元／月</span></p>
            <div class="tw">
              <span>套外资费</span>
              <p>
                {{item.overage}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--套餐价格-->
    <!--下一步-->
    <div class="footer-block"></div>
    <div class="footer bottomfix" v-if="list.length">
      <router-link to="/xieyi" class="btn">下一步，阅读入网协议</router-link>
    </div>
    <div class="rwz-title fixed orno" >当前城市尚未开通办理业务</div>
  </div>
</template>

<script>
  import header from '../header/index.vue'
  import A from '../directive'
  import B from '../pal';
  import $ from 'jquery';
  import {mapState} from 'vuex'
  import dz from './dz/index'
  import tcA from './tcA/index'
  import tcB from './tcB/index'
  import local from '../../common/js/localStorage'
  import document from '../../common/js/title'
  var domain = 'http:// api.bridgingtop.com';
  export default {
    data () {
      return {
        title: 'SIM卡办理',
        isActive: false,
        isActives: true,
        list: '',
        ll: '500',
        yyin: '100',
        dx: '100',
        //class 判断
        active: true,
        opinion: '',
        tab1active: true
      }
    },
    created(){
      document('SIM办理');
      let areaid = this.areaid == '' ? 1045 : this.areaid;
      this.$http.get('https://api.bridgingtop.com/Sim/GetComboInfo_V2', {
        params: {
          areaid: 1045
        }
      }).then((res) => {
        console.info('这是套餐类型3333888888888', res);
        let data = res.body.Data;
        let msg=res.body.Msg;
        console.info(msg);
        if(msg !='操作成功'){
          $('.orno').html(msg).fadeIn(200, function () {
            $('.orno').fadeOut(200)
          }).delay(1500)
        }
        let cbid = data[0].cbid;
        this.$store.commit('cbid', cbid);
        this.list = data;
        //创建初始的订单编号

      });
      //储存 短信 。。。
      this.$store.commit('cliuliang', this.ll);
      this.$store.commit('cyuyin', this.yyin);
      this.$store.commit('cdx', this.dx);
      //调用函数 判断当前城市是否开通
      this.judgeCity()
    },
    methods: {
      tabToggle: function (num, type, id) {
        this.$store.commit('changeKey', num);
        this.$store.commit('combotype', type);
        this.$store.commit('cbid', id);
        $('.dz').removeClass('tc-price');
        $('.dz').eq(num).addClass('clickAfter').siblings('.dz').removeClass('clickAfter');
        $('.tab0').css({background: 'none', color: '#F5A623'})
        $('.tab').eq(num).addClass('active').siblings('.tab').removeClass('active')
      },
      getpos(){
        var self = this;

        function showPosition() {
          var latlon = '31.20108,121.5767';
          self.$http.jsonp('https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + latlon + '&output=json&pois=1&ak=dECHZkE2hdgGvkjLEMlsssCi').then(function (response) {
            //console.log(response)
            if (response.body.status == 0) {
              self.city = response.body.result.addressComponent.city;
            } else {
              self.citys = '杭州市';
            }
          }, function (response) {
            // 这里是处理错误的回调
            console.log(response);
            self.city = '无法获取位置1';
          });
        }

        showPosition()
      },
      lls(num){
        if (num < 100) {
          return num * 0.15
        } else if (num >= 100 && num < 500) {
          return 100 * 0.15 + (num - 100) * 0.07
        } else {
          return 100 * 0.15 + 400 * 0.07 + (num - 500) * 0.05
        }
      },
      yyins(num){
        if (num < 500) {
          return num * 0.15
        } else if (num >= 500 && num < 1000) {
          return 500 * 0.15 + (num - 500) * 0.12
        } else {
          return 500 * 0.15 + 900 * 0.12 + (num - 1000) * 0.08
        }
      },
      dxs(num){
        if (num < 50) {
          return num * 0.1
        } else if (num >= 50 && num < 500) {
          return 50 * 0.1 + (num - 50) * 0.06
        } else {
          return 50 * 0.1 + 450 * 0.06 + (num - 500) * 0.05
        }
      },
      cliuliang (e) {
        this.$store.commit('cliuliang', e.target.value)
      },
      cyuyin (e) {
        this.$store.commit('cyuyin', e.target.value)
      },
      cdx (e) {
        this.$store.commit('cdx', e.target.value)
      },
      judgeCity(){
        this.$http.get('https://api.bridgingtop.com//Member/JudgeAreaService/', {
          params: {
            aname: this.city
          }
        }).then((res) => {
//          console.info('判断城市是否开通',res);
          console.info('是否开通', res)
          let data = res.body.Data;
          this.opinion = data;
        });
      }

    },
    computed: {
      city(){
        this.$store.state.city = '海口'
        return this.$store.state.city
      },
      areaid(){
        console.log('id1+'+this.$store.state.id)
        this.$store.state.id = 1045;
        return this.$store.state.id
      },
      //获取key 值
      key(){
        return this.$store.state.key
      },
      //测试 取值
      cliuliangs(){
        return this.$store.state.cliuliang
      },
      cyuyins(){
        return this.$store.state.cyuyin
      },
      cdxs(){
        return this.$store.state.cdx
      },
      //提取套餐类型
      combotype(){
        return this.$store.state.combotype
      },
      cbid(){
        return this.$store.state.cbid
      },
      //mapstate
//      ...mapState({
//        areaid:function (state) {
//          let cityid=local.getItem('id');
//          if(state.id===''&& cityid){
//            this.$store.commit('changeId',cityid)
//          }
//          return state.id
//        },
////        city:function (state) {
////
////        }
//
//
//      })

    },
    mounted(){
//        异步执行


    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../common/sass/common";
  @import "./index";
</style>
