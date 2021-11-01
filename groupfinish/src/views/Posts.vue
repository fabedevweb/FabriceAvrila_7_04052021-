<template>
  <div class="hello">
    <h1 class="header__posts">Bienvenue {{}}</h1>
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
      <button @click="createPosts()" class="button">
        <span>Poster mon commentaire</span>
      </button>
    </div>
    <div class="card mt-3 mx-auto" :key="index" v-for="(post, index) in posts">
      <h3>Posté par 😎 {{ post.pseudo }} le {{ date }}</h3>
      <div class="card-body">
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
      <img :src="post.imageUrl" class="container__img" alt="" />
      <button
        v-if!="formPost()"
        class="btn btn-primary rounded-0"
        type="button"
        @click="switchToReply(post)"
      >
        commenter
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
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
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/").then((res) => {
      this.posts = res.data;
      console.log(this.posts);
    });
  },
  methods: {
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
    replyPost: function(post) {
      //const fd = new FormData();
      //const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      //const userIdValue = Object.values(userIdLocaStorage);
      //const userId = userIdValue[2].id;
      //const replyPost = this.post.reply;
      //const pseudo = userIdValue[2].pseudo;
      /*
      fd.append("comment", this.comment);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      axios.post("http://localhost:3000/api/", fd).then((res) => {
        console.log(res, this.postRequest);
      });
      location.reload();
      Réupération id avec post.id
      Récupération de l'userId avec la variable userId
      */

      console.log(post.reply);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #ccc;
}
.card {
  max-width: 60%;
  padding: 9px;
}
.form-row__input--comment {
  width: 100%;
  height: 200px;
}
.header__posts {
  text-align: center;
  padding-top: 97px;
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
