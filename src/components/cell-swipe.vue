<template>
  <!-- 滑动组件 -->
  <div class="x-cell-swipe"
    v-clickoutside:touchstart="swipeMove"
    @click="swipeMove()"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend.stop="touchEnd">
    <x-cell
      :isGraphic="isGraphic"
      :to="to"
      ref="cell">
      <slot slot="poster" name="poster"></slot>
      <slot slot="left" name="left"></slot>
      <slot slot="right" name="right"></slot>
    </x-cell>
    <div 
      class="left btn-group"
      ref="leftBtn">
      <slot name="leftBtn"></slot>
    </div>
    <div
      class="right btn-group"
      ref="rightBtn">
      <a
      v-for="btn of rightBtn"
      class="btn"
      :style="btn.style"
      v-html="btn.content"
      :key="btn.content"
      @click.stop.prevent="btn.handler && btn.handler(index)"></a>
    </div>
  </div>
</template>
<script>
  import XCell from '~/cell'
  import Clickoutside from '@/tool/clickoutside'
  /**
   * 按钮示例
   * rightBtn: [{
   *   content: '删除',
   *   style: {backgroundColor: 'red'},
   *   handler: clickName
   * }]
   */
  export default {
    name: 'x-cell-swipe',
    components: {
      XCell
    },
    directives: {
      Clickoutside
    },
    props: {
      isGraphic: Boolean, // 是否图文
      to: String, // 跳转链接
      leftState: Boolean, // leftBtn显示状态
      rightBtn: Array, // 右边部分按钮数组
      index: Number // 当前项的索引，页面用于删除
    },
    data () {
      return {
        startArray: [], // x轴滑动距离数组
        offsetWidth: null, // 左右滑动距离
        direction: '', // 滑动方向
        swiping: false // 结束时是否处于滑动状态
      }
    },
    mounted () {
      this.cellElm = this.$refs.cell.$el
      this.leftElm = this.$refs.leftBtn
      this.rightElm = this.$refs.rightBtn
      let timer = setTimeout(() => { // 避免刷新时rem设置导致的闪屏异常问题
        this.leftWidth = this.leftElm.getBoundingClientRect().width
        this.leftElm.style.webkitTransform = this.translate3d(-this.leftWidth)
        this.rightWidth = this.rightElm.getBoundingClientRect().width
        this.rightElm.style.webkitTransform = this.translate3d(this.rightWidth + 1)
        clearTimeout(timer)
      }, 50)
    },
    watch: {
      leftState () {
        if (this.leftState && !this.swiping) {
          this.swipeMove(this.leftWidth)
          this.direction = 'right'
        } else if (!this.leftState && !this.swiping) {
          this.direction = ''
          this.swipeMove()
        }
      }
    },
    methods: {
      translate3d (offset = 0) {
        return `translate3d(${offset}px, 0, 0)`
      },
      setAnimations (val) {
        this.cellElm.style.transitionDuration = val
        this.leftElm.style.transitionDuration = val
        this.rightElm.style.transitionDuration = val
      },
      swipeMove (offset = 0) {
        this.setAnimations('200ms')
        // 出现leftBtn时点击不能滑动
        if (this.direction === 'right') return
        this.cellElm.style.webkitTransform = this.translate3d(offset)
        this.leftElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset)
        this.rightElm.style.webkitTransform = this.translate3d(this.rightWidth + offset + 1)
        if (offset === 0) this.swiping = false // 恢复原状态
      },
      touchStart (e) {
        // 重置相关数据
        this.offsetWidth = this.offsetHeight = 0
        this.startArray.length = 0
        this.startArray.push(e.touches[0].pageX)
        this.startArray.push(e.touches[0].pageY)
      },
      touchMove (e) {
        const offsetWidth = this.offsetWidth = e.changedTouches[0].pageX - this.startArray[0]
        const offsetHeight = this.offsetHeight = e.changedTouches[0].pageY - this.startArray[1]
        if (this.direction === 'right') return
        if (this.swiping && offsetWidth <= 0) { // 处于滑动状态时左滑
          return
        } else if (this.swiping) { // 处于滑动状态时右滑
          this.swipeMove(0)
          return
        }
        // 左右小于5，上下大于3时不允许滑动
        if (Math.abs(offsetHeight) > 3) return
        // 右滑或超过按钮宽度
        if (offsetWidth > 0 || -offsetWidth > this.rightWidth) {
        } else {
          this.swipeMove(offsetWidth)
          console.log(this.swiping)
        }
      },
      touchEnd (e) {
        if (this.swiping || this.direction === 'right') return // 处于滑动状态不做其他操作
        if (this.offsetWidth > 0) { // swipe left
          return
        } else if (Math.abs(this.offsetHeight) < 5 && this.offsetWidth < 0 && -this.offsetWidth > this.rightWidth * 0.4) { // 大于0.4倍时滑动整个宽度，同时上下滑动不能大于5
          this.swipeMove(-this.rightWidth)
          this.swiping = true
          return
        }
        // 滑动距离小于0.4倍时恢复原状
        this.swipeMove(0)
      }
    }
  }
</script>
<style scoped lang="scss">
  .x-cell-swipe{
    display: block;
    overflow: hidden;
    position: relative;
    transition: transform 250ms ease-in-out;
    .btn-group{
      display: flex;
      position: absolute;
      top: 0;
      // border-bottom: 1px solid #e5e5e5;
      min-width: 100px;
      height: 100%;
      font-size: 30px;
      text-align: center;
      color: #fff;
    }
    .left{
      left: 0;
      height: 100%;
      color: #999;
      transform: translate3d(-100%, 0, 0);
      div,span{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
    .right{
      right: 0px;
      transform: translate3d(100%, 0, 0);
      a{
        display: flex;
        min-width: 120px;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: red;
      }
    }
  }
</style>