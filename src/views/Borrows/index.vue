<script setup>
import {computed, ref} from "vue";
import {getBorrowByUserId, getUsers} from "@/services/http.service";
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTable from "@/components/ui/BaseTable.vue";

const loading = ref(false)
const users = ref({content: []})
const showButton = ref(true)
const borrow = ref([])

async function changeHandler(event) {
  const inputValue = event.target.value
  loading.value = showButton.value = true
  users.value = await getUsers({email: inputValue})
  borrow.value = []
  loading.value = false
}

const columnsBook = ['ID', 'Штрихкод', 'Название', 'Автор', 'Дата релиза']

async function chooseUser(userId) {
  users.value.content = users.value.content.filter(user => user._id === userId)
  const borrowData = await getBorrowByUserId(userId)
  borrow.value = borrowData.map(item => item.book_id).map(item => ({
    cells: [
      item._id,
      item.barcode,
      item.title,
      item.author,
      item.release_year,
    ]
  }))
  showButton.value = false
}

</script>

<template>
  <div>
    <h1 class="page__title">{{ $t('menu.borrow') }}</h1>

    <BaseInput placeholder="Поиск пользователя по email" @keyup.enter="changeHandler($event)" type="search"/>

    <Loader v-if="loading"/>

    <div>
      <div class="user-list" v-if="!loading && users.content.length">
        <div class="user-list-item" v-for="user in users.content" @click="chooseUser(user._id)">
          {{ user.email }} &nbsp; ({{ user.name }})
        </div>
      </div>
    </div>

    <template v-if="borrow.length">
      <BaseTable
          :columns="columnsBook"
          :rows="borrow">
      </BaseTable>
    </template>
  </div>
</template>

<style scoped lang="scss">
:deep(.page__title) {
  margin-bottom: 20px;
}

.user-list {  border: 1px solid var(--gray-400);
  &-item {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background: var(--gray-300);
    }
  }
}
</style>
