<template>
  <div class="profile">
    <div class="hello--img mx-auto">
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo"
        class="hello--img__icon"
      />
    </div>
    <div class="card mx-auto mt-5 border-0 card-profile" v-if="formPost()">
      <h1 class="card__title" @click="userLocalStorage()">
        Salut 😏 <span class="text-uppercase text-primary">{{ pseudo }}</span>
      </h1>
      <p class="card__subtitle">{{ userId }}</p>
      <p>{{ user.comment }} {{ user.imageUrl }}</p>
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
        class="card mt-5 mx-auto"
        :key="index"
        v-for="(post, index) in posts"
      >
        <button
          type="button"
          class="btn btn-danger mb-5"
          @click="deletePosts(post)"
        >
          Supprimer mon post
        </button>

        <img
          :src="post.imageUrl"
          class="container__img"
          alt=""
          @click="test(post)"
        />
        <div class="card-body">
          <p class="card-text">
            {{ post.comment }}
          </p>
        </div>
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
import { mapState } from "vuex";
import axios from "axios";
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
      likes: "",
      pseudo: "",
      admins: [],
    };
  },
  mounted: function() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
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
        console.log(this.pseudo);
      });
    }
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
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
      this.$store.commit("logout");
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
    modifyPosts: function(post) {
      const fd = new FormData();
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      const pseudo = userIdValue[2].pseudo;
      fd.append("image", this.selectFile, this.selectFile.name);
      fd.append("comment", this.comment);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      axios.put(`http://localhost:3000/api/${post.id}`, fd).then((res) => {
        console.log(res, this.pseudo);
      });
      //location.reload();

      console.log(post);
    },
    deletePosts: function(post) {
      axios.delete(`http://localhost:3000/api/${post.id}`).then((res) => {
        console.log(res, this.pseudo);
      });
      location.reload();
      console.log("delete" + post.id);
    },
    test: function(post) {
      console.log(post);
    },
    deleteAccountSecrurity: function() {},
    deleteAccount: function() {
      alert("Voulez-vous vraiment supprimer votre compte ?");
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      axios.delete(`http://localhost:3000/api/auth/${userId}`).then((res) => {
        this.posts = res.data;
        console.log(userId);
      });
      localStorage.removeItem("user");

      location.reload();
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
.card-profile {
  padding-top: 100px;
}
.profile {
  background-color: #ccc;
}
.card__action {
  text-decoration: none;
}
.card {
  max-width: 60%;
  min-width: 350px;
}

.header {
  text-align: center;
  margin-top: 100px;
}
</style>
