<script setup>
import { RouterView } from "vue-router";
import useCore from "@/stores/core.pinia.js";
import { storeToRefs } from "pinia";
import { watch, onMounted } from "vue";
import { message } from "ant-design-vue";

const corePinia = useCore();
const { toastContent } = storeToRefs(corePinia);

watch(toastContent, () => {
  if (toastContent.value) {
    const toastMessage = toastContent.value?.message;
    const type = toastContent.value?.type || "success";
    if (type === "error") {
      return message.error(toastMessage);
    } else {
      return message.success(toastMessage);
    }
  }
});
onMounted(() => {
  localStorage.setItem(
    "access_token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwL2FwaS92MSIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjgwODAvIiwidXNlcm5hbWUiOiJhZG1pbiJ9.pcvBwM4eaA2F01U5fpXFEdcdPihpzeS6eS9MManczPk"
  );
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
