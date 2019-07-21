<template>
  <div class="drawing">
    <Toolbar />
    <div class="canvas" v-on:select-tool="() => alert('select')"></div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
export default {
  name: "drawing",
  components: {
    Toolbar
  },
  methods: {
    useTool: () => alert("selected")
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
