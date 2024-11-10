<script setup></script>
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
        <div class="flex items-center gap-12 text-xl font-semibold">
          <router-link to="/"> Задачи </router-link>
          <router-link to="/outcoming"> Расход </router-link>
          <router-link to="/incoming"> Приход </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
