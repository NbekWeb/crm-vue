import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useIncome = defineStore("income", {
  state: () => ({
    income: [],
    store: [],
    product: [],
    counterparty: [],
    incomeOne: {},
    products: {},
    counterparty: [],
    contract: [],
  }),
  actions: {
    getIncome() {
      const core = useCore();
      core.loadingUrl.add("income");
      api({
        url: "incoming",
        method: "GET",
      })
        .then(({ data }) => {
          this.income = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("income");
        });
    },
    getIncomeOne(id, callback) {
      const core = useCore();
      core.loadingUrl.add("income/one");
      api({
        url: `incoming/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.incomeOne = data.success;
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("income/one");
        });
    },
    getCounterparty() {
      const core = useCore();
      core.loadingUrl.add("counter");
      api({
        url: "counterparty",
        method: "GET",
      })
        .then(({ data }) => {
          this.counterparty = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("counter");
        });
    },
    getCounterpartyId(id, i) {
      const core = useCore();
      core.loadingUrl.add("counter/id");
      api({
        url: `counterparty/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.income[i].counterparty = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("counter/id");
        });
    },
    getContractByCounterId(counter, contract, i) {
      const core = useCore();
      core.loadingUrl.add("contract/id");
      api({
        url: `counterparty/${counter}/contract/${contract}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.income[i].contract = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("contract/id");
        });
    },
    getStoreId(id, i) {
      const core = useCore();
      core.loadingUrl.add("store/id");
      api({
        url: `store/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.income[i].store = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("store/id");
        });
    },
    getCounterpartyIdOne(id) {
      const core = useCore();
      core.loadingUrl.add("counter/id");
      api({
        url: `counterparty/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.incomeOne.counterparty = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("counter/id");
        });
    },
    getContractByCounterIdOne(counter, contract) {
      const core = useCore();
      core.loadingUrl.add("contract/id");
      api({
        url: `counterparty/${counter}/contract/${contract}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.incomeOne.contract = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("contract/id");
        });
    },
    getStoreIdOne(id) {
      const core = useCore();
      core.loadingUrl.add("store/id");
      api({
        url: `store/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.incomeOne.store = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("store/id");
        });
    },
    deleteIncome(id, callback) {
      const core = useCore();
      core.loadingUrl.add("income/id");
      api({
        url: `incoming/${id}`,
        method: "DELETE",
      })
        .then(() => {
          core.switchStatus("Приход удален", "success");
          callback();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("income/id");
        });
    },
    getProductId(id) {
      const core = useCore();
      core.loadingUrl.add("product/id");
      api({
        url: `product/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.products[id] = data.success.name;
          // this.incomeOne.items[i].product = data.success.name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("product/id");
        });
    },
    getAllCounterparty() {
      const core = useCore();
      core.loadingUrl.add("counterparty");
      api({
        url: "counterparty",
        method: "GET",
      })
        .then(({ data }) => {
          this.counterparty = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("counterparty");
        });
    },
    getAllStore() {
      const core = useCore();
      core.loadingUrl.add("store");
      api({
        url: "store",
        method: "GET",
      })
        .then(({ data }) => {
          this.store = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("store");
        });
    },
    getAllProduct() {
      const core = useCore();
      core.loadingUrl.add("product");
      api({
        url: "product",
        method: "GET",
      })
        .then(({ data }) => {
          this.product = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("product");
        });
    },
    getContractId(id) {
      const core = useCore();
      core.loadingUrl.add("contract");
      api({
        url: `counterparty/${id}/contract`,
        method: "GET",
      })
        .then(({ data }) => {
          this.contract = data.success;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          core.loadingUrl.delete("product");
        });
    },
    createIncome(data, callback) {
      const core = useCore();
      core.loadingUrl.add("createIncom");
      api({
        url: `incoming`,
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
    editIncome(data, id, callback) {
      const core = useCore();
      core.loadingUrl.add("createIncom");
      api({
        url: `incoming/${id}`,
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
          core.loadingUrl.delete("createIncom");
        });
    },
  },
});

export default useIncome;
