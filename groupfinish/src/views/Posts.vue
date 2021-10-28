<template>
  <div class="hello">
    <h1 class="header__posts">
      Bienvenue
      <span :key="index" v-for="(posts, index) in posts">Ajouter Nom </span>
    </h1>
    <div class="card mt-5 mx-auto" v-if="formPost()">
      <h2 class="card-title mx-auto mb-5">Exprimez-vous !</h2>
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
      <h3>{{ post.pseudo }}</h3>
      <img :src="post.imageUrl" class="container__img" alt="" />
      <div class="card-body">
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
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
        <button @click="reply(post)" class="button">
          <span>commenter</span>
        </button>
      </div>
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
        console.log(res, this.pseudo);
      });
      location.reload();
    },
    reply: function(post) {
      const fd = new FormData();
      const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
      const userIdValue = Object.values(userIdLocaStorage);
      const userId = userIdValue[2].id;
      const pseudo = userIdValue[2].pseudo;
      fd.append("comment", this.comment);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      axios.post("http://localhost:3000/api/", fd).then((res) => {
        console.log(res, this.reply);
      });
      location.reload();
      console.log(post.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  max-width: 35%;
}
.form-row__input--comment {
  width: 100%;
}
.header__posts {
  text-align: center;
  margin-top: 20px;
}
</style>
