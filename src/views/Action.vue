<script setup>
import IconChevron from "@/components/icons/IconChevron.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import { ref } from "vue";

const img = ref(false);
const setting = ref(false);

const showImg = () => {
  img.value = !img.value;
};
const showSetting = () => {
  setting.value = !setting.value;
};

const rejim = ref();
const rasxod = ref();

const columns = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width: 50,
  },
  {
    title: "Код товара",
    dataIndex: "code",
    key: "code",
    width: 120,
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name ",
    width: 150,
  },
  {
    title: "Кол-во ",
    dataIndex: "nums",
    key: "nums ",
    width: 120,
  },
  {
    title: "Ячейка ",
    dataIndex: "place",
    key: "place",
    width: 120,
  },
  {
    title: "Результат",
    dataIndex: "result",
    key: "result",
    width: 200,
  },
];

const columns2 = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width: 50,
  },
  {
    title: "Код товара",
    dataIndex: "code",
    key: "code",
    width: 120,
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name ",
    width: 150,
  },
  {
    title: "Кол-во ",
    dataIndex: "nums",
    key: "nums ",
    width: 120,
  },
  {
    title: "Ячейка ",
    dataIndex: "place",
    key: "place",
    width: 120,
  },
  {
    title: "Результат",
    dataIndex: "result",
    key: "result",
    width: 200,
  },
  {
    title: "Редакт ",
    dataIndex: "edit",
    key: "edit",
    width: 120,
  },
];

const data = Array.from({ length: 20 }, (_, index) => ({
  key: (index + 1).toString(),
  num: (index + 1).toString(),
  code: "22.05.23",
  name: "Данные",
  nums: "126523",
  result: "Какой-то там комментарий написан",
}));
</script>
<template>
  <div class="container px-5 pt-10 mx-auto outcoming">
    <a-modal
      v-model:open="img"
      class="2xl:!min-w-[1000px] max-2xl:!min-w-[700px] max-xl:!max-w-full"
    >
      <div class="flex items-center gap-0">
        <h2
          class="pr-8 mb-0 mr-8 text-2xl font-semibold border-r border-black/10"
        >
        Перемещения
        </h2>
        <a-button type="primary">Установить фото</a-button>
        <a-button type="primary" class="ml-4">Сделать фото</a-button>
      </div>
      <a-carousel arrows class="!mx-6 !mt-6" :dots="false">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <IconChevron class="!absolute -left-10 text-gray-700" />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <IconChevron class="!absolute -right-10 rotate-180 text-gray-700" />
          </div>
        </template>
        <div class="w-full h-full !mx-10"><h3>1</h3></div>
        <div class="w-full h-full !mx-10"><h3>1</h3></div>
      </a-carousel>
      <template #footer> </template>
    </a-modal>
    <a-modal v-model:open="setting" class="">
      <h2 class="mb-4 text-2xl font-semibold">Характеристики</h2>
      <div
        class="py-2.5 border-b border-black/10 flex items-center justify-between text-xl font-semibold"
        v-for="i of 6"
        :key="i"
      >
        <span
          >{{
            i % 4 == 0 || i > 3
              ? "Длинна"
              : i % 4 == 1
              ? "Ширина"
              : i % 4 == 2
              ? "Высота"
              : "Вес"
          }}:</span
        >
        <span class="text-sm text-gray-600">145х32 см</span>
      </div>
      <template #footer> </template>
    </a-modal>
    <div
      class="flex items-center w-full gap-0 pb-8 mb-6 border-b max-lg:pb-0 border-black/10 max-lg:flex-col max-lg:items-start max-lg:gap-10 max-lg:border-none"
    >
      <h2 class="pr-8 mb-0 text-3xl font-semibold border-r border-black/10">
        Расход
      </h2>

      <div class="flex items-center">
        <div class="flex items-center">
          <a-select
            v-model="rejim"
            placeholder="Выберите режим"
            class="ml-8 max-lg:ml-0 !min-w-[250px] max-lg:!min-w-[182px]"
            :allowClear="true"
          >
            <a-select-option value="paper"
              >Буммажная технологии</a-select-option
            >
          </a-select>
          <a-button class="ml-2 font-bold">PRN</a-button>
        </div>
        <a-select
          v-model="rejim"
          placeholder="Ввод результатов"
          style="width: 250px"
          class="ml-8 max-lg:ml-6"
          :allowClear="true"
        >
          <a-select-option value="rasxod"
            >Ввести расхожд. и принять
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="flex gap-6 mb-6 max-lg:flex-col">
      <div class="flex gap-6">
        <a-input
          type="text"
          style="width: 250px"
          placeholder="Введите место хранения"
        />
        <a-input
          type="text"
          style="width: 250px"
          placeholder="Введите код товара"
        />
      </div>
      <div class="flex gap-6">
        <a-input
          type="text"
          style="width: 250px"
          placeholder="Введите количество товара"
        />
        <a-button type="primary" class="max-lg:!min-w-[250px]">
          Подтвердить</a-button
        >
      </div>
    </div>
    <div class="2xl:hidden flex max-w-[524px] justify-around mb-6">
      <div
        @click="showImg"
        class="flex items-center justify-between p-[18px] border rounded-sm border-black/10 hover:border-blue-500 w-[100px]"
      >
        <img src="@/assets/img/image.png" class="w-16" />
      </div>
      <div
        @click="showSetting"
        class="flex items-center justify-between p-[18px] border rounded-sm border-black/10 hover:border-blue-500 w-[100px]"
      >
        <img src="@/assets/img/setting.png" class="w-16" />
      </div>
    </div>
    <div class="flex gap-6">
      <div class="!max-w-[1200px] overflow-x-hidden">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          bordered
          :scroll="{ x: 1000, y: 600 }"
        >
          <template #bodyCell="{ column }">
            <template v-if="column.dataIndex === 'place'">
              <span
                class="px-2 pb-1 text-sm font-medium text-white bg-green-500 rounded"
                >Данные</span
              >
            </template>
          </template>
        </a-table>
      </div>
      <div class="flex flex-col gap-6 max-2xl:hidden min-w-[300px]">
        <div
          @click="showImg"
          class="flex items-center justify-between p-10 border rounded-sm border-black/10 hover:border-blue-500 w-44"
        >
          <img src="@/assets/img/image.png" class="w-24" />
        </div>
        <div
          @click="showSetting"
          class="flex items-center justify-between p-10 border rounded-sm border-black/10 hover:border-blue-500 w-44"
        >
          <img src="@/assets/img/setting.png" class="w-24" />
        </div>
      </div>
    </div>
    <h2 class="mt-10 text-3xl font-semibold">История действий</h2>
    <div class="pb-10">
      <a-table
        :columns="columns2"
        :data-source="data"
        :pagination="false"
        bordered
        :scroll="{ x: 500, y: 1000 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'place'">
            <span
              class="px-2 pb-1 text-sm font-medium text-white bg-green-500 rounded"
              >Данные</span
            >
          </template>
          <template v-if="column.dataIndex === 'edit'">
            <div class="flex items-center gap-2">
              <a-popover title="Изменить">
                <template #content> </template>
                <div
                  class="w-6 h-6 rounded-full bg-gray-500 flex justify-center items-center text-[10px]"
                >
                  <icon-edit />
                </div>
              </a-popover>
              <a-popover title="Удалить">
                <template #content> </template>
                <div
                  class="flex items-center justify-center w-6 h-6 text-sm bg-gray-500 rounded-full"
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
</template>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 300px;
  background: #d9d9d9;
  overflow: hidden;
  border-radius: 20px;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  transition: ease all 0.3s;
  opacity: 1;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  opacity: 0;
}
</style>
