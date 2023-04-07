import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

import {getBooks, deleteBook, updateBookById, createBook} from "@/services/http.service";
import {toast} from "@/plugins/toast";

export const useBookStore = defineStore('books', () => {
  const books = ref({content: [], pageSize: 10, currentPage: 0, items: 0})
  const isLoading = ref(false)
  const isError = ref(null)

  const rows = computed(() => {
    return books.value.content.map(item => ({
      cells: [
        item._id,
        `<img src="${item?.image?.url ? item.image.url : '/src/assets/image/noimage.jpg'}"/>`,
        item.barcode,
        item.title,
        item.author,
        item.quantity,
        item.count_page,
        item.release_year
      ]
    }))
  })

  async function get() {
    try {
      if (!books.value.content.length) {
        isLoading.value = true
        books.value = await getBooks()
        isLoading.value = false
      }
    } catch (err) {
      isLoading.value = false
      throw err
    }
  }

  async function create(book) {
    try {
      const data = await createBook(book)
      books.value.content.push(data)
    } catch (err) {
      throw err
    }
  }

  async function remove(id) {
    try {
      await deleteBook(id)
      toast.success('Успешно удаленно')
      books.value.content = books.value.content.filter(book => book._id !== id)
    } catch (err) {
      throw err
    }
  }

  async function update(id, book) {
    try {
      const newBook = await updateBookById(id, book)
      const idx = books.value.content.findIndex(item => item._id === id)
      delete books.value.content[idx]
      books.value.content = [...books.value.content.filter(item => item), newBook]
      toast.success('Успешно обновлён')
    } catch (err) {
      throw err
    }
  }

  return {books, rows, isLoading, isError, get, create, remove, update}
})
