<script setup>
import {onMounted, reactive, ref} from "vue";

import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const form = reactive({
  email: null,
  password: null,
  remember: true
})

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/dashboard')
  }
})

async function onSubmit() {
  try {
    delete form.remember
    loading.value = true
    await userStore.login(form)
    loading.value = false
    router.push('/dashboard')
  } catch (err) {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <h2 class="login-title title">
      {{ $t('login.title') }}
    </h2>
    <form class="login-form">
      <base-input
          v-model="form.email"
          :label="$t('login.email')"
          type="email"
          :placeholder="$t('login.your_email')"/>
      <base-input
          v-model="form.password"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.your_password')" />
      <base-checkbox
          v-model="form.remember"
          :label="$t('login.remember')"/>
    </form>

    <base-button
        :loading="loading"
        type="submit"
        color="primary"
        @click="onSubmit">
      {{ $t('login.sign_in') }}
    </base-button>
  </div>
</template>

<style scoped lang="scss">
.login {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--gray-400);

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
