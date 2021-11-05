import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Posts from "@/views/Posts.vue";
import Reply from "@/views/Reply.vue";
import UpdatePost from "@/views/UpdatePost.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    props: true,
  },
  {
    name: "posts",
    path: "/",
    component: Posts,
    props: true,
  },
  {
    name: "UpdatePost",
    path: "/updatePost",
    component: UpdatePost,
    props: true,
  },
  {
    name: "reply",
    path: "/reply",
    component: Reply,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
