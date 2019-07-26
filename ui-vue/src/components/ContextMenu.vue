<template>
  <div class="context-menu" :style="{ left: x, top: y }">{{content}}</div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    x: String,
    y: String,
    content: Object
  }
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: grey;
  height: 50px;
  width: 50px;
}
</style>

