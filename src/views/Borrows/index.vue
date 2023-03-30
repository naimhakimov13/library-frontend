<script setup>
import {onMounted, ref} from "vue";
import {getUsers} from "@/services/http.service";
import BaseInput  from '@/components/ui/BaseInput.vue'
const users = ref(null)
const loading = ref(false)

onMounted(async () => {
})

async function getByEmail(event) {
  users.value = await getUsers({email: event.target.value})

}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="page__title">Borrow книги</h1>

      <BaseInput @keyup.enter="getByEmail($event)" />

    </div>

    <pre>{{ users }}</pre>
  </div>
</template>

<style scoped>

</style>
