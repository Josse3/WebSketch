<template>
  <div class="home">
    <div class="banner">
      <img src="@/assets/logo.png" alt="WebSketch logo" />
      <h1>WebSketch</h1>
      <h2>Drawing a website has never been easier</h2>
    </div>
    <div class="transition">
      <div
        class="transition-fragment" 
        v-for="color of colors" 
        :key="colors.indexOf(color)" 
        :style="{backgroundColor:  `rgb(${color[0]}, ${color[1]}, ${color[2]})`}"
      >
      </div>
    </div>
    <div class="get-started">
      <h1 class="button-row-header">Get sketching right away!</h1>
      <div class="button-row">
        <button class="login">Log In</button>
        <button class="signup">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      colors: []
    }
  },
  created() {
    for (let i = 0; i < 160; i++) {
      this.colors[i] = [
        74 + i <= 173 ? 74 + i : 173,
        177 + i <= 216 ? 177 + i : 216,
        74 + i <= 230 ? 74 + i : 230
      ];
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.banner,
.get-started {
  text-align: center;
}

.banner {
  background-color: rgb(74, 177, 74);
}

.banner img {
  width: 15%;
  margin: 3rem auto;
}

.banner h1, 
.banner h2 {
  color: white;
}

.banner h1 {
  text-transform: uppercase;
}

.transition-fragment {
  height: 1px;
}

.get-started {
  background-color: lightblue;
  padding-bottom: 6.5vh;
  min-height: 34vh;
}

.get-started .button-row {
  width: 30%;
  margin: 2rem auto 0 auto;
  display: flex;
  justify-content: space-between;
}

.get-started button {
  padding: 1rem 3rem;
  cursor: pointer;
  border-width: 3px;
  border-radius: 1rem;
  font-size: 1.2rem;
}

.get-started button.login {
  background-color: white;
  border-color: rgb(32, 32, 161);
}

.get-started button.signup {
  background-color: rgb(32, 32, 161);
  border-color: white;
  color: white;
}
</style>
