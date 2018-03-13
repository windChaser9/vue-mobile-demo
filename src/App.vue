<template>
  <div id="app" class="page">
    <!-- 如果整个应用页面header基本一致或大部分一致，则可以直接设置在入口vue文件中，避免多次引入；
    如果只有少量页面有header，则只需在每个页面使用 -->
    <!-- 顶部header -->
    <x-header v-show="isShowHeader" :fixed="true" :title="this.$route.meta.title">
      <svg slot="left" @click.stop.prevent="cBack" class="icon" aria-hidden="true">
        <use xlink:href="#icon-return"></use>
      </svg>
      <router-link to="/login" slot="right">分享</router-link>
    </x-header>
    <!-- 内容部分 -->
    <div class="content" :class="classContent">
      <keep-alive>
        <router-view v-if="$route.meta.alive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.alive"></router-view>
    </div>
    <!-- 底部导航 -->
    <x-footer v-show="isShowFooter" :navs="navs"></x-footer>
  </div>
</template>

<script>
import XHeader from '~/Header'
import XFooter from '~/Footer'
export default {
  name: 'app',
  components: {
    XHeader,
    XFooter
  },
  data () {
    return {
      navs: [{
        path: '/',
        icon: '#icon-home',
        name: '主页',
        id: 1
      }, {
        path: '/more/moreIndex',
        icon: '#icon-cascades',
        name: '更多',
        id: 2
      },
      {
        path: '/user/userIndex',
        icon: '#icon-people',
        name: '关于',
        id: 3
      }]
    }
  },
  computed: {
    // 全局显示用状态管理控制，也可通过router参数配置管理，单个页面使用则不需要
    isShowHeader () { // 是否显示顶部标题栏
      return this.$store.state.isShowHeader
    },
    isShowFooter () { // 是否显示底部导航
      return this.$store.state.isShowFooter
    },
    classContent () { // 显示标题时，调整content的css
      return {
        'content-h': this.isShowHeader,
        'content-f': this.isShowFooter
      }
    }
  },
  methods: {
    cBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
  @import './scss/common';
  @import './scss/define';
  .page{
    height: 100%;
    width: 100%;
    .content{
      height: 100%;
      // 设置box-sizing避免页面没有满屏加入padding时出现可滚动现象
      box-sizing: border-box;
      // 为避免ios出现进入页面，再进入子页面返回后出现空白bug，此处手动设置overflow-y，不采用浏览器默认滚动
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
