<script setup>
import BaseSelect from '@/components/ui/BaseSelect.vue'
import {useUserStore} from "@/stores/userStore";
import { useI18n } from 'vue-i18n'
import {watch} from "vue";

const userStore = useUserStore()

const lang = {
  ru: 'Русскый',
  tj: 'Точики'
}

const i18n = useI18n()

watch(i18n.locale, (value, oldValue, onCleanup) => {
  localStorage.setItem('lang', value)
})

</script>

<template>
  <header>
    <BaseSelect v-model="i18n.locale.value"
                :options="$i18n.availableLocales.map(key => ({_id: key,name: lang[key]}))" />

    <div class="flex justify-between items-center gap-8">
      {{ userStore.user.name }}

      <img :src="userStore.user?.image?.url ?  userStore.user?.image?.url : userStore.noAvatar"
           @error="$event.target.src = userStore.noAvatar"
           alt="">
    </div>
  </header>
</template>

<style lang="scss" scoped>

header {
  padding: 19px;
  border-bottom: 1px solid var(--gray-400);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 15px;
  top: 0;
  width: calc(100% - 338px);
  background: var(--white);

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }

  :deep(select) {
    padding: 3px;
  }
}
</style>
