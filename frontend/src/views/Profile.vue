<template>
  <div class="profile">
    <div class="hello--img mx-auto">
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo"
        class="hello--img__icon"
      />
    </div>
    <div
      class="card mx-auto mt-5 border-1 rounded-0 w-25 card-profile p-5 border-0"
      v-if="formPost()"
    >
      <h1 class="card__title fs-2" @click="userLocalStorage()">
        Profil de <span class="text-uppercase text-primary">{{ pseudo }}</span>
      </h1>
      <div class="form-row text-center">
        <button @click="logout()" class="btn btn-primary btn-lg">
          Déconnexion
        </button>
      </div>
      <div class="text-center" v-if="pseudoAdmin()">
        <button
          @click="deleteAccount()"
          class="btn btn-danger btn-lg mt-2 text-center"
        >
          😰 Supprimer mon compte 😨
        </button>
      </div>
    </div>
    <div>
      <div
        class="card card-post mt-5 mx-auto rounded-0 border-0"
        :key="index"
        v-for="(post, index) in posts"
      >
        <div class="d-flex justify-content-between card-post-header">
          <h2 class="fs-6 card-container-row-header p-1">
            Posté
            {{ moment(post.createdPostAt).fromNow() }}
          </h2>
          <div>
            <button
              type="button"
              class="btn mb-5 rounded-0"
              @click="updatePosts(post)"
            >
              <i class="fas fa-exchange-alt"></i>
            </button>
            <button
              type="button"
              class="btn mb-5 rounded-0"
              @click="deletePosts(post)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text p-1">
            {{ post.comment }}
          </p>
        </div>
        <img
          :src="post.imageUrl"
          class="container__img"
          alt=""
          @click="test(post)"
        />
      </div>
    </div>
    <!-- ADMIN -->
    <div>
      <div
        class="card mt-5 mx-auto"
        :key="index"
        v-for="(admin, index) in admins"
      >
        <button
          type="button"
          class="btn btn-danger mb-5"
          @click="deletePosts(admin)"
        >
          ADMIN "supprimer le post"
        </button>
        <p>
          Posté par 😎 {{ admin.pseudo }}
          {{ moment(admin.createdPostAt).fromNow() }}
        </p>
        <img
          :src="admin.imageUrl"
          class="container__img"
          alt=""
          @click="test(admin)"
        />
        <div class="card-body">
          <p class="card-text">
            {{ admin.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
require("moment/locale/fr.js");
import axios from "../axios.js";
export default {
  name: "Profile",
  data() {
    return {
      moment: moment,
      posts: [],
      userId: "",
      comment: "",
      image: "",
      email: "",
      mode: "",
      pseudo: "",
      admins: [],
    };
  },
  mounted: function() {
    if (localStorage.getItem("user")) {
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      const pseudo = userIdValue[2].pseudo;
      this.pseudo = pseudo;
      if (this.pseudo == "admin") {
        // ADMIN ==> Voir tous les posts si c'est l'admin qui est connecté
        axios.get(`http://localhost:3000/api`).then((res) => {
          this.admins = res.data;
        });
      } else {
        //Voir uniquement les posts correspondant au userId
        axios.get(`http://localhost:3000/api/${userId}`).then((res) => {
          this.posts = res.data;
          console.log(this.posts);
        });
      }
    } else {
      this.$router.push("/");
    }
  },

  methods: {
    pseudoAdmin: function() {
      if (this.pseudo !== "admin") {
        return true;
      }
    },
    formPost: function() {
      if (localStorage.getItem("user")) {
        return true;
      }
    },
    logout: function() {
      localStorage.clear();
      this.$router.push("/");
    },
    switchToCreateAccount: function() {
      this.mode = "create";
    },
    switchToLogin: function() {
      this.mode = "login";
    },
    onFileChange: function(event) {
      this.selectFile = event.target.files[0];
    },
    deletePosts: function(post) {
      if (confirm("Voulez-vous vraiment supprimer votre post ?")) {
        axios.delete(`http://localhost:3000/api/${post.id}`).then((res) => {
          console.log(res, this.pseudo);
        });
        location.reload();
        console.log("delete" + post.id);
      } else {
        this.$router.push("/profile");
      }
    },

    test: function(post) {
      console.log(post);
    },
    updatePosts: function(post) {
      localStorage.setItem("idPostUpdate", JSON.stringify(post.id));
      console.log(post.id);
      this.$router.push("/updatePost");
    },
    //deleteAccountSecrurity: function() {},
    deleteAccount: function() {
      if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
        const userIdValue = Object.values(userIdLocaStorage);
        const userId = userIdValue[2].id;
        axios.delete(`http://localhost:3000/api/auth/${userId}`).then((res) => {
          this.posts = res.data;
          console.log(userId);
        });
        localStorage.removeItem("user");

        location.reload();
      } else {
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style scoped>
.hello--img {
  max-width: 50%;
  height: 173px;
}
.hello--img__icon {
  position: relative;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px;
}

.profile {
  background-color: #ccc;
  height: 10000px;
}
.card__action {
  text-decoration: none;
}
.card-post {
  height: 383px;
}
.card-post-header {
  height: 38px;
  background-color: #ffd7d7;
}
.card {
  max-width: 25%;
  min-width: 350px;
  padding: 0px;
}

.header {
  text-align: center;
  margin-top: 100px;
}
</style>
