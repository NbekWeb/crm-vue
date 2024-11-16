<script setup>
import IconCompus from "@/components/icons/IconCompus.vue";
import IconIncome from "@/components/icons/IconIncome.vue";
import IconInvest from "@/components/icons/IconInvest.vue";
import IconMark from "@/components/icons/IconMark.vue";
import IconOut from "@/components/icons/IconOut.vue";
import IconProduct from "@/components/icons/IconProduct.vue";
import IconReport from "@/components/icons/IconReport.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconTask from "@/components/icons/IconTask.vue";
</script>
<template>
  <div
    class="container grid h-screen grid-cols-2 px-5 mx-auto overflow-y-hidden max-lg:grid-cols-1"
  >
    <div
      class="flex flex-col items-center justify-center font-bold text-black-700 max-lg:items-start"
    >
      <h2 class="font-bold text-8xl max-xl:text-6xl">Logo</h2>
      <p
        class="max-w-[520px] text-3xl max-xl:text-2xl max-xl:max-w-[400px] max-lg:max-w-full"
      >
        Какой-то небольшой заголовок в две или три строчки
      </p>
    </div>
    <div class="flex items-center">
      <div class="grid grid-cols-3 font-bold text-blue-400 gap-7">
        <router-link
          to="/dashboard"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-task class="text-[80px]" />
            <span>Задачи</span>
          </div>
        </router-link>
        <router-link
          to="/dashboard/outcoming"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-out class="text-[80px]" />
            <span>Расход</span>
          </div>
        </router-link>
        <router-link
          to="/dashboard/incoming"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-income class="text-[80px]" />
            <span>Приход</span>
          </div>
        </router-link>
        <router-link
          to="/dashboard/action"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-mark class="text-[80px]" />
            <span>Перемещения</span>
          </div>
        </router-link>
        <router-link
          to="/dashboard/vendor"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-compus class="text-[80px]" />
            <span>Продавец</span>
          </div>
        </router-link>

        <router-link
          to="/"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-invest class="text-[80px]" />
            <span>Инвентаризация</span>
          </div>
        </router-link>
        <router-link
          to="/"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-product class="text-[80px]" />
            <span>Товары</span>
          </div>
        </router-link>
        <router-link
          to="/"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-report class="text-[80px]" />
            <span>Отчеты</span>
          </div>
        </router-link>
        <router-link
          to="/"
          class="px-10 py-6 border border-gray-300 rounded-3xl hover:border-blue-400"
        >
          <div class="flex flex-col items-center gap-4">
            <icon-settings class="text-[80px]" />
            <span>Настройки</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
