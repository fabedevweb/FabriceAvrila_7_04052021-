<template>
  <div class="login container">
    <div class="card">
      <h1 class="card__title" v-if="step == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p v-if="step == 'login'">
        Si tu n'a pas encore de compte ?
        <span class="login__action" @click="createAccount()"
          >Créer un compte</span
        >
      </p>
      <p v-else>
        <span class="login__action" @click="loginAccount()"
          >Crées ton compte ici</span
        >
      </p>
      <form>
        <div class="mb-3" v-if="step == 'create'">
          <label for="exampleInputEmail1" class="form-label">Pseudo</label>
          <input
            v-model="pseudo"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary button--disable"
          v-if="step == 'login'"
        >
          Connexion
        </button>
        <button
          @click="createAccountApi()"
          type="submit"
          class="btn btn-primary"
          v-if="step == 'create'"
        >
          Créer un compte
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      step: "login",
      pseudo: "",
      email: "",
      password: "",
    };
  },
  //Gestion de l'affichage du formulaire
  methods: {
    createAccount: function() {
      this.step = "create";
    },
    loginAccount: function() {
      this.step = "login";
    },
    createAccountApi: function() {
      console.log(this.pseudo, this.email, this.password);
    },
  },
};
</script>

<style scoped>
.login__action {
  color: aqua;
}
</style>
