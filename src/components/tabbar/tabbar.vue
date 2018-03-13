<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: [String]
  }
}
</script>
<style scoped lang="scss">
.tabbar {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  height: 0.9rem;
  background: #fff;
  border-top: 1px solid #e4e4e4;
}
</style>
