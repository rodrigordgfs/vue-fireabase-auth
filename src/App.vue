<template>
  <template v-if="isUserLogged">
    <button type="button" @click="handleLogout">Logout</button>
  </template>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",

  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });

    const handleLogout = () => {
      store.dispatch("logout");
    };

    const isUserLogged = computed(() => {
      return store.state.user;
    });

    return {
      handleLogout,
      isUserLogged
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
