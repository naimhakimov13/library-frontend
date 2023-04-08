<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

import {useBookStore} from "@/stores/bookStore";
import BaseTable from "@/components/ui/BaseTable.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const columns = ref(['ID', 'Штрихкод', 'Название', 'Автор', 'Количество', 'Количество страницы', 'Дата'])
const bookStore = useBookStore()
const router = useRouter()

onMounted(async () => {
  await bookStore.get()
})

async function deleteBook(id) {
  await bookStore.remove(id)
}

function editBook(id) {
  router.push('/books/edit/' + id)
}

</script>


<template>
  <div>
    <div class="flex justify-between">
      <h1 class="page__title">{{ $t('menu.book') }}</h1>
      <BaseButton color="primary" @click="router.push('/books/create')">{{ $t('book.create') }}</BaseButton>
    </div>
    <BaseTable
        :is-show-icon="true"
        :columns="columns"
        :rows="bookStore.rows"
        :loading="bookStore.isLoading"
        @delete="deleteBook"
        @edit="editBook"
    />
  </div>
</template>
