<script setup>
import {onMounted, reactive, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import vSelect from "vue-select";

import BaseInput from '@/components/ui/BaseInput.vue'
import {getBookById, uploadFile} from "@/services/http.service"
import {useCategoryStore} from "@/stores/categoryStore"
import {useBookStore} from "@/stores/bookStore"

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()
const bookStore = useBookStore()

let formBook = reactive({
  title: null,
  author: null,
  description: null,
  lang: 'ru',
  quantity: null,
  release_year: null,
  count_page: null,
  category_id: null,
  image: null,
  pdf: null
})

onMounted(async () => {
  await categoryStore.get()
  if (route.params.id) {
    const data = await getBookById(route.params.id)
    formBook.title = data.title
    formBook.author = data.author
    formBook.description = data.description
    formBook.lang = data.lang
    formBook.quantity = data.quantity
    formBook.release_year = data.release_year
    formBook.count_page = data.count_page
    formBook.category_id = data.category_id
    formBook.image = data.image
    formBook.pdf = data.pdf
  }
})

async function changePhoto(event, type) {
  formBook[type] = await uploadFile(event)
}

async function onSubmit() {
  if (route.params.id) {
    await bookStore.update(route.params.id, {
      ...formBook,
      category_id: formBook.category_id?._id
    })

  } else {
    await bookStore.create({
      ...formBook,
      category_id: formBook.category_id?._id
    })
  }

  router.push('/books')
}

watch(formBook.image, (value, oldValue, onCleanup) => {
  console.log(value)
})

</script>

<template>
  <div class="create">
    <BaseButton @click="router.back()">Назад</BaseButton>
    <br/>
    <br/>
    <div class="page__title">{{ route.params?.id ? 'Редактировать' : 'Создать' }} книгу</div>

    <form class="create-form" @submit.prevent="onSubmit">
      <base-input
          v-model="formBook.title"
          label="Название"
          type="text"
          placeholder="Название"/>

      <base-input
          v-model="formBook.author"
          label="Автор"
          type="text"
          placeholder="Автор"/>

      <base-input
          v-model="formBook.description"
          label="Описание"
          type="text"
          placeholder="Описание"/>

      <base-input
          v-model="formBook.quantity"
          label="Колиство в библотеке"
          placeholder="Колиство в библотеке"
          type="number"/>

      <base-input
          v-model="formBook.release_year"
          label="Год выпуска"
          placeholder="Год выпуска"
          type="number"/>

      <base-input
          v-model="formBook.count_page"
          label="Количество страниц"
          placeholder="Количество страниц"
          type="number"/>

      <v-select
          v-model="formBook.category_id"
          :options="categoryStore.categoryList"
          label="name"/>

      <base-input @change="changePhoto($event,'image')" label="Фото" type="file" />

      <base-input @change="changePhoto($event, 'pdf')" label="Pdf" type="file" />

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
