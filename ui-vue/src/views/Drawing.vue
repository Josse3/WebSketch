<template>
  <div class="drawing">
    <Toolbar v-on:select-tool="handleToolSelect" />
    <div
      class="canvas"
      v-on:mousedown="handleCanvasMouseDown"
      v-on:mouseup="handleCanvasMouseUp"
      v-on:mousemove="handleCanvasMouseMove"
    >
      <DrawingBox
        v-for="boxObj in drawingBoxes"
        :key="boxObj.id"
        :top="boxObj.top"
        :left="boxObj.left"
        :width="boxObj.width"
        :height="boxObj.height"
        @show-contextmenu="handleContextMenuShow"
      />
      <ContextMenu
        v-if="contextMenuShown"
        :x="this.contextMenuProps.x"
        :y="this.contextMenuProps.y"
        :content="this.contextMenuContent"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import DrawingBox from "@/components/DrawingBox.vue";
import ContextMenu from "@/components/ContextMenu.vue";

// Possible ContextMenu contents
import Box from "@/components/ContextMenu-contents/Box.vue";

export default {
  name: "drawing",
  components: {
    Toolbar,
    DrawingBox,
    ContextMenu
  },
  data() {
    return {
      currentTool: null, // current method on the toolbar
      drawingElement: false, // boolean defining whether or not an element is being drawn
      currentBoxProps: null, // Properties of the box currently being drawn
      currentElementContainer: null, // Container of the current element to calculate coordinates
      occupiedY: 0, // Due to HTML nature, the elements get pushed further and further down when more appear. This variable tracks how much, to oppose it.
      drawingBoxes: [], // Array of drawn boxes
      currentPreviewBox: null, // HTML object of the current preview box
      contextMenuShown: false, // Boolean defining wheather or not the context menu is shown
      contextMenuProps: {}, // Object containing x and y coordinates of the context menu
      contextMenuContent: null // Component defining the content of the displayed context menu
    };
  },
  methods: {
    handleToolSelect(tool) {
      this.currentTool = tool;
    },
    handleCanvasMouseDown(event) {
      if (this.currentTool && event.which === 1) {
        if (this.currentTool === "box") {
          this.drawingElement = true;
          // Creating drawn element and its container (to calculate coordinates)
          this.currentElementContainer = event.target.getBoundingClientRect();
          const boxProps = {};
          // Calculating coordinates
          const left = `${event.clientX - this.currentElementContainer.x}px`;
          const top = `${event.clientY -
            this.currentElementContainer.y -
            this.occupiedY}px`;
          // Passing them in as left/top values on a position="relative" <div>
          boxProps.left = left;
          boxProps.top = top;
          // Creating a preview box with the same coordinates
          const previewBox = document.createElement("div");
          previewBox.className = "preview-box";
          previewBox.style.left = left;
          previewBox.style.top = top;
          this.currentPreviewBox = previewBox;
          event.target.appendChild(this.currentPreviewBox);
          // Adding a default height and width in case mouse won't be moved
          boxProps.width = "5px";
          boxProps.height = "5px";
          // Saving created element to data()
          this.currentBoxProps = boxProps;
        }
      }
    },
    handleCanvasMouseMove(event) {
      if (this.drawingElement) {
        const boxX = Number(this.currentBoxProps.left.replace("px", ""));
        const boxY = Number(this.currentBoxProps.top.replace("px", ""));
        // Calculating mouse position compared to the first mouse position as width and height
        const width =
          event.clientX - this.currentElementContainer.x - boxX + "px";
        const height =
          event.clientY -
          this.currentElementContainer.y -
          boxY -
          this.occupiedY +
          "px";
        // Updating the (still invisible) drawn box's properties
        this.currentBoxProps.width = width;
        this.currentBoxProps.height = height;
        // Updating the (visible) preview box's property
        this.currentPreviewBox.style.width = width;
        this.currentPreviewBox.style.height = height;
      }
    },
    handleCanvasMouseUp(event) {
      if (this.drawingElement) {
        event.target.removeChild(this.currentPreviewBox);
        this.currentPreviewBox = null;
        this.drawingBoxes.push({
          ...this.currentBoxProps,
          id: this.drawingBoxes.length
        });
        // Updating the occupiedY value with the box height
        const boxHeight = Number(this.currentBoxProps.height.replace("px", ""));
        this.occupiedY += boxHeight;
        // Reset
        this.drawingElement = false;
        this.currentBoxProps = {};
      }
    },
    handleContextMenuShow(details) {
      this.contextMenuShown = true;
      this.contextMenuProps = details;
      delete this.contextMenuProps.__ob__;
      let content;
      if (this.contextMenuProps.target === "box") {
        content = <Box />;
      } else {
        throw Error("Unknown ContextMenu target");
      }
      this.contextMenuContent = content;
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
.drawing .canvas .preview-box {
  position: relative;
  border: 1px dashed red;
}
</style>
