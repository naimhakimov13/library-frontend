import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

import {getBooks, deleteBook, updateBookById, createBook} from "@/services/http.service";
import {toast} from "@/plugins/toast";

export const useBookStore = defineStore('books', () => {
  const books = ref([])
  const isLoading = ref(false)
  const isError = ref(null)

  const rows = computed(() => {
    return books.value.map(item => ({
      cells: [
        item._id,
        `<img src="${item.image ? ('http://localhost:3000/' + item.image) : '/src/assets/image/noimage.jpg'}"/>`,
        item.barcode,
        item.title,
        item.author,
        item.quantity,
        item.count_page,
        item.release_year
      ]
    }))
  })

  function getBookById(id) {
    return books.value.find(item => item._id === id)
  }

  async function get() {
    try {
      if (!books.value.length) {
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
      books.value = [...books.value, data]
    } catch (err) {
      throw err
    }
  }

  async function remove(id) {
    try {
      await deleteBook(id)
      toast.success('Успешно удаленно')
      books.value = books.value.filter(book => book._id !== id)
    } catch (err) {
      throw err
    }
  }

  async function update(id, book) {
    try {
      const newBook = await updateBookById(id, book)
      const idx = books.value.findIndex(item => item._id === id)
      books.value[idx] = newBook
      toast.success('Успешно обновлён')
    } catch (err) {
      throw err
    }
  }

  return {books, rows, isLoading, isError, get, create, remove, update}
})
