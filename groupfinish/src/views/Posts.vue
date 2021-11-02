<template>
  <div class="hello">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo"
      class="hello--img__icon"
    />
    <h2 class="header__posts">Bienvenue {{ pseudoPost() }}</h2>
    <div class="card mt-5 mx-auto border-0" v-if="formPost()">
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
      <button @click="createPosts()" class="btn btn-primary">
        <span>Poster mon commentaire</span>
      </button>
    </div>
    <div class="card mt-3 mx-auto" :key="index" v-for="(post, index) in posts">
      <p>
        Posté par 😎 {{ post.pseudo }}
        {{ moment(post.createdPostAt).fromNow() }}
      </p>
      <div class="card-body">
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
      <img :src="post.imageUrl" class="container__img rounded" alt="" />
      <button
        v-if!="formPost()"
        class="btn btn-primary"
        type="button"
        @click="switchToReply(post)"
      >
        commenter
      </button>
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
    /*
    axios.get("http://localhost:3000/api/countReply").then((res) => {
      this.count = res.data;
      console.log(this.count);
    });
    */
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
</style>
