<template>
  <div class="hello">
    <h1 class="header__posts">🤩 Bienvenue {{ pseudo }}</h1>
    <div class="card mt-5 mx-auto border-0 " v-if="formPost()">
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
    <div class="card mt-5 mx-auto" :key="index" v-for="(post, index) in posts">
      <h2>Posté par 😎 {{ post.pseudo }} le {{ date }}</h2>
      <img :src="post.imageUrl" class="container__img" alt="" />
      <div class="card-body">
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
      <!--
      <div class=" mt-5 mx-auto" v-if="formPost()">
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Nom</label
          >
          <textarea
            v-model="postRequest"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button @click="requestPosts(post)" class="button">
          <span>commenter</span>
        </button>
      </div>
      -->
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
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/").then((res) => {
      this.posts = res.data;
      console.log(this.posts);
    });
    //Récupérer le pseudo pour l'afficher
    const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
    const userIdValue = Object.values(userIdLocaStorage);
    const userId = userIdValue[2].pseudo;
    console.log(userId);
    this.pseudo = userId;
    //Récupérer la date et l'heure pour le poste
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " à " + time;
    this.date = dateTime;
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
      //location.reload();
    },
    requestPosts: function(post) {
      /*
      const fd = new FormData();
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      const pseudo = userIdValue[2].pseudo;
      fd.append("comment", this.comment);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      axios.post("http://localhost:3000/api/", fd).then((res) => {
        console.log(res, this.postRequest);
      });
      location.reload();
      */
      console.log(post.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 1rem;
}
.hello {
  background-color: #ccc;
}
.card {
  max-width: 60%;
}
.form-row__input--comment {
  width: 100%;
  height: 200px;
}
.header__posts {
  text-align: center;
  padding-top: 97px;
}
</style>
