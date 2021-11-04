import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      email: "",
      pseudo: "",
      password: "",
      comment: "",
      image: "",
    },
    posts: {
      comment: "",
      image: "",
    },
  },
  mutations: {
    //METTRE LES NOMS DES MUTATIONS EN MAJUSCULES
    //Les mutations Vuex sont synchrones, il n'est pas possible de récupérer des données d'une API dans une mutation
    //Les mutations nous permettent de mettre à jour/modifier le state
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function(state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function(state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.clear();
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve) => {
        instance
          .post("auth/login", userInfos)
          .then(function(response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_login");
            alert(error + "Email ou mot de passe incorrect");
            location.reload();
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve) => {
        commit;
        instance
          .post("auth/signup", userInfos)
          .then(function(response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_create");
            //reject(error);
            alert(error + "L'email est déjà utilisé");
            location.reload();
          });
      });
    },
    createPosts: ({ commit }, posts) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/", posts)
          .then(function(response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("/1")
        .then(function(response) {
          commit("userInfos", response.data);
        })
        .catch(function() {});
    },

    getAllPosts: ({ commit }) => {
      instance
        .get("/")
        .then(function(response) {
          commit("userInfos", response.data);
        })
        .catch(function() {});
    },
  },
});

export default store;
