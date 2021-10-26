import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Posts from "@/views/Posts.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
