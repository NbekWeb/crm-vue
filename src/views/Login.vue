<script setup>
import IconLock from "@/components/icons/IconLock.vue";
import IconLogin from "@/components/icons/IconLogin.vue";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import useLogin from "@/stores/login.pinia";
import useCore from "@/stores/core.pinia";
import { useRouter } from "vue-router";

const loginPinia = useLogin();
const corePinia = useCore();
const router = useRouter();
const { loadingUrl } = storeToRefs(corePinia);

const submitLogin = () => {
  loginPinia.login(
    { username: formState.username, password: formState.password },
    () => {
      formState.username = "";
      formState.password = "";
      router.push({ name: "Tasks" });
    }
  );
};

const accessToken = localStorage.getItem("access_token");
if (accessToken) {
  router.push({ name: "Tasks" });
}

const formState = reactive({
  username: "",
  password: "",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen p-6">
    <h2 class="mb-6 text-3xl font-semibold text-black-800">Войти в систему</h2>
    <a-form
      :model="formState"
      name="login"
      layout="vertical"
      @finish="submitLogin"
    >
      <a-form-item label="Пользователь" name="username">
        <a-input
          v-model:value="formState.username"
          placeholder="Пользователь"
          class="text-base border-blue-500"
        >
          <template #prefix><IconLogin class="text-xl text-blue" /></template>
        </a-input>
      </a-form-item>

      <a-form-item label="Ваш пароль" name="password">
        <a-input-password
          v-model:value="formState.password"
          type="password"
          placeholder="Password"
          class="border-blue-500"
        >
          <template #prefix><IconLock class="text-xl text-blue" /></template>
        </a-input-password>
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :loading="loadingUrl.has('login')"
        :disabled="formState.username === '' || formState.password === ''"
        >Авторизация</a-button
      >
    </a-form>
  </div>
</template>

<style>
.ant-form-vertical .ant-form-item .ant-form-item-control {
  width: 250px;
}
</style>
