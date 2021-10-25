<template>
  <div class="hello">
    <h1>Bienvenue</h1>
    <div
      class="card"
      style="width: 18rem;"
      :key="index"
      v-for="(posts, index) in posts"
    >
      <img :src="posts.imageUrl" alt="" />
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
  name: "HelloWorld",
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 18rem;
}
</style>
