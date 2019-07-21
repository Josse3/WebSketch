<template>
  <div class="home">
    <div class="banner">
      <img src="@/assets/logo.png" alt="WebSketch logo" />
      <h1>WebSketch</h1>
      <h2>Drawing a website has never been easier</h2>
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
  name: "home"
};
</script>

<style scoped>
.banner,
.get-started {
  height: 50vh;
  text-align: center;
  padding: 2rem 0;
}

.banner {
  background-color: rgb(74, 177, 74);
}

.banner img {
  width: 15%;
  margin: 3rem auto;
}

.get-started {
  background-color: lightblue;
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
