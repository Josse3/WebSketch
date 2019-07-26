<template>
  <div
    class="drawing-box"
    :style="{top, left, width, height}"
    v-on:contextmenu="handleRightClick"
    v-on:click="handleLeftClick"
  ></div>
</template>

<script>
export default {
  name: "DrawingBox",
  props: {
    top: String,
    left: String,
    width: String,
    height: String
  },
  data() {
    return {
      contextMenuPos: {} // Object that will contain an x and y key, the coordinates of the context menu
    };
  },
  methods: {
    handleRightClick(event) {
      event.preventDefault();
      this.contextMenuShown = true;
      this.contextMenuPos.x = event.x + "px";
      this.contextMenuPos.y = event.y + "px";
      this.$emit("show-contextmenu", { ...this.contextMenuPos, target: "box" });
    },
    handleLeftClick(event) {
      if (event.which === 1) {
        this.contextMenuPos.x = event.x;
        this.contextMenuPos.y = event.y;
      }
    }
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
