<template>
  <div class="netEase">
    <img :src="img">
    <div class="font-s-16">{{msg}}</div>
    大家好，我是从早走到晚，本次活动我们小组能拿到名次，小组的人都很开心。当然，这是每个人共同努力坚持的结果。静哥在路途中不断鼓励我们，是我们一直坚持的动力；发禹总是走在前面，让我们每个人感觉自己也可以；苏苏厚积薄发，后面发力让我们不至于松懈；还有小青这个活地图，跟随人力勘查过两次路线的人指引方向。所以，我们组才能取得这么好的名次。这是一次徒步活动，也像是一次人生旅途。在意结果的，路途中不仅要坚持走下去，还要忍住一路风景的诱惑，所以我们组并没有拍下美好风景，只是向着目标前进。在意过程的，当需好好体会一路风景，用更多时间和心思去思考，来时路，将行途，总会有所得。其实在我看来，每一队、每一个坚持下去的人都是最棒的，行与于途中有所得，即是美好，无所得，便是平淡，不管美好还是平淡，都是生活的真谛，快乐的行走就对了。
                                                 --- 从早走到晚
    能得到第一名我们队的人很开心啦，不过要说故事肯定走得慢故事才更多吧，我们组的故事其实很简单，就是大禹在前面带路，静哥会在我们累的时候加油打气，聊会天让大家不去想自己很累，苏苏和小青体力相对较弱，但能坚持，大家不离不弃相伴前行。到终点后因为我们组的人都很累，就直接回去了，也错过很多路上的美景。公司的活动目的是让大家锻炼身体，找到生活中的美好，我想参加了乐行者活动并因此找到乐趣的人，都很棒呢~
    迎着朝阳出发
  </div>
</template>
<script>
  export default{
    name: 'netEast',
    created () {
      this.$store.state.isShowHeader = false
    },
    data () {
      return {
        msg: '网易适配测试',
        img: require('./../../assets/imgs/default.jpg')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .netEase{
    img{
      width: 2rem;
      height: 1.5rem;
    }
    div{
      border: 0.01rem solid #111;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 16px;
    }
    .font-s-16{
      @media screen and (max-width:321px){
        font-size:15px;
      }

      @media screen and (min-width:321px) and (max-width:400px){
        font-size:16px;
      }

      @media screen and (min-width:400px){
        font-size:18px;
      }
    }
  }
</style>