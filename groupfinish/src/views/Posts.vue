<template>
  <div class="hello">
    <h1>Bienvenue</h1>
    <div class="card mt-5" v-if="formPost()">
      <div class="form-row">
        <input
          class="form-row__input form-row__input--comment"
          type="text"
          placeholder="comment"
        />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label"></label>
        <input class="form-control" type="file" id="formFile" />
      </div>
      <button @click="createAccount()" class="button">
        <span>Poster mon commentaire</span>
      </button>
    </div>
    <div class="card mt-5" :key="index" v-for="(posts, index) in posts">
      <img :src="posts.imageUrl" class="container__img" alt="" />
      <div class="card-body">
        <p class="card-text">
          {{ posts.comment }}
        </p>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-row__input--comment {
  width: 100%;
}
</style>
