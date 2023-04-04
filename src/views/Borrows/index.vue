<script setup>
import {onMounted, ref} from "vue";
import {getUsers} from "@/services/http.service";
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTable from '@/components/ui/BaseTable.vue'

const users = ref(null)
const loading = ref(false)

onMounted(async () => {
})

async function getByEmail(event) {
  users.value = await getUsers({email: event.target.value})

  users.value = users.value.content.map(item => ({
    cells: [
      item._id,
      item.barcode,
      item.name,
      item.email,
      item.phone,
      item.gender
    ]
  }))
}

const columns = ['ID', 'Штихкод', 'Имя', 'Email', 'Телефон', 'Пол']


</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="page__title">Сдавать книги</h1>

      <BaseInput @keyup.enter="getByEmail($event)"/>
    </div>
  </div>
</template>

<style scoped>

</style>
