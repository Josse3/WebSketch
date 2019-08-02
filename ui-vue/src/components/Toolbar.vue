<template>
  <div class="toolbar" :style="{zIndex: minLayer + 999}">
    <div class="save-button">
      <i class="far fa-save" />
    </div>
    <div class="tools">
      <p v-for="tool in tools" v-bind:key="tool.id" v-on:click="selectTool(tool.id)">
        <i :class="tool.icon" />
      </p>
    </div>
    <div class="canvas-color-selector">
      <input type="text" placeholder="color" @change="updateCanvasColor" :model="canvasColor" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    minLayer: Number
  },
  data() {
    return {
      tools: [
        { icon: "far fa-square", id: "box" },
        { icon: "glyphicon glyphicon-text-size", id: "text" }
      ],
      canvasColor: ""
    };
  },
  methods: {
    selectTool(tool) {
      this.$emit("select-tool", tool);
    },
    updateCanvasColor() {
      this.$emit("change-canvas-color", this.canvasColor);
    }
  }
};
</script>

<style scoped>
.toolbar {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  width: 100vw;
  margin: auto;
  background-color: rgba(80, 80, 80, 0.623);
  padding-right: 2rem;
}

.save-button {
  background-color: blue;
  width: 5rem;
  height: inherit;
  cursor: pointer;
  color: white;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tools {
  display: flex;
}

.toolbar p {
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25em 1em;
  margin: 0;
}

.toolbar p:hover {
  background-color: rgb(153, 144, 144);
}

input {
  padding: 0.25em 0.5em;
  border: none;
  border-radius: 0.25rem;
  width: 10rem;
}
</style>
