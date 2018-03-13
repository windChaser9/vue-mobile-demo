<template>
  <div class="more">
    <x-cell v-for="item of list" :key="item.name" :to="item.path">
      <span slot="left">{{item.name}}</span>
      <svg slot="right" class="icon" aria-hidden="true">
        <use xlink:href="#icon-enter"></use>
      </svg>
    </x-cell>
  </div>
</template>

<script>
import XCell from '~/cell'
export default {
  components: {
    XCell
  },
  activated () {
    this.$store.state.isShowFooter = true
  },
  data () {
    return {
      list: [{
        name: 'cell-swipe',
        enter: '#icon-enter',
        path: '/more/cellSwipe'
      }, {
        name: '网易适配测试',
        enter: '#icon-enter',
        path: '/more/netEaseView'
      }]
    }
  },
  methods: {
    cRight () {
      this.$MintUI.Toast('right')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './../../scss/define';
</style>
