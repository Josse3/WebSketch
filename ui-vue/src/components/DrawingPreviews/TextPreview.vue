<template>
  <input type="text" class="text-preview" :style="{left, top}" />
</template>

<script>
export default {
  name: "TextPreview",
  props: {
    left: String,
    top: String
  }
};
</script>

<style scoped>
.text-preview {
  position: absolute;
  min-width: 1em;
  max-height: fit-content;
}
</style>
