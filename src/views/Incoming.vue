<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useIncome from "@/stores/incoming.pinia";
import useCore from "@/stores/core.pinia";
import dayjs from "dayjs";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goOne = (id) => {
  router.push({ name: "incomingOne", query: { id } });
};

function formatDate(date) {
  return dayjs(date).format(" DD-MM-YYYY");
}

const incomePinia = useIncome();
const corePinia = useCore();

const { loadingUrl } = storeToRefs(corePinia);
const { income } = storeToRefs(incomePinia);

const deleteIncome = (i) => {
  incomePinia.deleteIncome(i, () => {
    incomePinia.getIncome();
  });
};

const getDependis = () => {
  for (let i = 0; i < income.value.length; i++) {
    incomePinia.getCounterpartyId(income.value[i].counterpartyId, i);
    incomePinia.getContractByCounterId(
      income.value[i].counterpartyId,
      income.value[i].contractId,
      i
    );
    incomePinia.getStoreId(income.value[i].storeId, i);
  }
};

getDependis();

watch(
  () => income.value.length,
  () => {
    getDependis();
  }
);

const columns = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width: 50,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    width: 120,
  },
  {
    title: "Номер",
    dataIndex: "code",
    key: "code",
    width: 100,
  },
  {
    title: "Акт.",
    dataIndex: "active",
    key: "active",
    width: 60,
  },
  {
    title: "Контрагент",
    dataIndex: "counterparty",
    key: "counterparty",
    width: 120,
  },
  {
    title: "Договор",
    dataIndex: "contract",
    key: "contract",
    width: 120,
  },
  {
    title: "Валюта",
    dataIndex: "currency",
    key: "currency",
    width: 80,
  },
  {
    title: "Склад",
    dataIndex: "store",
    key: "store",
    width: 80,
  },
  {
    title: "Редакт ",
    dataIndex: "edit",
    key: "edit",
    width: 80,
  },
];

const createNew=()=>{
  router.push({name:'incomingNew'})
}
onMounted(() => {
  incomePinia.getIncome();
  getDependis();
});
</script>

<template>
  <a-spin
    :spinning="
      loadingUrl.has('income') ||
      loadingUrl.has('counter/id') ||
      loadingUrl.has('contract/id') ||
      loadingUrl.has('store/id')
    "
  >
    <div class="container px-5 mx-auto">
      <div
        class="flex items-center justify-between pb-8 mt-10 border-b border-black/10"
      >
        <h2 class="mb-0 text-2xl font-semibold">Приход</h2>
        <a-button type="primary" @click="createNew">Создать приход</a-button>
      </div>
      <div class="mt-6">
        <a-table
          :columns="columns"
          :data-source="income"
          :pagination="false"
          bordered
          :scroll="{ y: 'calc(100vh - 300px)', x:900  }"
        >
          <template #bodyCell="{ column, index, text }">
            <template v-if="column.dataIndex === 'num'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ index + 1 }}</span
              >
            </template>

            <template v-if="column.dataIndex === 'date'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ formatDate(text) }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'code'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'active'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text ? "Да" : "Нет" }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'counterparty'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'contract'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'currency'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'store'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ text }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'edit'">
              <div class="flex items-center gap-2">
                <a-popover title="Изменить">
                  <template #content> </template>
                  <div
                    class="w-6 h-6 min-w-6 rounded-full bg-gray-500 flex justify-center items-center text-[10px]"
                  >
                    <icon-edit />
                  </div>
                </a-popover>
                <a-popover title="Удалить">
                  <template #content> </template>
                  <div
                    @click="deleteIncome(income[index].id)"
                    class="flex items-center justify-center w-6 h-6 text-sm bg-gray-500 rounded-full min-w-6"
                  >
                    <icon-delete />
                  </div>
                </a-popover>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-spin>
</template>
