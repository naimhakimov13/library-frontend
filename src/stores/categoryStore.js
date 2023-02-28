import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategoryById
} from "@/services/http.service";
import {toast} from "@/plugins/toast";

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const isLoading = ref(false)

  const rows = computed(() => {
    return categoryList.value.map(item => ({
      cells: [
        item._id,
        item.name
      ]
    }))
  })

  async function get() {
    try {
      if (!categoryList.value.length) {
        isLoading.value = true
        categoryList.value = await getCategories()
        isLoading.value = false
      }
    } catch (err) {
      throw err
    }
  }

  async function create(category) {
    try {
      const data = await createCategory(category)
      categoryList.value = [...categoryList.value, data]
    } catch (err) {
      throw err
    }
  }

  async function update(id, name) {
    try {
      const newCategory = await updateCategoryById(id, name)
      console.log(name)
      const idx = categoryList.value.findIndex(item => item._id === id)
      categoryList.value[idx] = newCategory
      toast.success('Успешно обновлён')
    } catch (err) {
      throw err
    }
  }

  async function remove(id) {
    try {
      await deleteCategory(id)
      toast.success('Успешно удаленно')
      categoryList.value = categoryList.value.filter(item => item._id !== id)
    } catch (err) {
      throw err
    }
  }

  return {categoryList, rows, isLoading, get, create, remove, update}
})
