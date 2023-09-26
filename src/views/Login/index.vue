<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="handleRegister">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email address"
          name="email-register"
          id="email-register"
          v-model="state.form.register.email"
          autocomplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password-register"
          id="password-register"
          v-model="state.form.register.password"
          autocomplete="new-password"
        />
        <input type="submit" value="Register" />
      </form>
      <form class="login" @submit.prevent="handleLogin">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          name="email-login"
          id="email-login"
          v-model="state.form.login.email"
          autocomplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password-login"
          id="password-login"
          v-model="state.form.login.password"
          autocomplete="current-password"
        />
        <input type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginView",

  setup() {
    const state = reactive({
      form: {
        register: {
          email: "",
          password: "",
        },
        login: {
          email: "",
          password: "",
        },
      },
    });

    const store = useStore();

    const handleLogin = () => {
      store.dispatch("login", state.form.login);
    };

    const handleRegister = () => {
      store.dispatch("register", state.form.register);
    };

    return {
      state,
      store,
      handleLogin,
      handleRegister,
    };
  },
});
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
}

form.register {
  color: #fff;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 66, 101) 0%,
    rgb(189, 28, 60) 100%
  );

  input:not([type="submit"]) {
    color: #fff;
    border-bottom: 2px solid #fff;
  }

  input[type="submit"] {
    background-color: #FFF;
    color: rgb(245, 66, 101);
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
  }
}

form.login {
  input:not([type="submit"]) {
    color: #2C3E50;
    border-bottom: 2px solid #2C3E50;
  }
  input[type="submit"] {
    background-color: rgb(245, 66, 101);
    color: #fff;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
  }
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}
</style>
