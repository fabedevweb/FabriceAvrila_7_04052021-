<template>
  <div class="hello">
    <div
      class="card mt-3 mx-auto border-0 rounded-0"
      :key="index"
      v-for="(post, index) in posts"
    >
      <!--<h1 class="header__posts">Réponds à {{ post.pseudo }}</h1>-->
      <p class="border-bottom p-1">
        Posté par 😎 {{ post.pseudo }}
        {{ moment(post.createdPostAt).fromNow() }}
      </p>
      <div class="card-body">
        <p class="card-text">
          {{ post.comment }}
        </p>
      </div>
      <img :src="post.imageUrl" class="container__img" alt="" />
      <div
        class="card--replyPost mt-3"
        :key="index"
        v-for="(replyPost, index) in replyPosts"
      >
        <p class="border-bottom">
          <!-- ADMIN -->
          <button
            v-if="reply.replyUserNow == 'admin'"
            class="btn btn-danger"
            @click="deleteReply(replyPost)"
          >
            delete
          </button>
          Posté par
          <span class="card--replyPost__pseudocomment">
            {{ replyPost.pseudo }}
          </span>
          {{ moment(replyPost.createdPostAt).fromNow() }} :
          {{ replyPost.comment }}
        </p>
      </div>
    </div>
    <div class="reply mx-auto d-flex align-items-center">
      <input
        v-model="comment"
        type="text"
        class="form-control form-row__input--comment rounded-0 border-0"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        placeholder="commenter"
      />
      <div>
        <button
          class="btn btn-primary rounded-0 btn-reply"
          type="button"
          @click="createPosts()"
        >
          <i class="fas fa-retweet"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
require("moment/locale/fr.js");
//Import de la base url axios avec le token
import axios from "../axios.js";
export default {
  name: "Reply",
  data() {
    return {
      moment: moment,
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
      admin: "",
      reply: {
        id: "",
        imageUrl: "",
        userId: "",
        pseudo: "",
        reply: "",
        date: "",
        replyUserNow: "",
      },
    };
  },
  async mounted() {
    //Voir tous les posts correspondant à l'id du post sélectionné sur la page Posts stocké dans le localstorage
    const idLicalStorage = JSON.parse(localStorage.getItem("reply"));
    await axios
      .get(`http://localhost:3000/api/${idLicalStorage}`)
      .then((res) => {
        this.posts = res.data;
        localStorage.setItem("replyRoute", JSON.stringify(this.posts));
        console.log(this.posts);
      });

    //Réccupération des infos du localstorage pour afficher sur la page les infos suivantes
    const idLicalStorage2 = JSON.parse(localStorage.getItem("replyRoute"));
    this.reply.id = idLicalStorage2[0].id;
    this.reply.imageUrl = idLicalStorage2[0].imageUrl;
    this.reply.pseudo = idLicalStorage2[0].pseudo;
    this.reply.comment = idLicalStorage2[0].comment;
    console.log(this.reply.userId);
    //Récupération des des infos du localstorage pour afficher le reply de la personne connectée
    const idLicalStorage3 = JSON.parse(localStorage.getItem("user"));
    this.reply.replyUserNow = idLicalStorage3.user.pseudo;
    this.reply.userId = idLicalStorage3.user.id;
    console.log(this.reply.userId);
    //Voir tous les reply correspondant au id du post affiché
    axios
      .get(`http://localhost:3000/api/reply/${idLicalStorage}`)
      .then((res) => {
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
        .post(`http://localhost:3000/api/reply`, {
          idPost: this.reply.id,
          comment: this.comment,
          userId: this.reply.userId,
          pseudo: this.reply.replyUserNow,
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

    deleteReply: function(replyPost) {
      axios
        .delete(`http://localhost:3000/api/reply/${replyPost.id}`)
        .then((res) => {
          this.replyPosts = res.data;
        });
      location.reload();
      replyPost;
      console.log(replyPost.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reply {
  max-width: 30%;
  min-width: 350px;
  margin-top: 20px;
}
.btn-reply {
  height: 45px;
}
.hello {
  background-color: #ccc;
  padding-top: 100px;
  height: 2000px;
}
.card {
  max-width: 30%;
  min-width: 350px;
  padding: 0px;
}
.form-row__input--comment {
  width: 100%;
  height: 45px;
  margin: 0px;
}
.header__posts {
  text-align: center;
  padding-top: 97px;
}
.card-body-reply {
  padding: 1rem;
  background-color: #ccc;
}
.card--replyPost {
  padding-left: 1rem;
}
p {
  margin: 0px;
}
.card--replyPost__pseudocomment {
  font-style: italic;
  color: brown;
}
</style>
