<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  columns: {
    default: []
  },
  rows: {
    default: []
  },
  loading: {
    default: false
  },
  isShowIcon: {
    default: false
  },
  showButton: {
    default: false
  }
})

defineEmits({
  delete: {
    required: false
  },
  edit: {
    required: false
  }
})
</script>

<template>
  <div class="table">
    <table>
      <tr>
        <th v-for="row of columns">{{ row }}</th>
        <template v-if="isShowIcon">
          <th></th>
          <th></th>
        </template>
        <th v-if="showButton"></th>
      </tr>

      <tr v-for="item of rows">
        <td v-for="cell of item.cells" v-html="cell"></td>
        <template v-if="isShowIcon">
          <td><span class="icon icon-trash" @click="$emit('delete', item.cells[0])"></span></td>
          <td><span class="icon icon-edit" @click="$emit('edit', item.cells[0])"></span></td>
        </template>
        <td v-if="showButton">
          <base-button @click="$emit('edit', item.cells[0])">Выбрать</base-button>
        </td>
      </tr>
    </table>

    <Loader v-if="loading"/>

    <p v-if="!rows.length && !loading" class="text-center">{{ $t('table.empty_table') }}</p>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_form.scss";

.table {
  margin-top: 20px;
}

table {
  width: 100%;
  padding: 0;
  border-spacing: 0;
  background: var(--table-bg);

  th, td {
    text-align: left;
    padding: 15px;
    font-size: 14px;
    line-height: 14px;
    border-bottom: 1px solid var(--gray-400);
    color: var(--black);

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }

  tr:has(th) {
    font-size: 14px;
    line-height: 14px;
    background: var(--gray-400);
    text-transform: uppercase;
    font-size: 14px;
  }
}

</style>
