<template>
  <div class="profile">
    <div class="card mx-auto mt-5 border-0 card-profile" v-if="formPost()">
      <h1 class="card__title" @click="userLocalStorage()">Mon profil</h1>
      <p class="card__subtitle">{{ userId }}</p>
      <p>{{ user.comment }} {{ user.imageUrl }}</p>
      <div class="form-row text-center">
        <button @click="logout()" class="btn btn-primary btn-lg">
          Déconnexion
        </button>
      </div>
      <div class="text-center">
        <button
          @click="deleteAccount(post)"
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
        <div class="card mt-5 mx-auto" v-if="mode == 'login'">
          <div class="form-row">
            <input
              v-model="comment"
              class="form-row__input form-row__input--comment"
              type="text"
              placeholder="comment"
            />
          </div>
          <div class="mb-3 ">
            <label for="formFile" class="form-label"></label>
            <input
              @change="onFileChange"
              class="form-control"
              type="file"
              id="formFile"
            />
          </div>
          <button @click="modifyPosts(post)" class="button">
            <span>Modifier mon commentaire</span>
          </button>
        </div>
        <p class="card__subtitle" v-if="mode == 'login'">
          <span class="card__action" @click="switchToCreateAccount()"
            >Annuler la modification</span
          >
        </p>
        <p class="card__subtitle" v-else>
          <span class="card__action" @click="switchToLogin()"
            >Modifier mon poste</span
          >
        </p>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      posts: [],
      userId: "",
      comment: "",
      image: "",
      email: "",
      mode: "",
      likes: "",
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
    axios.get(`http://localhost:3000/api/${userId}`).then((res) => {
      this.posts = res.data;
      console.log(userId);
    });
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
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
    deleteAccount: function() {
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
}

.header {
  text-align: center;
  margin-top: 100px;
}
</style>
