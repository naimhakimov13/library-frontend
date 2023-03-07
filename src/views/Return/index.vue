<script setup>
import {onMounted, ref} from "vue";
import {getReturnByUserId} from "@/services/http.service";

const user = ref(null)

onMounted(async () => {
const data = await getReturnByUserId('6406e6be07cd26cc8b4758ad')
  console.log(data)
})
</script>

<template>
  <div>
    <h1 class="page__title">Возврат книги</h1>
  </div>
</template>

<style scoped>

</style>
