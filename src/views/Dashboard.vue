<script setup>
import IconChevron from "@/components/icons/IconChevron.vue";
</script>
<template>
  <div>
    <div class="border-b border-black/10">
      <div
        class="container flex items-center justify-between px-5 mx-auto py-7"
      >
        <div class="flex items-center gap-16">
          <span class="text-2xl font-bold">Logo</span>
          <a-button type="primary">Настройки</a-button>
        </div>
        <router-link to="/">
          <a-button type="primary">
            <div class="flex items-center gap-2">
              <icon-chevron />
              <span> Назад </span>
            </div>
          </a-button>
        </router-link>
        <!-- <div class="flex items-center gap-12 text-xl font-semibold">
          <router-link to="/"> Задачи </router-link>
          <router-link to="/outcoming"> Расход </router-link>
          <router-link to="/incoming"> Приход </router-link>
        </div> -->
      </div>
    </div>
    <router-view />
  </div>
</template>
