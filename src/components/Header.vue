<!-- 导航栏 -->
<template>
  <div class="header" v-show="isShow" :class="{'is-fixed': fixed}">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <!-- <div class="back" @click.stop.prevent="cBack">
      <slot name="back"></slot>
    </div> -->
    <h1>{{title}}</h1>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'x-header',
  props: {
    title: [String], // 标题
    fixed: [Boolean] // 是否固定顶部
  },
  computed: {
    // 微信环境，ios默认隐藏，看需求
    isShow: function () {
      return true
      // return !this.isIos && this.isWx
    }
  },
  data () {
    return {
      isIos: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // 是否ios
      isWx: !!(navigator.userAgent.search(/micromessenger/i) > 0) // 是否微信内置环境
    }
  },
  methods: {
    cBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
@import './../scss/define';
.header {
  display: -webkit-flex;
  display: flex;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  z-index: 501;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #c7c7c7;
  padding: 0px 20px;
  height: $headerHt;
  line-height: 1;
  align-items: center;
  font-size: 26px;
  background-color: #FFF;
  h1 {
    overflow: hidden;
    font-size: 32px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .left,.back {
    flex: .2;
    height: 100%;
    text-align: left;
  }
  .right {
    flex: .2;
    text-align: right;
    div,span,a{
      display: inline-block;
      height: 100%;
      line-height: $headerHt;
    }
  }
  a {
    color: #111;
  }
  .icon{
    width: 40px;
    height: 100%;
  }
}
.is-fixed{
  position: fixed;
}
</style>
