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
      <div class="card-body-reply">
        <p>Posté par 😎 {{ post.pseudo }} le {{ date }}</p>
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
      <button
        class="btn btn-primary rounded-0"
        type="button"
        @click="switchToReply(post)"
      >
        commenter
      </button>
      <div v-if="mode == 'createReply'">
        <input
          v-model="post.reply"
          type="text"
          class="form-control rounded-0 mt-2 form-row__input--comment"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="commenter"
        />
        <p>{{ post.reply }}</p>
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary rounded-0"
            type="button"
            @click="replyPost(post)"
          >
            Poster mon commentaire
          </button>
        </div>
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
      mode: "",
    };
  },
  mounted() {
    const idLicalStorage = JSON.parse(localStorage.getItem("reply"));
    axios.get(`http://localhost:3000/api/${idLicalStorage}`).then((res) => {
      this.posts = res.data;
      console.log(this.posts);
    });
    //Récupérer le pseudo pour l'afficher
    /*
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
    */
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
    switchToReply: function() {
      this.mode = "createReply";
      this.$router.push("/reply");
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
</style>
