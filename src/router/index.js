import Vue from 'vue';
import Router from 'vue-router';
import banli from '@/components/banli';
import cshi from '@/components/ceshi.vue';
import xieyi from '@/components/xieyi';
import xuanhao from '@/components/xuanhao';
import submit from '@/components/submit';
import codeuse from '@/components/codeuse';
import pay from '@/components/pay';
import finish from '@/components/finish';
import id from '@/components/id';
import school from '@/components/school';
import details from '@/components/details';
import list from '@/components/list';
import myorder from '@/components/myorder';
import bid from '@/components/myorder/bid';
import recharge from '@/components/myorder/recharge';
import city from '@/components/city';
import p_detail from '@/components/p_detail';
// import dz from  '@/components/banli/dz';
// import tcA from  '@/components/banli/tcA';
// import tcB from  '@/components/banli/tcB';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'banli',
      component: banli,
      // redirect:'/dz',
      // children: [
      //   {
      //     path: 'dz',
      //     name: 'dz',
      //     component: dz,
      //   },
      //   {
      //     path: 'tcA',
      //     name: 'tcA',
      //     component: tcA,
      //   },
      //   {
      //     path: 'tcB',
      //     name: 'tcB',
      //     component: tcB,
      //
      //   }
      // ]
    },
    {
      path: '/ceshi',
      name: 'eshi',
      component: cshi,
      meta:'日本',

    },
    {
      path: '/xieyi',
      name: 'xieyi',
      component: xieyi,
      meta:'日本',
    },
    {
      path: '/xuanhao:id',
      name: 'xuanhao',
      component: xuanhao,
      meta:'日本',
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit
    },
    {
      path: '/codeuse',
      name: 'codeuse',
      component: codeuse,
      meta:'日本',
    },
    {
      path: '/pay',
      name: 'pay',
      component:pay
    },
    {
      path: '/finish',
      name: 'finish',
      component:finish
    },
    {
      path: '/id:id',
      name: 'id',
      component:id,

    },
    {
      path: '/school',
      name: 'school',
      component:school
    },
    {
      path: '/details',
      name: 'details',
      component:details
    },
    {
      path: '/list',
      name: 'list',
      component:list
    },
    {
      path: '/city',
      name: 'city',
      component:city
    },
    {
      path: '/person',
      name: 'p_detail',
      component:p_detail
    },
    {
      path: '/myorder',
      name: 'myorder',
      component:myorder,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'bid',
          component: bid
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'recharge',
          component: recharge
        }
      ]
    },
  ]
});
