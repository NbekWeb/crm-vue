import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useVendor = defineStore("vendor", {
  state: () => ({
    vendor: [],
  }),
  actions: {
    getVendor() {
      const core = useCore();
      core.loadingUrl.add("vendor");
      api({
        url: "vendor",
        method: "GET",
      })
        .then(({ data }) => {
          this.vendor = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("vendor");
        });
    },
    createVendor(data, callback) {
      const core = useCore();
      core.loadingUrl.add("vendor");
      api({
        url: `vendor`,
        method: "POST",
        data,
      })
        .then(() => {
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("createIncom");
        });
    },
    editVendor(data, id, callback) {
      const core = useCore();
      core.loadingUrl.add("vendor");
      api({
        url: `vendor/${id}`,
        method: "PUT",
        data,
      })
        .then(() => {
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("vendor");
        });
    },
    deleteIncome(id, callback) {
      const core = useCore();
      core.loadingUrl.add("vendor");
      api({
        url: `vendor/${id}`,
        method: "DELETE",
      })
        .then(() => {
          core.switchStatus("Продавец удален", "success");
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("vendor");
        });
    },
  },
});

export default useVendor;
