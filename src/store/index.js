import { createStore } from "vuex";
import router from "@/router";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import verifyFirebaseAuthErrorCode from "@/utils/verify-firebase-auth-error-code";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      try {
        const { email, password } = details;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        commit("SET_USER", user);
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        alert(verifyFirebaseAuthErrorCode(error.code));
      }
    },

    async register({ commit }, details) {
      try {
        const { email, password } = details;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        commit("SET_USER", user);
        router.push({ name: "home" });
      } catch (error) {
        alert(verifyFirebaseAuthErrorCode(error.code));
      }
    },

    async logout({ commit }) {
      try {
        await signOut(auth);
        commit("CLEAR_USER");
        router.push({ name: "login" });
      } catch (error) {
        alert(verifyFirebaseAuthErrorCode(error.code));
      }
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
          return;
        } else {
          commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.name === 'login') {
            router.push({ name: "home" });
          }
        }
      });
    },
  },
  modules: {},
});
