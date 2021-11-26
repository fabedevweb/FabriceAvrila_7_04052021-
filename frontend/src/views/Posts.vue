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
        <span class="text-uppercase hello--pseudo fw-bold">{{
          pseudoPost()
        }}</span>
      </h1>
      <div class="container">
        <div class="row">
          <div
            class="formcomment border-0 rounded-0"
            role="group"
            v-if="formPost()"
          >
            <div class="d-flex flex-row">
              <input
                v-model="comment"
                class="form-row__input form-row__input--comment border-0"
                type="text"
                placeholder="Create a post"
                aria-label="Écrivez ici votre commentaire"
              />
              <div class="file btn btn-lg btn-primary rounded-0">
                <i class="fas fa-upload"></i>
                <input class="inputupload" type="file" name="file" />
              </div>
              <button @click="createPosts()" class="btn btn-primary rounded-0">
                <i class="fas fa-share-square "></i>
              </button>
            </div>
          </div>
          <div
            class="card card-img mt-3 mx-auto active rounded-0 col"
            :key="index"
            v-for="(post, index) in posts"
            aria-label="post"
          >
            <h2>
              Posté par {{ post.pseudo }}
              {{ moment(post.createdPostAt).fromNow() }}
            </h2>
            <div class="card-body rounded-0">
              <p class="card-text fs-6">
                {{ post.comment }}
              </p>
            </div>
            <img
              :src="post.imageUrl"
              class="container__img rounded"
              alt="Image du post"
            />
            <button
              v-if!="formPost()"
              class="btn button--reply"
              type="button"
              @click="switchToReply(post)"
            >
              <i class="far fa-comment-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Convertir format date pour les posts avec moment
const moment = require("moment");
require("moment/locale/fr.js");
//Import de la base url axios avec le token
import axios from "../axios.js";
export default {
  name: "Posts",
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
    const self = this;
    self.$store.dispatch("getPosts", {}).then((res) => {
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

      axios.post("", fd).then((res) => {
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

<style scoped>
.formcomment {
  padding: 0;
}

.hello--img__icon {
  position: relative;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px;
}
div {
  position: relative;
  overflow: hidden;
}
.inputupload {
  position: absolute;
  font-size: 50px;
  opacity: 0;
  right: 0;
  top: 0;
  cursor: pointer;
}
h1 {
  padding-top: 100px;
  text-align: center;
}
h2 {
  padding: 5px 0px 0px 5px;
  font-size: 13px;
}
p {
  padding: 0px 0px 0px 5px;
}
.hello {
  background-color: #ccc;
  min-height: 250vh;
}
.card {
  max-width: 47%;
  /*min-width: 350px;*/
}
.card-img {
  padding: 0;
}
.form-row__input--comment {
  width: 100%;
  height: 50px;
  padding: 5px;
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
  width: 42px;
}
.hello--pseudo {
  color: #023583;
}
</style>
