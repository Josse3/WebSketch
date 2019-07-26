<template>
  <div class="context-menu" :style="{ left: x, top: y }">
    <Box v-if="content === 'box'" :id="drawingboxId" @color-change="handleColorChange" />
  </div>
</template>

<script>
import Box from "@/components/ContextMenu-contents/Box.vue";

export default {
  name: "ContextMenu",
  props: {
    x: String,
    y: String,
    content: String,
    drawingboxId: Number
  },
  components: {
    Box
  },
  methods: {
    handleColorChange(details) {
      this.$emit("color-change", details);
    }
  }
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: grey;
  padding: 1rem 0.25rem;
}
</style>

