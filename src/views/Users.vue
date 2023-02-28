<script setup>
import {useUserStore} from "@/stores/userStore";
import {onMounted} from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";

const columns = ['ID', 'Имя', 'Email', 'Телефон', 'Пол']

const userStore = useUserStore()

onMounted(async () => {
  await userStore.get()
})
</script>

<template>
  <div class="page">
    <div>
      <h1>Users</h1>

      <BaseTable
          :is-show-icon="true"
          :loading="userStore.isLoading"
          :columns="columns"
          :rows="userStore.rows">
      </BaseTable>
    </div>
  </div>
</template>

