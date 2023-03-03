<script setup>
import {reactive} from "vue";

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
const router = useRouter()

const form = reactive({
  email: null,
  password: null,
  remember: true
})

const userStore = useUserStore()
async function onSubmit() {
  delete form.remember
  await userStore.login(form)
  router.push('/dashboard')
}

</script>

<template>
  <div class="login">
    <h1 class="login-title title">
      Панель администратора
    </h1>
    <form class="login-form">
      <base-input
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Ваш Email"/>
      <base-input
          v-model="form.password"
          type="password"
          label="Пароль"
          placeholder="Ваш Пароль"/>
      <base-checkbox
          v-model="form.remember"
          label="Запомный меня"/>
    </form>

    <base-button
        type="submit"
        color="primary"
        @click="onSubmit">
      Вход
    </base-button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.login {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid $gray-400;

  &-title {
    margin-bottom: 12px;
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary {
    margin-top: 12px;
    width: 100%;
  }
}
</style>
