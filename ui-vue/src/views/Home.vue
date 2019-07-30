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
      ></div>
    </div>
    <div class="get-started">
      <h1 class="button-row-header">Get sketching:</h1>
      <div class="button-row" v-if="!onGitHub">
        <button class="login">Log In</button>
        <a href="/#/signup">
          <button class="signup">Sign Up</button>
        </a>
      </div>
      <div class="github-button" v-if="onGitHub">
        <button>Go to the drawing canvas &#x2192;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      colors: [],
      onGitHub: window.location.href === "https://josse3.github.io/WebSketch/#/"
    };
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
h1 {
  font-family: "Merriweather Sans";
  font-weight: bold;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.banner,
.get-started {
  text-align: center;
  min-height: 45vh;
}

.banner {
  background-color: var(--ui-color-primary);
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

.transition {
  min-height: 10vh;
}

.transition-fragment {
  height: 1px;
}

.get-started {
  background-color: var(--ui-color-secondary);
  padding-bottom: 6.5vh;
  min-height: 34vh;
}

.get-started h1 {
  margin: 3rem auto;
}

.get-started .button-row {
  width: 30%;
  margin: 2rem auto 0 auto;
  display: flex;
  justify-content: space-between;
}

.get-started button {
  height: 6rem;
  width: 12rem;
  font-size: 2rem;
  cursor: pointer;
  border: none;
}

.github-button button {
  width: 30rem;
  background-color: orange;
}

.github-button button:hover {
  background-color: white;
}

.get-started button.login {
  background-color: white;
}

.get-started button.login:hover {
  background-color: rgb(32, 32, 161);
  color: white;
}

.get-started button.signup {
  background-color: rgb(32, 32, 161);
  color: white;
}

.get-started button.signup:hover {
  background-color: white;
  color: black;
}
</style>
