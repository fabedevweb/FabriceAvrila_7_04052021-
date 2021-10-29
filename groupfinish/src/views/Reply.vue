<template>
  <div class="hello">
    <h1 class="header__posts">Réponds au post {{}}</h1>
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
      <div>
        <input
          v-model="reply"
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
            @click="createPosts(post)"
          >
            Poster mon commentaire
          </button>
        </div>
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
      date: "",
      mode: "",
      reply: "",
    };
  },
  mounted() {
    const idLicalStorage = JSON.parse(localStorage.getItem("reply"));
    axios.get(`http://localhost:3000/api/${idLicalStorage}`).then((res) => {
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
      const userId = userIdLocaStorage.user.id;
      const pseudo = userIdLocaStorage.user.pseudo;
      fd.append("comment", this.reply);
      fd.append("userId", userId);
      fd.append("pseudo", pseudo);
      /*
      axios.post("http://localhost:3000/api/reply", fd).then((res) => {
        console.log(res, this.comment);
      });

      location.reload();
*/
      console.log(this.reply);
    },
    switchToReply: function() {
      this.mode = "createReply";
      this.$router.push("/reply");
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
