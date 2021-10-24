<template>
    <div>
        <h1>Mon API</h1>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name:"Home",
    data: function() {
    return {
      posts: [],
    };
  },
  mounted(){
    axios
    .get("http://localhost:3000/api/")
    .then((res) => {
      this.posts = res;
      console.log(this.posts)
    });
  },
}
</script>
