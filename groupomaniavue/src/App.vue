<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1></h1>
        <router-link to="/">
          <img src="./assets/logoplaya.png" class="navbar-brand" alt="logo" />
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
                Login
              </button>
            </form>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
img {
  width: 2rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
