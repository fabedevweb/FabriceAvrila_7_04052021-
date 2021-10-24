const Home = {
  template: "#home",
  name: "Home",

  data: function() {
    return {
      posts: [],
    };
  },
  methods: {
    getUser: function() {
      return axios.get("http://localhost:3000/api/").then((response) => {
        this.posts = response.data;
        return this.posts;
      });
    },
  },
};

const Login = {
  template: "<h1>Login</h1>",
  name: "Login",
};

const router = new VueRouter({
  routes: [
    { path: "/home", component: Home, name: "Home" },
    { path: "/login", component: Login, name: "Login" },
  ],
});

const app = new Vue({
  router,
}).$mount("#app");
