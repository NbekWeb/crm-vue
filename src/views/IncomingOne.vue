<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useIncome from "@/stores/incoming.pinia";
import useCore from "@/stores/core.pinia";
import dayjs from "dayjs";
import IconChevron from "@/components/icons/IconChevron.vue";

const core = useCore();
const open = ref(false);
const incomePinia = useIncome();

const { loadingUrl } = storeToRefs(core);
const { incomeOne } = storeToRefs(incomePinia);
const route = useRoute();
const router = useRouter();

const getDependis = () => {
  incomePinia.getCounterpartyIdOne(incomeOne.value.counterpartyId);
  incomePinia.getContractByCounterIdOne(
    incomeOne.value.counterpartyId,
    incomeOne.value.contractId
  );
  incomePinia.getStoreIdOne(incomeOne.value.storeId);
};

const getProductName = () => {
  for (let i = 0; i < incomeOne.value.items.length; i++) {
    console.log(incomeOne.value.items[i].productId);
    incomePinia.getProductId(incomeOne.value.items[i].productId, i);
  }
};

function formatDate(date) {
  return dayjs(date).format(" DD-MM-YYYY");
}

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
    dataIndex: "product",
    key: "product",
    width: 120,
  },
  {
    title: "Кол-во",
    dataIndex: "orderNo",
    key: "orderNo",
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

const goBack = () => {
  router.push({ name: "incoming" });
};

const openModal = () => {
  open.value = !open.value;
};

onMounted(() => {
  incomePinia.getIncomeOne(route.query.id, () => {
    getProductName();
    getDependis();
  });
});
</script>
<template>
  <div>
    <a-modal v-model:open="open" title="Приходные документы">
      <div class="grid grid-cols-2 gap-3 mt-3 text-sm">
        <div>
          <span class="font-semibold"> Дата: </span>

          {{ formatDate(incomeOne.date) }}
        </div>
        <div>
          <span class="font-semibold"> Номер: </span>

          {{ incomeOne.code }}
        </div>
        <div>
          <span class="font-semibold"> Активный: </span>

          {{ incomeOne.active ? "Да" : "Нет" }}
        </div>
        <div>
          <span class="font-semibold"> Контрагент: </span>

          {{ incomeOne.counterparty }}
        </div>
        <div>
          <span class="font-semibold"> Договор: </span>

          {{ incomeOne.contract }}
        </div>
        <div>
          <span class="font-semibold"> Валюта: </span>

          {{ incomeOne.currency }}
        </div>
        <div>
          <span class="font-semibold"> Склад: </span>

          {{ incomeOne.store }}
        </div>
      </div>
      <template #footer></template>
    </a-modal>
    <a-spin :spinning="loadingUrl.has('income/one')">
      <div class="container px-5 mx-auto">
        <div class="flex items-center justify-between pb-8 mt-10">
          <div class="flex items-center gap-5">
            <span
              class="text-lg text-gray-700 hover:text-blue-500 hover:cursor-pointer"
              @click="goBack"
            >
              <IconChevron class="" />
            </span>
            <h2 class="mb-0 text-2xl font-semibold">Приход</h2>
          </div>
          <a-button type="primary" @click="openModal">Документ</a-button>
        </div>
        <div class="">
          <a-table
            :columns="columns"
            :data-source="incomeOne.items"
            :pagination="false"
            bordered
            :scroll="{ x: 800 }"
          >
            <template #bodyCell="{ column, index }">
              <template v-if="column.dataIndex === 'num'">
                <span
                  class="hover:cursor-pointer"
                  @click="goOne(income[index].id)"
                  >{{ index + 1 }}</span
                >
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </a-spin>
  </div>
</template>
