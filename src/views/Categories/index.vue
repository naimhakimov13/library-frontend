<script setup>
import {onMounted, ref} from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import {useCategoryStore} from "@/stores/categoryStore";

const columns = ref(['ID', 'Название'])
const categoryStore = useCategoryStore()


onMounted(async () => {
  await categoryStore.get()
})

async function deleteBook(id) {
  await categoryStore.remove(id)
}

</script>


<template>
  <div>
    <div class="flex justify-between">
      <h1 class="page__title">Категории</h1>
      <BaseButton @click="$router.push('/category/create')">Создать категории</BaseButton>
    </div>
    <BaseTable
        :is-show-icon="true"
        :columns="columns"
        :rows="categoryStore.rows"
        :loading="categoryStore.isLoading"
        @delete="deleteBook"
        @edit="$router.push('/category/edit/' + $event)"
    />
  </div>
</template>
