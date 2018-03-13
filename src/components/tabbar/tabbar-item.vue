<template>
  <a class="tabbar-item" :class="{'is-active':isActive}" @click="onItemClick()">
    <slot name="icon"></slot>
    <slot name="label"></slot>
  </a>
</template>
<script>
export default {
  mounted () {
    this.$nextTick(() => { // 手动刷新页面时，重定向底部导航
      if (this.selected) {
        this.$parent.$emit('input', this.value)
      }
    })
  },
  props: {
    value: [String],
    link: [String, Object],
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onItemClick () { // 底部导航切换
      this.$nextTick(() => {
        this.$parent.$emit('input', this.value)
      })
      this.$router.push(this.link)
    }
  },
  computed: {
    isActive () { // 判定是否当前导航被选中
      return this.$parent.value === this.value
    }
  },
  data () {
    return {
      currPage: false
    }
  }
}
</script>
<style scoped lang="scss">
.tabbar-item {
  flex: 1;
  text-align: center;
  .tabbar-item-icon {
    display: block;
    padding-top: 0.1rem;
    font-size: 0.36rem;
  }
  .tabbar-item-text {
    display: block;
    font-size: 0.22rem;
    color: #949494;
  }
  &.is-active {
    .tabbar-item-text {
      color: #f28300;
    }
    .tabbar-item-icon {
      color: #f28300;
    }
  }
}

</style>
