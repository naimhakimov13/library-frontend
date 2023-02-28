<script setup>
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";

import BaseInput from '@/components/ui/BaseInput.vue'
import {useCategoryStore} from "@/stores/categoryStore";
import {getCategoryById} from "@/services/http.service";

const name = ref(null)
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
  if (route.params?.id) {
    await categoryStore.update(route.params.id, name.value)
  } else {
    await categoryStore.create({name: name.value})
  }
  router.push('/category')
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

      <base-button type="submit">Сохранить</base-button>


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
