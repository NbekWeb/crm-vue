import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Main from "../views/Main.vue";
import Tasks from "../views/Tasks.vue";
import Outcoming from "../views/Outcoming.vue";
import IncomingOne from "../views/IncomingOne.vue";
import IncomingNew from "../views/IncomingNew.vue";
import Incoming from "../views/Incoming.vue";
import IncomingEdit from "@/views/IncomingEdit.vue";
import Vendor from "@/views/Vendor.vue";
import Action from "@/views/Action.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
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
        {
          path: "edit-incoming",
          name: "editIncoming",
          component: IncomingEdit,
        },
        {
          path: "vendor",
          name: "vendor",
          component: Vendor,
        },
        {
          path: "action",
          name: "action",
          component: Action,
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
  editIncoming: "Приход редактировать",
  Main: "Главной",
  vendor: "Продавец",
  action: "Перемещения",
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
