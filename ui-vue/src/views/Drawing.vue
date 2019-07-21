<template>
  <div class="drawing">
    <Toolbar v-on:select-tool="handleToolSelect" />
    <div
      class="canvas"
      v-on:mousedown="handleCanvasMouseDown"
      v-on:mouseup="handleCanvasMouseUp"
      v-on:mousemove="handleCanvasMouseMove"
    />
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
      currentTool: null, // current method on the toolbar
      drawingElement: false, // boolean defining whether or not an element is being drawn
      currentBox: null, // HTML object of the current element being drawn
      currentElementContainer: null, // Container of the current element to calculate coordinates
      occupiedY: 0 // Due to HTML nature, the elements get pushed further and further down when more appear. This variable tracks how much, to oppose it.
    };
  },
  methods: {
    handleToolSelect(tool) {
      this.currentTool = tool;
    },
    handleCanvasMouseDown(event) {
      if (this.currentTool) {
        if (this.currentTool === "box") {
          this.drawingElement = true;
          // Creating drawn element and its container
          this.currentElementContainer = event.target.getBoundingClientRect();
          const box = document.createElement("div");
          box.className = "drawing-box";
          // Calculating coordinates and passing them in as left/top values on a position=relative div
          box.style.left = `${event.clientX -
            this.currentElementContainer.x}px`;
          box.style.top = `${event.clientY -
            this.currentElementContainer.y -
            this.occupiedY}px`;
          // Saving created element to data()
          this.currentBox = box;
        }
      }
    },
    handleCanvasMouseMove(event) {
      if (this.drawingElement) {
        const boxX = Number(this.currentBox.style.left.replace("px", ""));
        const boxY = Number(this.currentBox.style.top.replace("px", ""));
        // Calculating mouse position compared to the first mouse position as width and height
        const width =
          event.clientX - this.currentElementContainer.x - boxX + "px";
        const height =
          event.clientY -
          this.currentElementContainer.y -
          boxY -
          this.occupiedY +
          "px";
        this.currentBox.style.width = width;
        this.currentBox.style.height = height;
      }
    },
    handleCanvasMouseUp(event) {
      if (this.drawingElement) {
        event.target.appendChild(this.currentBox);
        // Updating the occupiedY value with the box height
        const boxHeight = Number(
          this.currentBox.style.height.replace("px", "")
        );
        this.occupiedY += boxHeight;
        // Reset
        this.drawingElement = false;
        this.currentBox = null;
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
  background-color: red;
  position: relative;
}
</style>
