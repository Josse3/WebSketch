<template>
  <div class="toolbar">
    <p v-for="tool in tools" v-bind:key="tool.id" v-on:click="selectTool(tool.id)">
      <i :class="tool.icon" />
    </p>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      tools: [
        { icon: "far fa-square", id: "box" },
        { icon: "glyphicon glyphicon-text-size", id: "text" }
      ]
    };
  },
  methods: {
    selectTool(tool) {
      this.$emit("select-tool", tool);
    }
  }
};
</script>

<style scoped>
.toolbar {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 80vw;
  margin: auto;
  background-color: rgba(80, 80, 80, 0.623);
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
</style>
