<script setup>
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";

import BaseInput from '@/components/ui/BaseInput.vue'
import {useCategoryStore} from "@/stores/categoryStore";
import {getCategoryById} from "@/services/http.service";

const name = ref(null)
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const categoryStore = useCategoryStore()

onMounted(async () => {
  if (!categoryStore.categoryList.length) {
    await categoryStore.get()
  }
  if (route.params?.id) {
    const category = await getCategoryById(route.params.id)
    name.value = category.name
  }
})

async function onSubmit() {
  try {
    loading.value = true
    if (route.params?.id) {
      await categoryStore.update(route.params.id, name.value)
    } else {
      await categoryStore.create({name: name.value})
    }
    loading.value = false
    await router.push('/category')
  } catch (e) {
    throw e
  }
}

</script>

<template>
  <div class="create">
    <BaseButton @click="router.back()">Назад</BaseButton>

    <br>
    <br>
    <div class="page__title">{{ route.params?.id ? 'Редактировать' : 'Создать' }} категорий</div>


    <form class="create-form" @submit.prevent="onSubmit">
      <base-input
          v-model="name"
          label="Название"
          type="text"
          placeholder="Название"/>

      <base-button :loading="loading" type="submit">Сохранить</base-button>


    </form>
  </div>
</template>

<style lang="scss">
.create {
  &-form {
    margin-top: 20px;
    display: flex;
    max-width: 500px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
