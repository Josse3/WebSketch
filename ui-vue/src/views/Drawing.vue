<template>
  <div class="drawing">
    <Toolbar
      v-on:select-tool="handleToolSelect"
      :minLayer="currentHighestLayer"
      @change-canvas-color="handleCanvasColorChange"
    />
    <div
      class="canvas"
      v-on:mousedown="handleCanvasMouseDown"
      v-on:mouseup="handleCanvasMouseUp"
      v-on:mousemove="handleCanvasMouseMove"
      :style="{backgroundColor: this.canvasColor}"
    >
      <DrawingBox
        v-for="boxObj in drawingBoxes"
        :key="boxObj.id"
        :top="boxObj.top"
        :offset="boxObj.offset"
        :left="boxObj.left"
        :width="boxObj.width"
        :height="boxObj.height"
        :color="boxObj.color"
        :layer="boxObj.layer"
        :id="boxObj.id"
        @show-contextmenu="handleContextMenuShow"
      />
      <DrawingPreview
        v-if="drawingElement"
        :top="currentPreviewBoxProps.top"
        :left="currentPreviewBoxProps.left"
        :width="currentPreviewBoxProps.width"
        :height="currentPreviewBoxProps.height"
      />
      <ContextMenu
        v-if="contextMenuShown"
        :x="this.contextMenuProps.x"
        :y="this.contextMenuProps.y"
        :content="this.contextMenuProps.target"
        :drawingboxId="this.contextMenuProps.id"
        :minLayer="currentHighestLayer"
        @color-change="this.handleDrawingBoxColorChange"
        @delete-box="handleDeleteBox"
        @change-layer="handleLayerChange"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import DrawingBox from "@/components/DrawingElements/DrawingBox.vue";
import DrawingPreview from "@/components/DrawingPreviews/DrawingPreview.vue";
import ContextMenu from "@/components/ContextMenu.vue";

export default {
  name: "drawing",
  components: {
    Toolbar,
    DrawingBox,
    DrawingPreview,
    ContextMenu
  },
  data() {
    return {
      canvasColor: "#ccc", // Background color of the canvas
      currentTool: null, // current method on the toolbar
      drawingElement: false, // boolean defining whether or not an element is being drawn
      currentBoxProps: null, // Properties of the box currently being drawn
      currentElementContainer: null, // Container of the current element to calculate coordinates
      occupiedY: 0, // Due to HTML nature, the elements get pushed further and further down when more appear. This variable tracks how much, to oppose it.
      drawingBoxes: [], // Array of drawn boxes
      currentPreviewBoxProps: {}, // Object with properties of the current preview box
      contextMenuShown: false, // Boolean defining wheather or not the context menu is shown
      contextMenuProps: {}, // Object containing x and y coordinates as well as content of the context menu
      currentHighestLayer: 0 // Number defining the current highest layer (z-index);
    };
  },
  methods: {
    handleToolSelect(tool) {
      this.currentTool = tool;
    },
    handleCanvasMouseDown(event) {
      if (this.currentTool && event.which === 1 && !this.contextMenuShown) {
        // Creating drawn element container to calculate coordinates
        this.currentElementContainer =
          event.path.length > 7
            ? event.srcElement.parentNode.getBoundingClientRect()
            : event.target.getBoundingClientRect();
        // Calculating coordinates
        const left = `${event.clientX - this.currentElementContainer.x}px`;
        const top = `${event.clientY -
          this.currentElementContainer.y -
          this.occupiedY}px`;

        if (this.currentTool === "box") {
          this.drawingElement = true;
          const boxProps = {};
          // Passing them in as left/top values on a position="relative" <div>
          boxProps.left = left;
          boxProps.top = Number(top.replace("px", "")) - this.occupiedY;
          boxProps.offset = this.occupiedY;
          // Setting the preview box coordinates
          this.currentPreviewBoxProps.left = left;
          this.currentPreviewBoxProps.top = top;
          // Adding a default height and width in case mouse won't be moved
          boxProps.width = "5px";
          boxProps.height = "5px";
          this.currentPreviewBoxProps.width = "5px";
          this.currentPreviewBoxProps.height = "5px";
          // Adding a default layer (z-index)
          boxProps.layer = this.currentHighestLayer;
          this.currentHighestLayer++;
          // Saving created element to data()
          this.currentBoxProps = boxProps;
        } else if (this.currentTool === "text") {
        }
      } else if (this.contextMenuShown && event.path.length <= 8) {
        this.contextMenuShown = false;
      }
    },
    handleCanvasMouseMove(event) {
      if (this.drawingElement) {
        const boxX = Number(this.currentBoxProps.left.replace("px", ""));
        const boxY = this.currentBoxProps.top + this.occupiedY;
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
        this.currentPreviewBoxProps.width = width;
        this.currentPreviewBoxProps.height = height;
      }
    },
    handleCanvasMouseUp(event) {
      if (this.drawingElement) {
        // Removing preview box
        this.currentPreviewBoxProps = {};
        // Setting default color
        this.currentBoxProps.color = "red";
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
    },
    handleDrawingBoxColorChange(details) {
      const changedBox = this.drawingBoxes.find(
        drawingBox => drawingBox.id === details.id
      );
      const boxesArrayIndex = this.drawingBoxes.indexOf(changedBox);
      changedBox.color = details.color;
      this.drawingBoxes[boxesArrayIndex] = changedBox;
    },
    handleDeleteBox(details) {
      const offsetToRemove = Number(
        this.drawingBoxes[details].height.replace("px", "")
      );
      this.drawingBoxes.splice(details, 1);
      this.drawingBoxes.forEach(
        drawingBox => (drawingBox.offset += offsetToRemove)
      );
    },
    handleLayerChange(details) {
      const usedLayers = this.drawingBoxes.map(box => box.layer);
      const currentIndex = usedLayers.indexOf(
        this.drawingBoxes[details.id].layer
      );
      let newLayer;
      if (details.direction === "higher") {
        const nextLayer = usedLayers[currentIndex + 1];
        newLayer = nextLayer
          ? nextLayer + 1
          : usedLayers[usedLayers.length - 1] + 1;
      } else if (details.direction === "lower") {
        const previousLayer = usedLayers[currentIndex - 1];
        newLayer = previousLayer ? previousLayer - 1 : usedLayers[0] - 1;
      } else if (details.direction === "highest") {
        newLayer = usedLayers[usedLayer.length - 1] + 1;
      } else if (details.direction === "lowest") {
        newLayer = usedLayers[0] - 1;
      } else {
        throw Error("Invalid layer change direction");
      }
      this.drawingBoxes[details.id].layer = newLayer;
    },
    handleCanvasColorChange(details) {
      this.canvasColor = details;
    }
  }
};
</script>

<style scoped>
.drawing {
  width: 100vw;
  height: 100vh;
  background-color: lightblue;
}

.canvas {
  width: 100vw;
  height: 100vh;
}
</style>
