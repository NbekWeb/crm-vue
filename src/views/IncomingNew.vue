<script setup>
import { reactive, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useIncome from "@/stores/incoming.pinia";
import useCore from "@/stores/core.pinia";
import dayjs from "dayjs";
import locale from "ant-design-vue/es/date-picker/locale/ru_RU";
import "dayjs/locale/ru";

import { useRouter } from "vue-router";
import IconChevron from "@/components/icons/IconChevron.vue";

const router = useRouter();

dayjs.locale("ru");
const dateFormat = "DD-MM-YYYY";

const core = useCore();
const incomePinia = useIncome();
const { loadingUrl } = storeToRefs(core);
const { store, counterparty, product, contract } = storeToRefs(incomePinia);

const formState = reactive({
  date: "",
  code: "",
  active: false,
  counterpartyId: "",
  contractId: "",
  currency: "",
  storeId: "",
  items: [],
});
const getContract = () => {
  incomePinia.getContractId(formState.counterpartyId);
};
const currency = [
  {
    value: "RUB",
    name: "RUB",
  },
  {
    value: "USD",
    name: "USD",
  },
  {
    value: "EUR",
    name: "EUR",
  },
];

const columns = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width: 50,
  },
  {
    title: "OEM",
    dataIndex: "oemCode",
    key: "oemCode",
    width: 120,
  },
  {
    title: "Товар",
    dataIndex: "productId",
    key: "productId",
    width: 120,
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
    width: 120,
  },

  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    width: 120,
  },
  {
    title: "Вес",
    dataIndex: "weight",
    key: "weight",
    width: 120,
  },
  {
    title: "Стоимость",
    dataIndex: "cost",
    key: "cost",
    width: 120,
  },
];

const open = ref(false);
const formRef = ref();
const mainRef = ref();
const item = ref({});
const openModal = () => {
  open.value = !open.value;
  item.value = {};
};
const goBack = () => {
  router.push({ name: "incoming" });
};

function findProduct(id) {
  const item = product.value.find((item) => item.id === id);
  return item ? item.name : null;
}
onMounted(() => {
  incomePinia.getAllCounterparty();
  incomePinia.getAllStore();
  incomePinia.getAllProduct();
});
const close = () => {
  openModal();
};

const addingItem = () => {
  formRef.value.validate().then(() => {
    formState.items.push({ ...item.value });
    close();
  });
};

const save = () => {
  mainRef.value.validate().then(() => {
    incomePinia.createIncome({...formState},() => {
      goBack();
    });
  });
};
</script>
<template>
  <div class="container px-5 mx-auto">
    <a-modal
      v-model:open="open"
      title="Товар"
      @cancel="close"
      :closable="false"
    >
      <div class="overflow-y-auto max-modal">
        <a-form :model="item" class="pr-5 mt-4" ref="formRef">
          <a-form-item
            label="OEM"
            name="oemCode"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input placeholder="OEM" v-model:value="item.oemCode"></a-input>
          </a-form-item>
          <a-form-item
            label="Товар"
            name="productId"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-select v-model:value="item.productId">
              <a-select-option
                :value="item.id"
                v-for="item of product"
                :key="item.id"
              >
                {{ item.name }}
              </a-select-option></a-select
            >
          </a-form-item>
          <a-form-item
            label="Кол-во"
            name="quantity"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input
              placeholder="Кол-во"
              v-model:value="item.quantity"
              type="number"
              :min="1"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="Цена"
            name="price"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input
              placeholder="Цена"
              v-model:value="item.price"
              type="number"
              :min="1"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="Вес"
            name="weight"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input
              placeholder="Стоимость"
              v-model:value="item.weight"
              type="number"
              :min="1"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="Стоимость"
            name="cost"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input
              placeholder="Стоимость"
              v-model:value="item.cost"
              type="number"
              :min="1"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <div class="">
          <a-button @click="close">Отмена</a-button>
          <a-button type="primary" @click="addingItem">Добавит</a-button>
        </div>
      </template>
    </a-modal>
    <div class="flex items-center justify-between mt-10">
      <div class="flex items-center gap-5">
        <span
          class="text-lg text-gray-700 hover:text-blue-500 hover:cursor-pointer"
          @click="goBack"
        >
          <IconChevron class="" />
        </span>
        <h2 class="mb-0 text-2xl font-semibold">Приход добавить</h2>
      </div>
      <a-button type="primary" @click="openModal">Добавить товар</a-button>
    </div>
    <a-form
      :model="formState"
      ref="mainRef"
      layout="vertical"
      class="grid grid-cols-4 mt-6 max-w-[1200px] max-lg:grid-cols-3 gap-x-6 max-md:grid-cols-2"
    >
      <a-form-item
        label="Дата:"
        name="date"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-date-picker
          v-model:value="formState.date"
          :format="dateFormat"
          :locale="locale"
          class="w-[200px]"
          placeholder="ДД.ММ.ГГГГ"
        />
      </a-form-item>
      <a-form-item
        label="Номер:"
        name="code"
        class="w-[200px]"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-input v-model:value="formState.code" placeholder="Номер" />
      </a-form-item>
      <a-form-item
        class="w-[200px]"
        label=" Активный:"
        name="active"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-radio-group v-model:value="formState.active">
          <a-radio :value="true"> Да</a-radio>
          <a-radio :value="false">Нет</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        class="w-[200px]"
        label=" Контрагент:"
        name="counterpartyId"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-select
          v-model:value="formState.counterpartyId"
          @change="getContract"
        >
          <a-select-option
            :value="item.id"
            v-for="item of counterparty"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        class="w-[200px]"
        label=" Договор:"
        name="contractId"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-select
          v-model:value="formState.contractId"
          :disabled="!formState.counterpartyId"
        >
          <a-select-option
            :value="item.id"
            v-for="item of contract"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        class="w-[200px]"
        label=" Валюта:"
        name="currency"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-select v-model:value="formState.currency">
          <a-select-option
            :value="item.value"
            v-for="(item, i) of currency"
            :key="i"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        class="w-[200px]"
        label=" Склад:"
        name="storeId"
        :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
      >
        <a-select v-model:value="formState.storeId">
          <a-select-option
            :value="item.id"
            v-for="item of store"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <div class="flex justify-center w-full max-w-[1200px] mt-4">
      <a-button type="primary" @click="save">Сохранит</a-button>
    </div>
    <div class="pb-10 mt-4" v-if="formState.items.length">
      <h2 class="mb-0 text-2xl font-semibold">Товары</h2>
      <a-table
        :columns="columns"
        :data-source="formState.items"
        :pagination="false"
        bordered
        :scroll="{ x: 800 }"
      >
        <template #bodyCell="{ column, index, text }">
          <template v-if="column.dataIndex === 'num'">
            <span
              class="hover:cursor-pointer"
              @click="goOne(income[index].id)"
              >{{ index + 1 }}</span
            >
          </template>
          <template v-if="column.dataIndex === 'productId'">
            <span
              class="hover:cursor-pointer"
              @click="goOne(income[index].id)"
              >{{ findProduct(text) }}</span
            >
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<style scoped>
.max-modal {
  max-height: calc(100vh - 240px);
}
</style>
