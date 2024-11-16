<script setup>
import { ref, onMounted } from "vue";
import useCore from "@/stores/core.pinia";

import { storeToRefs } from "pinia";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import useVendor from "@/stores/vendor.pinia";

const corePinia = useCore();
const vendorPinia = useVendor();
const { loadingUrl } = storeToRefs(corePinia);
const { vendor } = storeToRefs(vendorPinia);

const columns = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width: 50,
  },
  {
    title: "Продавец",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Редакт",
    dataIndex: "edit",
    key: "edit",
    width: 120,
  },
];

const item = ref({ name: "" });
const id = ref("");

const open = ref(false);

const openEdit = (i) => {
  id.value = vendor.value[i].id;
  item.value.name = vendor.value[i].name;
  open.value = !open.value;
};

const openNew = () => {
  item.name = "";
  item.value = {};
  open.value = !open.value;
};

const save = () => {
  if (!id.value) {
    vendorPinia.createVendor({ name: item.value.name }, () => {
      vendorPinia.getVendor();
      item.name = "";
      open.value = false;
    });
  } else {
    vendorPinia.editVendor({ name: item.value.name }, id.value, () => {
      id.value = "";
      vendorPinia.getVendor();
      item.name = "";
      open.value = false;
    });
  }
};

const deleteVendor = (i) => {
  vendorPinia.deleteIncome(vendor.value[i].id, () => {
    vendorPinia.getVendor();
  });
};
onMounted(() => {
  vendorPinia.getVendor();
});
</script>
<template>
  <a-spin :spinning="loadingUrl.has('vendor')">
    <div class="container px-5 mx-auto">
      <div
        class="flex items-center justify-between pb-8 mt-10 border-b border-black/10"
      >
        <h2 class="mb-0 text-2xl font-semibold">Список производителей</h2>
        <a-button type="primary" @click="openNew">Добавить</a-button>
      </div>
      <div class="mt-6">
        <a-table
          :columns="columns"
          :data-source="vendor"
          :pagination="false"
          bordered
          :scroll="{ x: 450 }"
        >
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'num'">
              <span
                class="hover:cursor-pointer"
                @click="goOne(income[index].id)"
                >{{ index + 1 }}</span
              >
            </template>
            <template v-if="column.dataIndex === 'edit'">
              <div class="flex items-center gap-2">
                <a-popover title="Изменить">
                  <template #content> </template>
                  <div
                    @click="openEdit(index)"
                    class="w-6 h-6 min-w-6 rounded-full bg-gray-500 flex justify-center items-center text-[10px]"
                  >
                    <icon-edit />
                  </div>
                </a-popover>
                <a-popover title="Удалить">
                  <template #content> </template>
                  <div
                    @click="deleteVendor(index)"
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
      <a-modal v-model:open="open" title="Продавец">
        <div class="mt-8">
          <a-form-item>
            <a-input placeholder="Продавец" v-model:value="item.name"></a-input>
          </a-form-item>
        </div>
        <template #footer>
          <a-button @click="() => (open = false)"> Отменить</a-button>
          <a-button type="primary" @click="save()" :disabled="!item.name"
            >Сохранить</a-button
          >
        </template>
      </a-modal>
    </div>
  </a-spin>
</template>
