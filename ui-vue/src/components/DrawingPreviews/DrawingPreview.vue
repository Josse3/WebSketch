<template>
  <div class="preview-box" :style="{width, height, top, left}"></div>
</template>

<script>
export default {
  name: "DrawingPreview",
  props: {
    width: String,
    height: String,
    top: String,
    left: String
  }
};
</script>


<style scoped>
.preview-box {
  position: relative;
  border: 1px dashed red;
}
</style>