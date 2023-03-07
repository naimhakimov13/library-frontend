import {defineStore} from "pinia/dist/pinia";
import {deleteUser, getUsers, signIn, signUp, updateUser} from "@/services/http.service";
import {computed, ref} from "vue";
import {toast} from "@/plugins/toast";

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false)
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const users = ref({content: [], pageSize: 10, currentPage: 0, items: 0})

  const rows = computed(() => {
    return users.value.content.map(item => ({
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
      if (!users.value.content.length) {
        isLoading.value = true
        users.value = await getUsers()
        isLoading.value = false
      }
    } catch (err) {
      throw err
    }
  }

  async function deleteUserById(id) {
    try {
      await deleteUser(id)
      toast.success('Успешно удаленно')
      users.value = users.value.filter(book => book._id !== id)
    } catch (err) {
      throw err
    }
  }

  async function update(id, body) {
    try {
      user.value = await updateUser(id, body)
      localStorage.setItem('user', JSON.stringify(user.value))
      toast.success('Успешно обновлён')
      users.value = []
      await get()
    } catch (e) {
      throw e
    }
  }

  async function create(user) {
    try {
      await signUp(user)
      users.value = []
      await get()
    } catch (e) {
      throw e
    }
  }

  return {
    isLoading, user, users, rows,
    get, login, deleteUserById, update, create
  }
})
