<template>
  <div class="user">
    <x-cell v-for="item of list" :key="item.name" :to="item.path">
      <!-- <svg slot="left" class="icon" aria-hidden="true">
        <use :xlink:href="item.icon"></use>
      </svg> -->
      <span slot="left" class="icon">{{item.icon}}</span>
      <!-- <img  :src="item.img"> -->
      <span slot="left">{{item.name}}</span>
      <span slot="right">{{item.name}}</span>
      <!-- <svg slot="right" class="icon" aria-hidden="true">
        <use xlink:href="#icon-enter"></use>
      </svg> -->
    </x-cell>
    <x-cell class="item" v-for="item of list" :key="item.id" :isGraphic="isGraphic">
      <img slot="poster" :src="item.poster">
      <div slot="right">
        <p>{{item.name}}</p>
        <p>{{item.desc}}</p>
      </div>
    </x-cell>
  </div>
</template>

<script>
import XCell from '~/cell'
export default {
  activated () {
    this.$store.state.isShowFooter = true
  },
  data () {
    return {
      isGraphic: true, // 是否图文
      list: []
    }
  },
  components: {
    XCell
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let result = []
      for (let i = 0; i < 7; i++) {
        result[i] = {
          id: i,
          name: '我是' + i,
          // icon: '#icon-scan',
          icon: '匩',
          enter: '#icon-enter',
          img: require('./../../assets/imgs/icon_user.png'),
          poster: require('./../../assets/imgs/default.jpg'),
          desc: '你说的都对你说的都对你说的都对你说的都对',
          path: '/'
        }
      }
      this.list = result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import './../../scss/define';
  .user{
    .icon{
      font-size: 40px;
    }
    .item{
      @include px2rem(height, 162px);
      img{
        @include px2rem(max-width, 280px);
        @include px2rem(height, 142px);
      }
    }
  }
</style>
