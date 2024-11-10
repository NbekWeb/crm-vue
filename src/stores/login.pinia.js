import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useLogin = defineStore("login", {
  actions: {
    login(data, callback) {
      const core = useCore();
      core.loadingUrl.add("login");
      api({
        url: "login",
        open: true,
        method: "POST",
        data,
      })
        .then(({ data }) => {
          console.log(data);
          if (!data.success.token) {
            core.switchStatus("Пароль или Логин неверный!", "error");
          } else {
            localStorage.setItem("access_token", data.success.token);

            callback();
          }
        })
        .catch((error) => {
          console.log(error);
          core.switchStatus(error);
        })
        .finally(() => {
          core.loadingUrl.delete("login");
        });
    },
  },
});

export default useLogin;
