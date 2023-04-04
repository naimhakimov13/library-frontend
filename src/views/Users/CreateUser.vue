<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import {getUserById, removeFile, uploadFile} from "@/services/http.service";
import {useUserStore} from "@/stores/userStore"

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const userId = route.params.id
const loading = ref(false)

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
  try {
    loading.value = true
    if (userId) {
      delete user.password
      await userStore.update(userId, user)
    } else {
      await userStore.create(user)
    }
    loading.value = false
    await router.push('/users')
  } catch (e) {
    loading.value = false
    throw e
  }
}

async function deleteFile(id) {
  try {
    await removeFile(id)
    user.image = null
  } catch (e) {
    throw e
  }
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


      <BaseSelect
          label="Роль"
          v-model="user.role"
          :options="['admin', 'student', 'teacher']"/>

      <BaseSelect
          label="Пол"
          v-model="user.gender"
          :options="['male', 'female']"/>

      <div class="form-control__file">
        <BaseInput
            type="file"
            label="Фото"
            @change="inputChange"
        />

        <div v-if="user.image?.url" class="form-control__file-image">
          <img :src="user.image?.url" alt="">

          <div class="form-control__file-close" @click="deleteFile(user.image.public_id)">&times;</div>
        </div>
      </div>

      <BaseButton
          :loading="loading"
          type="submit">
        {{ userId ? 'Обновить' : 'Создать' }}
      </BaseButton>

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
