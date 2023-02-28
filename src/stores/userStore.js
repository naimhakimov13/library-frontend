import {defineStore} from "pinia/dist/pinia";
import {getUsers, signIn} from "@/services/http.service";
import {computed, ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false)
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const users = ref([])

  const rows = computed(() => {
    return users.value.map(item => ({
      cells: [
        item._id,
        item.name,
        item.email,
        item.phone,
        item.gender
      ]
    }))
  })

  async function login(body) {
    try {
      const data = await signIn(body)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      user.value = data.user
    } catch (err) {
      throw err
    }
  }

  async function get() {
    try {
      if (!users.value.length) {
        isLoading.value = true
        users.value = await getUsers()
        isLoading.value = false
      }
    } catch (err) {
      throw err
    }
  }

  return {
    isLoading, user, users, rows,
    get, login
  }
})
