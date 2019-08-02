<template>
  <div class="context-menu-content-box">
    <div class="color-picker">
      <div class="color-preview" :style="{backgroundColor: inputtedColor}"></div>
      <input type="text" placeholder="color" @change="function(e) {inputtedColor = e.target.value}" />
      <input type="submit" value="Apply" @click="handleColorSubmit" />
    </div>
    <ul>
      <li @click="deleteBox">Delete</li>
      <li
        v-for="button in layerChangeButtons"
        :key="button.action"
        @click="changeLayer(button.action)"
      >{{button.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    id: Number
  },
  data() {
    return {
      inputtedColor: "white",
      layerChangeButtons: [
        { action: "higher", text: "Layer up" },
        { action: "lower", text: "Layer down" },
        { action: "highest", text: "Top layer" },
        { action: "lowest", text: "Bottom layer" }
      ]
    };
  },
  methods: {
    handleColorSubmit() {
      this.$emit("color-change", { color: this.inputtedColor, id: this.id });
    },
    deleteBox() {
      this.$emit("delete-box", this.id);
    },
    changeLayer(direction) {
      this.$emit("change-layer", { id: this.id, direction });
    }
  }
};
</script>

<style scoped>
.context-menu-content-box {
  width: 10rem;
  text-align: center;
}

.color-picker {
  padding: 0 0.25rem;
}

.color-preview {
  width: 80%;
  min-height: 7rem;
  margin: auto;
}

input[type="text"] {
  width: 80%;
  margin-top: 0.75rem;
}

input[type="submit"] {
  display: block;
  margin: 0.75rem auto;
  background-color: rgb(74, 74, 243);
  padding: 0.25em;
  border-radius: 0.25em;
  border: none;
}

span,
span:hover {
  text-decoration: none;
  color: white;
}

li {
  list-style: none;
  cursor: pointer;
}

li:hover {
  background-color: rgb(180, 161, 161);
}
</style>
