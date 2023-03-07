import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const useReturnBookStore = defineStore('returnBook', () => {
  const returnBooks = ref([])
})
