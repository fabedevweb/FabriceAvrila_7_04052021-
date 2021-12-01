<template>
  <div class="hello">
    <div class="hello-img">
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo avec typographie Groupomania"
        class="hello--img__icon"
      />
    </div>
    <div role="main" aria-labelledby="foo">
      <h1 class="header__posts" id="foo">
        Bienvenue
        <span class="text-uppercase hello--pseudo fw-bold">{{
          pseudoPost()
        }}</span>
      </h1>

      <div class="card mt-5 mx-auto border-0" role="group" v-if="formPost()">
        <div class="form-row input-comment d-flex col-6">
          <input
            v-model="comment"
            class="form-row__input form-row__input--comment border-0"
            type="text"
            placeholder="Rédigez un commentaire"
            aria-label="Écrivez ici votre commentaire"
          />
          <label for="formFile" class="bg-primary btn-share"
            ><i class="fas fa-download text-light"></i
          ></label>
          <input
            @change="onFileChange"
            class="form-control border-0 rounded-0"
            type="file"
            id="formFile"
            aria-label="Cliquez ici pour télécharger une image"
          />
          <button
            @click="createPosts()"
            class="btn btn-primary rounded-0 btn-share"
          >
            <i class="fas fa-share-square "></i>
          </button>
        </div>
      </div>
      <div class="container card-container">
        <div class="row row-col-2 card-container-row">
          <div
            class="card mt-3 mx-auto active border-0 "
            :key="index"
            v-for="(post, index) in posts"
            aria-label="post"
          >
            <div class="card-container-row-header-custom ">
              <div
                class="card-container-row-header-custom__color d-flex justify-content-between align-items-center p-2"
              >
                <h2 class="fs-6 card-container-row-header ">
                  Posté par
                  <span class="heading-card-pseudo">{{ post.pseudo }}</span>
                  {{ moment(post.createdPostAt).fromNow() }}
                </h2>
                <button
                  v-if!="formPost()"
                  class="btn button--reply rounded-0"
                  type="button"
                  @click="switchToReply(post)"
                >
                  <i class="fas fa-retweet"></i>
                </button>
              </div>

              <div class="card-body">
                <p class="card-text fs-6 p-3">
                  {{ post.comment }}
                </p>
              </div>
            </div>

            <img
              :src="post.imageUrl"
              class="container__img rounded-0"
              alt="Image du post"
            />
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
.hello-img {
  padding-top: 100px;
  margin: auto;
  text-align: center;
}

.hello--img__icon {
  position: relative;
  width: 20%;
}

h1 {
  padding-top: 100px;
  text-align: center;
}

.hello {
  background-color: #ccc;
}
label {
  cursor: pointer;
  /* Style as you please, it will become the visible UI component. */
}

#formFile {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.card {
  max-width: 55%;
  min-width: 350px;
  padding: 9px;
  background-color: transparent;
}
.btn-share {
  padding: 5px;
}

.input-comment {
  padding: 9px;
  min-width: 349px;
  margin: auto;
  max-width: 100%;
}
.form-row__input--comment {
  width: 100%;
  height: 36px;
  padding: 5px;
}
.header__posts {
  text-align: center;
  padding-top: 42px;
}
.heading-card-pseudo {
  font-style: italic;
  color: #023583;
}
.card-container-row-header-custom {
  background-color: white;
}

.card-body-reply {
  margin-top: 10px;
  padding: 1rem;
  background-color: #ccc;
}
.card-body {
  padding: 0px;
}
.card-container-row-header-custom__color {
  background-color: #ffd7d7;
}
.hello--pseudo {
  color: #023583;
}
</style>
