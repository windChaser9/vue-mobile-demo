<template>
  <!-- 公用的footer不一定要写成完全的组件形式，每个项目根据需要进行修改就行。
  当然，如果一个项目中多次使用则另说 -->
  <div class="footer">
    <div v-for="item in navs" :key="item.id" :class="{'is-active': currPage === item.id}" @click.stop.prevent="cNavs(item)">
      <span class="footer-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <span class="footer-text">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'x-footer',
    props: {
      navs: [Array]
    },
    data () {
      return {
        msg: 'footer'
      }
    },
    computed: {
      // 返回当前主页id
      currPage () {
        return this.$route.meta.pageID
      }
    },
    methods: {
      // 导航点击
      cNavs: function (item) {
        this.$router.replace({path: item.path})
      }
    }
  }
</script>
<style lang="scss">
  @import './../scss/define';
  .footer{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    @include px2rem(height, 90px);
    background: #fff;
    border-top: 1px solid #e4e4e4;
    >div {
      flex: 1;
      box-sizing: border-box;
      @include px2rem(padding, (10px 0px));
      text-align: center;
      .footer-icon {
        display: block;
        .icon{
          @include px2rem(height, 40px);
          @include px2rem(width, 40px);
          color: #666;
        }
      }
      .footer-text {
        display: block;
        font-size: px2em(26px);
        color: #949494;
      }
      &.is-active {
        .footer-text {
          color: #f28300;
        }
        .icon {
          color: #f28300;
        }
      }
    }
  }
</style>