import { defineStore } from "pinia";
const useCore = defineStore("core", {
  state: () => ({
    collapsed: false,
    loadingUrl: new Set(["user/me"]),
    visibleDrawer: new Set(),
    loadingMain: false,
    toastContent: null,
    redirectUrl: null,
  }),
  actions: {
    loading() {
      this.loadingMain = !this.loadingMain;
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    setToast(obj = null) {
      this.toastContent = obj;
    },
    redirect(url = null) {
      this.redirectUrl = url;
    },
    switchStatus(msg = "succes", type = "succes", status = "200") {
      let toastMessage = {
        type,
        message: msg,
      };
      if (!type) {
        if (status >= 400 && status < 500) {
          toastMessage.type = "error";
        } else if (status >= 500) {
          toastMessage = {
            locale: "server error",
            type: "error",
          };

          this.redirect(`/500`);
        }
      }
      this.setToast(toastMessage);
    },
  },
});

export default useCore;
