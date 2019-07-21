<template>
  <div class="drawing">
    <Toolbar v-on:select-tool="handleToolSelect" />
    <div class="canvas" v-on:mousedown="handleCanvasMouseDown" />
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
export default {
  name: "drawing",
  components: {
    Toolbar
  },
  data() {
    return {
      currentTool: null,
      boxes: 0
    };
  },
  methods: {
    handleToolSelect(tool) {
      this.currentTool = tool;
    },
    handleCanvasMouseDown(event) {
      if (this.currentTool) {
        if (this.currentTool === "box") {
          const container = event.target.getBoundingClientRect();
          const box = document.createElement("div");
          box.className = "drawing-box";
          box.style.left = `${event.clientX - container.x}px`;
          box.style.top = `${event.clientY - container.y - this.boxes * 5}px`;
          event.target.appendChild(box);
          this.boxes++;
        }
      }
    }
  }
};
</script>

<style scoped>
.drawing {
  width: 100vw;
  height: 100vh;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas {
  width: 90%;
  height: 90%;
  background-color: rgb(70, 70, 235);
}
</style>

<style>
.drawing .canvas .drawing-box {
  height: 5px;
  width: 5px;
  background-color: red;
  position: relative;
}
</style>
