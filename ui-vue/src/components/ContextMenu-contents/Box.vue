<template>
  <div class="context-menu-content-box">
    <div class="color-preview" :style="{backgroundColor: inputtedColor}"></div>
    <input type="text" placeholder="color" @change="function(e) {inputtedColor = e.target.value}" />
    <input type="submit" value="Apply" @click="handleColorSubmit" />
    <span>Delete</span>
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
      inputtedColor: "white"
    };
  },
  methods: {
    handleColorSubmit() {
      this.$emit("color-change", { color: this.inputtedColor, id: this.id });
    }
  }
};
</script>

<style scoped>
.context-menu-content-box {
  width: 10rem;
  text-align: center;
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

span {
  margin-top: 50px;
}
</style>
