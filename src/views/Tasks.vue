<script setup>
const columns = [
  {
    title: "№",
    dataIndex: "num",
    key: "num",
    width:50
  },
  {
    title: "Дата",
    dataIndex: "data",
    key: "data",
    width:120
  },
  {
    title: "Контрагент",
    dataIndex: "counterparty",
    key: "counterparty ",
    width:120
  },
  {
    title: "Тип",
    dataIndex: "type",
    key: "type",
    width:120
  },
  {
    title: "Кол-во позиций",
    dataIndex: "nums",
    key: "nums",
    width:150
  },
  {
    title: "Принято",
    dataIndex: "accept",
    key: " accept",
    width:120
  },
  {
    title: "Не принято",
    dataIndex: "unaccept",
    key: "unaccept",
    width:120
  },
  {
    title: "Комментарий",
    dataIndex: "komment",
    key: " komment",
  },
];
const data = [
  {
    key: "1",
    num: "1",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "2",
    num: "2",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "3",
    num: "3",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "4",
    num: "4",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "5",
    num: "5",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "6",
    num: "6",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "7",
    num: "7",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "8",
    num: "8",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
  {
    key: "9",
    num: "9",
    data: "22.05.23",
    counterparty: "Данные",
    type: "Тип",
    nums: "126523",
    komment: "Какой-то там комментарий написан",
  },
];
</script>
<template>
  <div class="container px-5 pt-10 mx-auto">
    <h2 class="text-3xl font-semibold">Задачи</h2>
    <div>
      <div class="max-w-[1200px]">
        
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered :scroll="{x:1024}">
          <template #bodyCell="{ column }">
            <template v-if="column.dataIndex === 'accept'">
              <span class="px-2 pb-1 text-sm font-medium text-white bg-green-500 rounded">Данные</span>
            </template>
            <template v-if="column.dataIndex === 'unaccept'">
              <span class="px-2 pb-1 text-sm font-medium text-white bg-red-500 rounded">Данные</span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
