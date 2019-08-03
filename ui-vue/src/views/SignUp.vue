<template>
  <div class="sign-up">
    <div class="sign-up-form">
      <h1>Create a new account:</h1>
      <div v-for="fieldObj in inputFields" :key="fieldObj.name" class="inputfield">
        <p>{{fieldObj.name}}</p>
        <input
          :type="fieldObj.hidden ? 'password' : 'text'"
          :disabled="loggedIn"
          v-model="userInput[fieldObj.name]"
        />
        <div class="error input-error" v-if="fieldObj.error">{{fieldObj.error}}</div>
      </div>
      <div class="button-container">
        <a href="/#/">
          <button class="back">Back</button>
        </a>
        <button class="confirm" @click="attemptSignUp">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      inputFields: [
        { name: "name", error: "" },
        { name: "password", error: "", hidden: true },
        { name: "repeat password", error: "", hidden: true }
      ],
      userInput: {},
      loggedIn: false
    };
  },
  methods: {
    async attemptSignUp() {
      // Clear all errors from previous attempt
      this.inputFields.forEach(inputObj => (inputObj.error = ""));
      // Check if all fields are filled in
      if (
        !Object.keys(this.userInput).every(
          input => this.userInput[input] !== ""
        ) ||
        Object.keys(this.userInput).length !== this.inputFields.length
      ) {
        return this.inputFields
          .filter(inputField => {
            return !this.userInput[inputField.name];
          })
          .forEach(emptyInput => {
            this.inputFields[this.inputFields.indexOf(emptyInput)].error =
              "This field is required.";
          });
      }
      // Check if username isn't already taken
      const usernameAvailable = await fetch(
        `/db/users/checkusername?name=${this.userInput.name}`
      )
        .then(response => {
          if (!response.ok)
            throw Error(`${response.status} (${response.statusText})`);
          return response.json();
        })
        .then(jsonResponse => jsonResponse.available);
      if (!usernameAvailable) {
        return (this.inputFields[
          this.inputFields.findIndex(inputObj => inputObj.name === "name")
        ].error = "Username already taken.");
      }
      // Check if "password" and "repeat password" are equal
      if (this.userInput.password !== this.userInput["repeat password"]) {
        return (this.inputFields[
          this.inputFields.findIndex(
            inputObj => inputObj.name === "repeat password"
          )
        ].error = "Both passwords entered aren't equal.");
      }
      fetch(
        `/db/users/register?name=${this.userInput.name}&pass=${this.userInput.password}`,
        { method: "POST" }
      )
        .then(response => {
          if (!response.ok)
            throw Error(`(${response.status}) ${response.statusText}`);
          return response.json();
        })
        .then(jsonResponse => {
          if (jsonResponse.success) {
            this.loggedIn = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.sign-up {
  min-height: 100vh;
  width: 100vw;
  background-color: var(--ui-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-up-form {
  width: 40%;
  height: 60%;
  text-align: center;
  padding-bottom: 2rem;
  background-color: var(--ui-color-secondary);
}

.sign-up-form div.inputfield {
  width: 20rem;
  margin: auto;
}

p,
input {
  width: inherit;
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0;
  text-align: left;
  text-transform: capitalize;
}

p::after {
  content: ":";
}

.input-error {
  margin: 0.75rem 0;
  padding: 0.25rem 0;
}

.button-container {
  margin: 2rem auto 0 auto;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 21rem;
}

button {
  border: none;
  height: 4rem;
  width: 10rem;
}

button.back {
  background-color: var(--button-color-blue);
  color: white;
}

button.confirm {
  background-color: rgb(19, 133, 19);
  color: white;
}
</style>

