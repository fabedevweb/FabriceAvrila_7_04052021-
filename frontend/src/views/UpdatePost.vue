<template>
  <div class="updatePost">
    <div
      class="card mt-5 mx-auto border-0"
      role="group"
      aria-labelledby="formulaire pour poster un commentaire"
    >
      <div class="form-row ">
        <input
          v-model="comment"
          class="form-row__input form-row__input--comment border-0"
          type="text"
          placeholder="Rédigez un commentaire"
          aria-label="Écrivez ici votre commentaire"
        />
      </div>
      <div class="mb-3 border-0">
        <!--<label for="formFile" class="form-label"></label>-->
        <input
          @change="onFileChange"
          class="form-control border-0"
          type="file"
          id="formFile"
          aria-label="Cliquez ici pour télécharger une image"
        />
      </div>
      <button @click="updatePosts()" class="btn btn-primary mb-2">
        <span>Poster mon commentaire</span>
      </button>
      <button @click="cancelUpdatePosts()" class="btn btn-success">
        <span>ANNULER</span>
      </button>
    </div>
    <div>
      <div
        class="card mt-5 mx-auto"
        :key="index"
        v-for="(post, index) in posts"
      >
        <img
          :src="post.imageUrl"
          class="container__img"
          alt=""
          @click="test(post)"
        />
        <div class="card-body">
          <p class="card-text">
            {{ post.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
require("moment/locale/fr.js");
//import { mapState } from "vuex";
import axios from "../axios.js";
export default {
  name: "Profile",
  data() {
    return {
      moment: moment,
      posts: [],
      userId: "",
      comment: "",
      image: "",
      email: "",
      mode: "",
      pseudo: "",
      admins: [],
    };
  },
  mounted: function() {
    const userIdLocaStorage = JSON.parse(localStorage.getItem("idPostUpdate"));
    axios.get(`${userIdLocaStorage}`).then((res) => {
      this.posts = res.data;
      console.log(res, this.comment);
    });
  },

  methods: {
    onFileChange: function(event) {
      this.selectFile = event.target.files[0];
    },
    updatePosts: function() {
      const fd = new FormData();
      const userIdLocaStorage = JSON.parse(
        localStorage.getItem("idPostUpdate")
      );

      fd.append("image", this.selectFile, this.selectFile.name);
      fd.append("comment", this.comment);

      axios.put(`${userIdLocaStorage}`, fd).then((res) => {
        console.log(res, this.comment);
      });
      location.reload();
    },
    cancelUpdatePosts: function() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.form-row__input--comment {
  width: 100%;
  height: 200px;
}
.hello--img {
  max-width: 50%;
  height: 173px;
}
.hello--img__icon {
  position: relative;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px;
}
.card-profile {
  padding-top: 100px;
}
.profile {
  background-color: #ccc;
}
.card__action {
  text-decoration: none;
}
.card {
  max-width: 60%;
  min-width: 350px;
}

.header {
  text-align: center;
  margin-top: 100px;
}
</style>
