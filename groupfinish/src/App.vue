<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1></h1>
        <router-link to="/">
          <img src="./assets/icon.png" class="navbar-brand logo" alt="logo" />
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link to="/">
              <li class="nav-item">
                <div class="nav-link active" aria-current="page">
                  <i class="fas fa-home"></i>Home
                </div>
              </li>
            </router-link>
          </ul>
          <router-link to="/login">
            <form class="d-flex">
              <button class="btn btn-outline-success" type="submit">
                <span v-if="formPost()">Mon profil</span>
                <span v-else>Login</span>
              </button>
            </form>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    formPost: function() {
      if (localStorage.getItem("user")) {
        return true;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
}

a {
  text-decoration: none;
}
.logo {
  max-width: 2rem;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 32px;
}

.card__title {
  text-align: center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}

.button {
  background: #2196f3;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}

.card__action {
  color: #2196f3;
  text-decoration: underline;
}

.card__action:hover {
  cursor: pointer;
}

.button:hover {
  cursor: pointer;
  background: #1976d2;
}

.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
