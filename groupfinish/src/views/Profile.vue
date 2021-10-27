<template>
  <div>
    <div class="card mx-auto mt-5">
      <h1 class="card__title">Mon profil</h1>
      <p class="card__subtitle">Voilà donc qui je suis...</p>
      <p>{{ user.comment }} {{ user.imageUrl }}</p>
      <div class="form-row">
        <button @click="logout()" class="button">
          Déconnexion
        </button>
      </div>
    </div>
    <div>
      <h2 class="header">Mes posts</h2>
      <div
        class="card mt-5 mx-auto"
        :key="index"
        v-for="(posts, index) in posts"
      >
        <img :src="posts.imageUrl" class="container__img" alt="" />
        <div class="card-body">
          <p class="card-text">
            {{ posts.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      posts: [],
      userId: "",
      comment: "",
      image: "",
      email: "",
    };
  },
  mounted: function() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
    const userIdLocaStorage = JSON.parse(localStorage.getItem("user"));
    const userIdValue = Object.values(userIdLocaStorage);
    const userId = userIdValue[2].id;
    axios.get(`http://localhost:3000/api/${userId}`).then((res) => {
      this.posts = res.data;
      //console.log(this.posts);
    });
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 35%;
}

.header {
  text-align: center;
  margin-top: 20px;
}
</style>
