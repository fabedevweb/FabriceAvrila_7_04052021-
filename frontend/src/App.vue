<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark">
      <div class="container-fluid">
        <router-link
          to="/"
          @click="clearPostLocalStorage() && reload()"
          aria-label="Cliquez sur ce logo pour aller à l'accueil"
        >
          <img
            src="./assets/icon.png"
            class="navbar-brand logo"
            alt="logo du site"
          />
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link
              to="/"
              @click="clearPostLocalStorage() && reload()"
              aria-label="Cliquez pour aller à l'accueil"
            >
              <li class="nav-item">
                <div class="nav-link active text-dark" aria-current="page">
                  <i class="fas fa-home "></i>HOME
                </div>
              </li>
            </router-link>
          </ul>
          <router-link
            to="/login"
            aria-label="Cliquez sur le boutton login pour vous inscrire ou vous connecter"
          >
            <form class="d-flex">
              <button class="btn btn-outline-dark" type="submit">
                <span v-if="formPost()">Mon profil</span>
                <span v-else>Login</span>
              </button>
            </form>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="d-flex p-4 footer">
      <div class="">
        <p class="text-dark">Groupomania Tous droits réservés</p>
      </div>
    </footer>
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
    reload: function() {
      location.reload();
    },
    clearPostLocalStorage: function() {
      localStorage.removeItem("replyRoute");
    },
  },
};
</script>

<style>
* {
  font-family: sans-serif;
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
.navbar {
  overflow: hidden;
  background-color: #ffd7d7;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%;
  z-index: 1;
}
.footer {
  background-color: #ffd7d7;
}
</style>
