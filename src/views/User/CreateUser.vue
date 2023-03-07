<script setup>
import {useUserStore} from "@/stores/userStore";
import {useRouter, useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import vSelect from "vue-select";

import BaseInput from '@/components/ui/BaseInput.vue'
import {getUserById, uploadFile} from "@/services/http.service";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const userId = route.params.id

const user = reactive({
  name: null,
  address: null,
  email: null,
  gender: null,
  image: null,
  phone: null,
  role: null,
  password: null,
})
onMounted(async () => {
  if (userId) {
    const data = await getUserById(userId)
    user.name = data.name
    user.email = data.email
    user.address = data.address
    user.phone = data.phone
    user.role = data.role
    user.gender = data.gender
    user.image = data.image
  }
})

async function inputChange(event) {
  user.image = await uploadFile(event)
}

async function onSubmit() {
  delete user.password
  if (userId) {
    await userStore.update(userId, user)
  } else {
    await userStore.create(user)
  }
  router.push('/users')
}

</script>

<template>
  <div>
    <h1>{{ (userId ? 'Редактировать' : 'Создать') + ' пользавителя' }}</h1>

    <form class="user-form" @submit.prevent="onSubmit">
      <BaseInput
          placeholder="Email"
          label="Email"
          v-model="user.email"/>

      <BaseInput
          placeholder="Имя"
          label="Имя"
          v-model="user.name"/>

      <BaseInput
          placeholder="Пароль"
          label="Пароль"
          v-model="user.password"/>

      <BaseInput
          placeholder="Адрес"
          label="Адрес"
          v-model="user.address"/>

      <BaseInput
          label="Номер телефона"
          placeholder="Номер телефона"
          v-model="user.phone"/>


      <v-select
          placholder="werwer"
          v-model="user.role"
          :options="['admin', 'student', 'teacher']"/>


      <v-select
          v-model="user.gender"
          :options="['male', 'female']"/>


      <BaseInput
          type="file"
          label="Фото"
          @change="inputChange"
      />

      <BaseButton type="submit">{{ userId ? 'Обновить' : 'Создать' }}</BaseButton>


    </form>
  </div>
</template>

<style lang="scss">
.user-form {
  margin-top: 30px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
