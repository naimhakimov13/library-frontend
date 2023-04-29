<script setup>
import {onMounted, reactive, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import {getBookById, removeFile, uploadFile} from "@/services/http.service"
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
  image: {},
  pdf: {}
})
const loading = ref(false)
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
    formBook.category_id = data.category_id?._id
    formBook.image = data.image
    formBook.pdf = data.pdf
  }
})

watch(formBook, (value, oldValue, onCleanup) => {
  console.log(value)
})

async function changePhoto(event, type) {
  formBook[type] = await uploadFile(event)
}

async function onSubmit() {
  try {
    loading.value = true
    if (route.params.id) {
      await bookStore.update(route.params.id, {
        ...formBook,
        category_id: formBook.category_id
      })

    } else {
      await bookStore.create({
        ...formBook,
        category_id: formBook.category_id
      })
    }
    loading.value = false
    await router.push('/books')
  } catch (e) {
    loading.value = false
    throw e
  }
}

async function deleteFile(key, id) {
  await removeFile(id)
  formBook[key] = {}
}
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

      <base-select
          v-model="formBook.category_id"
          :options="categoryStore.categoryList"
          label="Категориый"/>

      <div class="form-control__file">
        <base-input @change="changePhoto($event,'image')" label="Фото" type="file"/>

        <div v-if="formBook.image?.url" class="form-control__file-image">
          <a :href="formBook.image?.url" target="_blank">
            <img :src="formBook.image?.url" alt="">
          </a>

          <div class="form-control__file-close" @click="deleteFile('image' ,formBook.image.public_id)">&times;</div>
        </div>
      </div>

      <div class="form-control__file">
        <base-input @change="changePhoto($event, 'pdf')" label="Pdf" type="file"/>

        <div v-if="formBook.pdf?.url" class="form-control__file-image">
          <a :href="formBook.pdf?.url" target="_blank"><img :src="formBook.pdf?.url" alt=""></a>

          <div class="form-control__file-close" @click="deleteFile('pdf', formBook.pdf.public_id)">&times;</div>
        </div>
      </div>

      <base-button :loading="loading" type="submit">{{ route.params?.id ? 'Обновить' : 'Сохранить' }}</base-button>

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
