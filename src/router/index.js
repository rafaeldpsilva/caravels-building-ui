import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tokens from "../views/Tokens.vue";
import IoTs from "../views/IoTs.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Tokens,
  },
  {
    path: "/iots",
    name: "IoTs",
    component: IoTs,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach(async (to,from,next) => {
  console.log(to)
  const body = document.getElementsByTagName("body")[0];
  if(to.path !== '/signin' && (await !store.getters.isAuthenticated)){
    store.commit('uiSignin');
    body.classList.remove("bg-gray-100");
    next('/signin')
  } else {
    store.commit('uiLogged');
    body.classList.add("bg-gray-100");
    next()
  }
})

export default router;
