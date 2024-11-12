<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import useIncome from "@/stores/incoming.pinia";
import useCore from "@/stores/core.pinia";
import dayjs from "dayjs";
import locale from "ant-design-vue/es/date-picker/locale/ru_RU";
import "dayjs/locale/ru";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";

dayjs.locale("ru");

const itemAdd = ref({});
const core = useCore();
const open = ref(false);
const openAdd = ref(false);
const deleted = ref(false);
const editProduct = ref(false);
const incomePinia = useIncome();

const { loadingUrl } = storeToRefs(core);
const { incomeOne, store, counterparty, product, contract, products } =
  storeToRefs(incomePinia);
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

function onInputNumber(event) {
  event.target.value = event.target.value.replace(/\D/g, "");

  formState.value.code = event.target.value;
}

const getProductName = () => {
  for (let i = 0; i < incomeOne.value.items.length; i++) {
    incomePinia.getProductId(incomeOne.value.items[i].productId, i);
  }
};
const dateFormat = "DD-MM-YYYY";

function formatDate(date) {
  return dayjs(date);
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
    dataIndex: "productId",
    key: "productId",
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
  {
    title: "Редакт ",
    dataIndex: "edit",
    key: "edit",
    width: 120,
    fixed: "right",
  },
];
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
const item = ref({});
const selectedItem = ref(-1);
const openProduct = (i) => {
  editProduct.value = true;
  selectedItem.value = i;
  item.value = JSON.parse(JSON.stringify(incomeOne.value.items[i]));
};

const getContract = () => {
  incomePinia.getContractId(incomeOne.value.counterpartyId);
};

const goBack = () => {
  router.push({ name: "incoming" });
};

const formState = ref({});
const openModal = () => {
  open.value = !open.value;
  formState.value = JSON.parse(JSON.stringify({ ...incomeOne.value }));
  formState.value.date = formatDate(formState.value.date);
};

const save = () => {
  const { id, contract, counterparty, store, ...incomeWithoutId } =
    formState.value;
  incomePinia.editIncome(
    { ...incomeWithoutId, date: formatDate(incomeWithoutId.date) },
    id,
    () => {
      incomePinia.getIncomeOne(route.query.id, () => {
        getProductName();
        getDependis();
        incomePinia.getContractId(incomeOne.value.counterpartyId);
        incomePinia.getAllCounterparty();
        incomePinia.getAllStore();
        incomePinia.getAllProduct();
      });
    }
  );
  cancel();
};

const cancel = () => {
  open.value = false;
};

const closeEdit = () => {
  editProduct.value = false;
};
const deleteItem = (i) => {
  selectedItem.value = i;
  if (formState.value.items.length == 0 || formState.value.items.length == 1) {
    formState.value.items = [];
  } else {
    formState.value.items.splice(selectedItem.value, 1);
  }
  saveEdit(0);
};

const saveEdit = (type = 0) => {
  if (type == 0) {
    // incomeOne.value.items[selectedItem.value] = JSON.parse(
    //   JSON.stringify(item.value)
    // );
    incomeOne.value.items = [...formState.value.items];
  } else if (type == 1) {
    formState.value.items[selectedItem.value] = JSON.parse(
      JSON.stringify(item.value)
    );
  } else if (type == 2) {
    formState.value.items.push({
      ...itemAdd.value,
      orderNo: formState.value.items?.[incomeOne.value.items.length - 1]
        ?.orderNo
        ? formState.value.items[incomeOne.value.items.length - 1].orderNo + 1
        : 1,
    });
    closeAddModal();
  }

  const { id, contract, counterparty, store, ...incomeWithoutId } =
    formState.value;
  incomePinia.editIncome(
    {
      ...incomeWithoutId,
      date: formatDate(incomeWithoutId.date),
      code:
        incomeOne.value.code.trim().length == incomeOne.value.code.length
          ? incomeOne.value.code + " "
          : incomeOne.value.code.trim(),
    },
    id,
    () => {
      incomePinia.getIncomeOne(route.query.id, () => {
        getProductName();
        getDependis();
        incomePinia.getContractId(incomeOne.value.counterpartyId);
        incomePinia.getAllCounterparty();
        incomePinia.getAllStore();
        incomePinia.getAllProduct();
        formState.value = JSON.parse(JSON.stringify({ ...incomeOne.value }));
        formState.value.date = formatDate(formState.value.date);
      });
    }
  );
  closeEdit();
};

const cancelDelete = () => {
  formState.value = JSON.parse(JSON.stringify({ ...incomeOne.value }));
  formState.value.date = formatDate(formState.value.date);
};

const addingItem = () => {
  openAdd.value = true;
  itemAdd.value = {};
};

const closeAddModal = () => {
  openAdd.value = false;
};

onMounted(() => {
  incomePinia.getIncomeOne(route.query.id, () => {
    getProductName();
    getDependis();
    incomePinia.getContractId(incomeOne.value.counterpartyId);
    incomePinia.getAllCounterparty();
    incomePinia.getAllStore();
    incomePinia.getAllProduct();

    formState.value = JSON.parse(JSON.stringify({ ...incomeOne.value }));
    formState.value.date = formatDate(formState.value.date);
  });
});
</script>
<template>
  <div>
    <a-modal v-model:open="editProduct" title="Приходные документы">
      <a-form :model="item" class="pr-5 mt-4">
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
      <template #footer>
        <a-button @click="closeEdit">Отменить</a-button>
        <a-button type="primary" @click="saveEdit(1)">Сохранит</a-button>
      </template>
    </a-modal>
    <a-modal v-model:open="open" title="Приходные документы">
      <a-form
        :model="formState"
        layout="vertical"
        class="grid grid-cols-2 mt-6 gap-x-6"
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
          @keyup="onInputNumber"
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
      <template #footer>
        <a-button @click="cancelDelete">Отменить</a-button>
        <a-button type="primary" @click="save">Сохранит</a-button>
      </template>
    </a-modal>
    <a-modal v-model:open="openAdd" title="Товар">
      <div class="overflow-y-auto max-modal">
        <a-form :model="itemAdd" class="pr-5 mt-4" ref="formRef">
          <a-form-item
            label="OEM"
            name="oemCode"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-input
              placeholder="OEM"
              v-model:value="itemAdd.oemCode"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="Товар"
            name="productId"
            :rules="[{ required: true, message: 'Пожалуйста, введите!' }]"
          >
            <a-select v-model:value="itemAdd.productId">
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
              v-model:value="itemAdd.quantity"
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
              v-model:value="itemAdd.price"
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
              v-model:value="itemAdd.weight"
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
              v-model:value="itemAdd.cost"
              type="number"
              :min="1"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <div class="">
          <a-button @click="closeAddModal">Отмена</a-button>
          <a-button type="primary" @click="saveEdit(2)">Добавить </a-button>
        </div>
      </template>
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
          <div class="flex items-center gap-4">
            <a-button @click="openModal">Редактировать</a-button>
            <a-button type="primary" @click="addingItem">Добавить </a-button>
          </div>
        </div>
        <div class="">
          <a-table
            :columns="columns"
            :data-source="formState.items"
            :pagination="false"
            bordered
            :scroll="{ x: 800, y: 'calc(100vh - 400px)' }"
          >
            <template #bodyCell="{ column, index, text }">
              <template v-if="column.dataIndex === 'num'">
                <span class="hover:cursor-pointer">{{ index + 1 }}</span>
              </template>
              <template v-if="column.dataIndex === 'productId'">
                <span class="hover:cursor-pointer">{{ products[text] }}</span>
              </template>
              <template v-if="column.dataIndex === 'edit'">
                <div class="flex items-center gap-2">
                  <a-popover title="Изменить">
                    <template #content> </template>
                    <div
                      @click="openProduct(index)"
                      class="w-6 h-6 min-w-6 rounded-full bg-gray-500 flex justify-center items-center text-[10px]"
                    >
                      <icon-edit />
                    </div>
                  </a-popover>
                  <a-popover title="Удалить">
                    <template #content> </template>
                    <div
                      @click="deleteItem(index)"
                      class="flex items-center justify-center w-6 h-6 text-sm bg-gray-500 rounded-full min-w-6"
                    >
                      <!-- @click="saveEdit(1, index)" -->
                      <icon-delete />
                    </div>
                  </a-popover>
                </div>
              </template>
            </template>
          </a-table>
          <!-- <div class="flex justify-center w-full gap-5 pt-4" v-if="deleted">
            <a-button @click="cancelDelete">Отменить</a-button>
            <a-button type="primary">Сохранит</a-button>
          </div> -->
        </div>
      </div>
    </a-spin>
  </div>
</template>
