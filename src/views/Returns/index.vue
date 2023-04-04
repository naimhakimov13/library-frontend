<script setup>
import {computed, markRaw, ref} from "vue";
import {getReturnByUserId, getUsers} from "@/services/http.service";
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTable from "@/components/ui/BaseTable.vue";

const loading = ref(false)
const users = ref({content: []})
const showButton = ref(true)

async function changeHandler(event) {
  const inputValue = event.target.value
  loading.value = showButton.value = true
  users.value = await getUsers({email: inputValue})
  loading.value = false
}

const userData = computed(() => users.value.content.map(item => ({
  cells: [
    item._id,
    item.barcode,
    item.name,
    item.email,
    item.phone,
    item.gender
  ]
})))

const columns = ['ID', 'Штихкод', 'Имя', 'Email', 'Телефон', 'Пол']

async function chooseUser(event) {
  users.value.content = users.value.content.filter(user => user._id === event)
  showButton.value = false
  const returns = await getReturnByUserId(event)
  console.log(returns)
}

</script>

<template>
  <div>
    <h1 class="page__title">{{ $t('menu.return') }}</h1>

    <BaseInput placeholder="Поиск пользователя по email" @keyup.enter="changeHandler($event)"/>

    <Loader v-if="loading"/>


    <BaseTable
        :show-button="showButton"
        :columns="columns"
        :rows="userData"
        @edit="chooseUser($event)"
    ></BaseTable>
  </div>
</template>

<style scoped lang="scss">
:deep(.page__title) {
  margin-bottom: 20px;
}
</style>
