<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --ui-color-primary: rgb(74, 177, 74);
  --ui-color-secondary: lightblue;
  --button-color-blue: rgb(32, 32, 161);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: sans-serif;
}

.error {
  background-color: rgb(216, 104, 104);
  border: 1px solid red;
}

.succes {
  background-color: rgb(98, 197, 98);
  border: 1px solid green;
}
</style>
