<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      <li @click.stop.prevent="cUser"><a>awesome-vue</a></li>
    </ul>
    <!-- <div><i class="icon icon-trash"></i><i class="icon icon-scan"></i></div> -->
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-trash"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-scan"></use>
    </svg>
    <mt-header :fixed="false" title="固定在顶部">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  activated () { // keep-alive生效时使用
    this.$store.state.isShowFooter = true
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  async mounted () {
    this.$MintUI.Toast('哈哈哈哈哈')
    await this.getData()
  },
  methods: {
    async getData () {
      this.$ajax.get('slave', '/homed/programtype/get_list', {
        accesstoken: 'R5A307AB1U309F1223K773B3CF7I8E0FA8C0P8M2FFAF73WDC305B8A211'
      }).then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cUser () {
      this.$router.push({ path: '/userIndex' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color: red;
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $color;
}
</style>
