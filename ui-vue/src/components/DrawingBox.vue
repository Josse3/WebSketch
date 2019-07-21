<template>
  <div class="drawing-box" :style="{top, left, width, height}"></div>
</template>

<script>
export default {
  name: "DrawingBox",
  props: {
    top: String,
    left: String,
    width: String,
    height: String
  }
};
</script>


<style scoped>
.drawing-box {
  height: 5px;
  background-color: red;
  position: relative;
}
</style>
