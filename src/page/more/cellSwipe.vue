<template>
  <div class="user">
    <x-header :fixed="true" :title="this.$route.meta.title">
      <svg slot="left" class="icon" aria-hidden="true" @click.stop.prevent="cBack">
        <use xlink:href="#icon-return"></use>
      </svg>
      <div slot="right" @click.stop.prevent="cEdit" :class="editClass">{{edit.text}}</div>
    </x-header>
    <div class="content-h" :class="{'content-f': edit.state}">
      <!-- <x-cell-swipe v-for="(item, index) of list" :key="item.id"
        :isGraphic="false"
        :leftState="edit.state"
        :rightBtn="rightBtn"
        :index="index">
        <div slot="leftBtn">
          <span v-show="!item.check" class="icon">丠</span>
          <span v-show="item.check" class="icon">亁</span>
        </div>
        <span slot="left">{{item.name}}</span>
        <div slot="right">{{item.name}}</div>
      </x-cell-swipe> -->
      <x-cell-swipe class="item" v-for="(item, index) of list" :key="item.id"
       :isGraphic="isGraphic"
       :leftState="edit.state"
       :rightBtn="rightBtn"
       :index="index"
       @click.native.stop.prevent="cItem">
       <div class="leftBtn" slot="leftBtn" @click.stop.prevent="cCheck(index)">
         <svg v-show="!item.check" class="icon" aria-hidden="true">
           <use xlink:href="#icon-round"></use>
         </svg>
         <svg v-show="item.check" class="icon check" aria-hidden="true">
           <use xlink:href="#icon-roundcheckfill"></use>
         </svg>
       </div>
       <img slot="poster" :src="item.poster">
       <div slot="right">
         <p>{{item.name}}</p>
         <p>{{item.desc}}</p>
       </div>
     </x-cell-swipe>
    </div>
    <div v-show="edit.state" class="all">
      <div class="check" @click.stop.prevent="cAllCheck">全选</div>
      <div class="delete" @click.stop.prevent="cAllDelete">{{del.text}}</div>
    </div>
  </div>
</template>

<script>
import XHeader from '~/Header'
import XCellSwipe from '~/cell-swipe'
export default {
  components: {
    XCellSwipe,
    XHeader
  },
  created () {
    // 设置是否显示header，自定义头部
    this.$store.state.isShowHeader = false
  },
  data () {
    return {
      edit: {
        text: '管理',
        state: false
      },
      del: {
        text: '删除',
        isAll: false // 是否全选
      },
      rightBtn: [{
        content: '收藏',
        style: { background: '#f28300' },
        handler: this.cDelete
      }, {
        content: '删除',
        style: { background: 'red' },
        handler: this.cDelete
      }],
      isGraphic: true,
      list: [],
      checkList: [] // 选中的索引数组
    }
  },
  mounted () {
    this.getList()
  },
  computed: {
    editClass () {
      return {
        'active': this.edit.state
      }
    }
  },
  methods: {
    getList () {
      let result = []
      for (let i = 0; i < 7; i++) {
        result[i] = {
          id: i,
          index: i,
          name: '我是' + i,
          icon: '#icon-scan',
          enter: '#icon-enter',
          img: require('./../../assets/imgs/icon_user.png'),
          poster: require('./../../assets/imgs/default.jpg'),
          desc: '你说的都对你说的都对你说的都对你说的都对',
          path: '/',
          check: false
        }
      }
      this.list = result
    },
    cBack: function () {
      this.$router.go(-1)
    },
    cEdit () {
      this.edit.state = !this.edit.state
      if (this.edit.state) {
        this.edit.text = '确定'
      } else {
        this.edit.text = '管理'
      }
    },
    cItem () {
      this.$MintUI.Toast('click')
    },
    cDelete (index) {
      console.log(index)
      this.list.splice(index, 1)
    },
    cCheck (index) {
      this.list[index].check = !this.list[index].check
      if (this.list[index].check) this.checkList[index] = index
      else delete this.checkList[index]
    },
    cAllCheck () {
      this.del.isAll = !this.del.isAll
      // 遍历设置所有数据全选
      this.list.forEach((item, index) => {
        if (this.del.isAll) item.check = true
        else item.check = !item.check
      })
    },
    cAllDelete () {
      if (this.del.isAll) {
        this.list = []
        this.cEdit()
      } else {
        for (let i = this.checkList.length - 1; i >= 0; i--) {
          // 倒序方式删除数据的
          if (this.checkList[i] || this.checkList[i] === 0) this.list.splice(this.checkList[i], 1)
          // 遍历完成重置选中的索引数组
          if (i === 0) this.checkList = []
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import './../../scss/define';
  .user{
    .active{
      color: $theme;
    }
    .item{
      // border-bottom: 1px solid #e5e5e5;
      .leftBtn{
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        width: 120px;
        // height: 100%;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        .icon{
          width: 40px;
          height: 100%;
          color: #999;
        }
        .check{
          color: $theme;
        }
      }
    }
    .all{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      height: 90px;
      line-height: 90px;
      text-align: center;
      background-color: #fff;
      >div{
        flex: 1;
        height: 100%;
      }
      .check{
        border-right: 1px solid #e5e5e5;
      }
    }
  }
</style>
