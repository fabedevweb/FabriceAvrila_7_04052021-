<template>
  <div class="hello">
    <h1 class="header__posts">Réponds au post</h1>
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
      <div
        class="card mt-3 mx-auto"
        :key="index"
        v-for="(replyPost, index) in replyPosts"
      >
        <p>{{ replyPost.comment }}</p>
      </div>
      <button
        class="btn btn-primary rounded-0"
        type="button"
        @click="switchToReply(post)"
      >
        commenter
      </button>
    </div>
    <div>
      <input
        v-model="comment"
        type="text"
        class="form-control rounded-0 mt-2 form-row__input--comment"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        placeholder="commenter"
      />
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
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      replyPost: [],
      replyPosts: [],
      userId: "",
      comment: "",
      image: "",
      post: "",
      email: "",
      pseudo: "",
      postRequest: "",
      date: "",
      mode: "",
      replyShowPage: "",
      reply: {
        id: "",
        imageUrl: "",
        userId: "",
        pseudo: "",
        reply: "",
      },
    };
  },
  mounted() {
    const idLicalStorage = JSON.parse(localStorage.getItem("reply"));
    axios.get(`http://localhost:3000/api/${idLicalStorage}`).then((res) => {
      this.posts = res.data;
      localStorage.setItem("replyRoute", JSON.stringify(this.posts));
    });
    //Réccupération des infos pour
    const idLicalStorage2 = JSON.parse(localStorage.getItem("replyRoute"));
    this.reply.id = idLicalStorage2[0].id;
    this.reply.imageUrl = idLicalStorage2[0].imageUrl;
    this.reply.userId = idLicalStorage2[0].userId;
    this.reply.pseudo = idLicalStorage2[0].pseudo;
    this.reply.comment = idLicalStorage2[0].comment;

    //Réccupération de tous les reply
    axios.get(`http://localhost:3000/api/reply`).then((res) => {
      this.replyPosts = res.data;
      console.log(this.replyPosts);
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
      axios
        .post("http://localhost:3000/api/reply", {
          idPost: this.reply.id,
          comment: this.comment,
          userId: this.reply.userId,
          pseudo: this.reply.pseudo,
        })
        .then((res) => {
          console.log(res, "Commentaire envoyé");
        });
      location.reload();
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
