<template>
  <div>
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo avec typographie Groupomania"
      class="hello--img__icon"
    />
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <div class="card mt-5 mx-auto">
      <button
        class="card__subtitle btn btn-outline-dark col-9 mx-auto border-0"
        @click="showCreateAccount()"
        v-if="mode == 'login'"
      >
        J'aimerais créer un compte
      </button>
      <button
        class="card__subtitle btn btn-outline-dark col-9 mx-auto border-0"
        @click="showLogin()"
        v-else
      >
        J'ai déjà un compte
      </button>
      <div class="form-row">
        <input
          v-model="email"
          class="form-row__input"
          type="email"
          name="email"
          placeholder="Adresse mail"
          aria-label="Veuillez renseigner votre adresse mail"
        />
      </div>
      <p v-if="emailForm == 'emailCreate'">
        Veuillez renseigner votre adresse mail
      </p>
      <p v-if="emailRegex == 'emailRegexVerify'">
        Format email non accepté
      </p>
      <div class="form-row" v-if="mode == 'create'">
        <input
          v-model="pseudo"
          class="form-row__input"
          type="text"
          placeholder="Pseudo"
          aria-label="Veuillez renseigner votre pseudo"
        />
      </div>
      <p v-if="pseudoForm == 'pseudoCreate'">
        Veuillez renseigner votre pseudo
      </p>
      <div class="form-row">
        <input
          v-model="password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
          aria-label="Veuillez renseigner votre mot de passe"
        />
      </div>
      <p v-if="passwordForm == 'passwordCreate'">
        Veuillez renseigner votre mot de passe
      </p>
      <div class="form-row d-grid gap-2 col-9 mx-auto">
        <button
          @click="login()"
          class="btn btn-success"
          type="button"
          v-if="mode == 'login'"
          aria-label="Cliquez ici pour vous connecter"
        >
          <!-- <span v-if="status == 'loading'">Connexion en cours...</span>-->
          <span>Connexion</span>
        </button>
        <button
          @click="createAccount()"
          class="btn btn-success"
          aria-label="Cliquez ici pour vous inscrire"
          v-else
        >
          <!--<span v-if="status == 'loading'">Création en cours...</span>-->
          <span>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data: function() {
    return {
      mode: "login",
      email: null,
      pseudo: null,
      password: null,
      pseudoForm: "",
      emailForm: "",
      passwordForm: "",
      emailRegex: "",
    };
  },
  mounted: function() {
    if (localStorage.getItem("user")) {
      this.$router.push("/profile");
      return;
    }
  },
  computed: {
    validatedFields: function() {
      if (this.mode == "create") {
        if (this.email != "" && this.pseudo != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    showCreateAccount: function() {
      this.mode = "create";
    },
    showLogin: function() {
      this.mode = "login";
    },
    login: function() {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function() {
            self.$router.push("/");
          },
          function(error) {
            console.log(error);
          }
        );
    },
    createAccount: function() {
      const self = this;
      if (!this.pseudo) {
        this.pseudoForm = "pseudoCreate";
      }
      if (!this.email) {
        this.emailForm = "emailCreate";
      }
      if (!this.password) {
        this.passwordForm = "passwordCreate";
      } else if (!this.validEmail(this.email)) {
        this.emailRegex = "emailRegexVerify";
      }
      if (
        this.pseudo &&
        this.email &&
        this.password &&
        this.validEmail(this.email)
      )
        this.$store
          .dispatch("createAccount", {
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
          })
          .then(
            function() {
              self.login();
            },
            function(error) {
              console.log(error);
            }
          );
    },
    validEmail: function(email) {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
.hello--img__icon {
  position: relative;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px;
}
h1 {
  margin-top: 100px;
}
.card__action {
  text-decoration: none !important;
}
.card {
  max-width: 50%;
  min-width: 350px;
  margin-bottom: 100%;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
</style>
