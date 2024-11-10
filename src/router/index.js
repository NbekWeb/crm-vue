import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Tasks from "../views/Tasks.vue";
import Outcoming from "../views/Outcoming.vue";
import IncomingOne from "../views/IncomingOne.vue";
import IncomingNew from "../views/IncomingNew.vue";
import Incoming from "../views/Incoming.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "",
      name: "Main",
      component: Main,
      children: [
        {
          path: "",
          name: "Tasks",
          component: Tasks,
        },
        {
          path: "outcoming",
          name: "Outcoming",
          component: Outcoming,
        },
        {
          path: "incoming",
          name: "incoming",
          component: Incoming,
        },
        {
          path: "incoming-one",
          name: "incomingOne",
          component: IncomingOne,
        },
        {
          path: "incoming-new",
          name: "incomingNew",
          component: IncomingNew,
        },
      ],
    },
   
  ],
});
const titles = {
  Login: "Авторизоваться",
  Tasks: "Задачи",
  Outcoming: "Расход",
  incoming: "Приход",
  incomingOne: "Приход",
  incomingNew: "Приход добавить",
};
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");

  document.title = to.meta.title || titles[to.name];

  if (to.name === "Login" && !accessToken) {
    return next();
  }

  if (accessToken) {
    return next();
  } else {
    return next({ name: "Login" });
  }
});

export default router;
