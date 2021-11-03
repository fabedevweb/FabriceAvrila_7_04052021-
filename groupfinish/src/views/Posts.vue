<template>
  <div class="hello">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo avec typographie Groupomania"
      class="hello--img__icon"
    />
    <div role="main" aria-labelledby="foo">
      <h1 class="header__posts" id="foo">
        Bienvenue
        <span class="text-uppercase text-primary fw-bold">{{
          pseudoPost()
        }}</span>
      </h1>

      <div
        class="card mt-5 mx-auto border-0"
        role="group"
        aria-labelledby="formulaire pour poster un commentaire"
        v-if="formPost()"
      >
        <div class="form-row ">
          <input
            v-model="comment"
            class="form-row__input form-row__input--comment border-0"
            type="text"
            placeholder="Rédigez un commentaire"
            aria-label="Écrivez ici votre commentaire"
          />
        </div>
        <div class="mb-3 border-0">
          <!--<label for="formFile" class="form-label"></label>-->
          <input
            @change="onFileChange"
            class="form-control border-0"
            type="file"
            id="formFile"
            aria-label="Cliquez ici pour télécharger une image"
          />
        </div>
        <button @click="createPosts()" class="btn btn-primary">
          <span>Poster mon commentaire</span>
        </button>
      </div>
      <div
        class="card mt-3 mx-auto active"
        :key="index"
        v-for="(post, index) in posts"
        aria-label="post"
      >
        <h2 class="fs-5">
          Posté par 😎 {{ post.pseudo }}
          {{ moment(post.createdPostAt).fromNow() }}
        </h2>
        <div class="card-body">
          <h3 class="card-text fs-6">
            {{ post.comment }}
          </h3>
        </div>
        <img
          :src="post.imageUrl"
          class="container__img rounded"
          alt="Image du post"
        />
        <button
          v-if!="formPost()"
          class="btn btn-primary button--reply"
          type="button"
          @click="switchToReply(post)"
        >
          <i class="far fa-comment-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
require("moment/locale/fr.js");
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      moment: moment,
      posts: [],
      userId: "",
      comment: "",
      image: "",
      post: "",
      email: "",
      pseudo: "",
      postRequest: "",
      date: "",
      mode: "",
      pseudoPage: "",
    };
  },

  mounted() {
    axios.get("http://localhost:3000/api/").then((res) => {
      this.posts = res.data;
      console.log(this.posts);
    });
  },

  methods: {
    pseudoPost: function() {
      if (localStorage.getItem("user")) {
        const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
        const userIdValue = Object.values(userIdLocaStorage);
        const pseudo = userIdValue[2].pseudo;
        this.pseudoPage = pseudo;
        return this.pseudoPage;
      }
    },
    formPost: function() {
      if (localStorage.getItem("user")) {
        return true;
      }
    },
    onFileChange: function(event) {
      this.selectFile = event.target.files[0];
    },
    createPosts: function() {
      const fd = new FormData();
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      const pseudo = userIdValue[2].pseudo;
      fd.append("image", this.selectFile, this.selectFile.name);
      fd.append("comment", this.comment);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      axios.post("http://localhost:3000/api/", fd).then((res) => {
        console.log(res, this.comment);
      });
      location.reload();
    },
    switchToReply: function(post) {
      this.$router.push("/reply");
      this.post = post.id;
      localStorage.setItem("reply", JSON.stringify(this.post));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello--img__icon {
  position: relative;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px;
}
h1 {
  padding-top: 100px;
  text-align: center;
}
.hello {
  background-color: #ccc;
}
.card {
  max-width: 60%;
  min-width: 350px;
  padding: 9px;
}
.form-row__input--comment {
  width: 100%;
  height: 200px;
}
.header__posts {
  text-align: center;
  padding-top: 42px;
}
.card-body-reply {
  margin-top: 10px;
  padding: 1rem;
  background-color: #ccc;
}
.card-body {
  padding: 0px;
}
.button--reply {
  margin-top: 20px;
}
</style>
