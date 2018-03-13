<template>
  <a class="x-cell" :class="cellStyle" :href="href">
    <!-- 图文列表时海报填充 -->
    <slot name="poster"></slot>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </a>
</template>
<script>
  export default {
    name: 'x-cell',
    props: {
      isGraphic: { // 是否图文
        type: Boolean,
        default: false
      },
      to: String // 跳转链接
    },
    data () {
      return {
        msg: ''
      }
    },
    computed: {
      cellStyle () {
        return {
          'cell-icon': !this.isGraphic,
          'cell-img': this.isGraphic
        }
      },
      href () { // 学习自mint-ui
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          if (!resolved.matched.length) return this.to
          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })
          return resolved.fullPath || resolved.path
        }
        return this.to
      }
    },
    methods: {
      handleClick ($event) {
        $event.preventDefault()
        this.$router.push(this.href)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import './../scss/define';
  .x-cell{
    display: flex;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    padding: 0px 20px;
    font-size: 26px;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: #111;
  }
  // 字符或图片简单列表
  .cell-icon{
    height: 79px;
    .left,.right{
      display: flex;
      height: 100%;
      align-items: center;
      span:not(.icon){
        margin: 2px 10px 0px;
      }
    }
    .left{
      .icon,img{
        height: 50px;
        width: 50px;
      }
    }
    .right{
      .icon,img{
        width: 30px;
        height: 30px;
        color: #999;
      }
    }
  }
  // 图文类型
  .cell-img{
    padding-top: 10px;
    padding-bottom: 10px;
    img{
      max-width: 245px;
      height: 142px;
    }
    .right{
      flex: 1;
      margin-left: 10px;
      height: 100%;
      p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child{
          font-size: 32px;
          -webkit-line-clamp: 1;
        }
        &:nth-child(2){
          -webkit-line-clamp: 2;
          margin-top: 5px;
          color: #666;
        }
      }
    }
  }
</style>