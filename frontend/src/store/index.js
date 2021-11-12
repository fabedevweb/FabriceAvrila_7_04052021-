import { createStore } from "vuex";
import axios from "../axios.js";

let user = localStorage.getItem("user");

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      email: "",
      pseudo: "",
      password: "",
    },
  },
  mutations: {
    //METTRE LES NOMS DES MUTATIONS EN MAJUSCULES
    //Les mutations Vuex sont synchrones, il n'est pas possible de récupérer des données d'une API dans une mutation
    //Les mutations nous permettent de mettre à jour/modifier le state
    LOGUSER: function(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    USERINFOS: function(state, userInfos) {
      state.userInfos = userInfos;
    },
  },

  actions: {
    login: ({ commit }, USERINFOS) => {
      return new Promise((resolve) => {
        axios
          .post("auth/login", USERINFOS)
          .then(function(response) {
            commit("LOGUSER", response.data);
            resolve(response);
          })
          .catch(function() {
            alert("Email ou mot de passe incorrect");
            location.reload();
          });
      });
    },
    createAccount: ({ commit }, USERINFOS) => {
      return new Promise((resolve) => {
        commit;
        axios
          .post("auth/signup", USERINFOS)
          .then(function(response) {
            resolve(response);
          })
          .catch(function() {
            alert("Email ou Pseudo déjà utilisé");
            location.reload();
          });
      });
    },
    getPosts: ({ commit }) => {
      return new Promise((resolve) => {
        commit;
        axios
          .get("/")
          .then(function(response) {
            resolve(response);
          })
          .catch(function(error) {
            alert(error);
          });
      });
    },
  },
});

export default store;
