<script setup>
import BaseSelect from '@/components/ui/BaseSelect.vue'
import {useUserStore} from "@/stores/userStore";

const noImage = 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
const userStore = useUserStore()

const lang = {
  ru: 'Русскый',
  tj: 'Точики'
}
// const languages = $i18n.availableLocales.map(key => ({
//   _id: key,
//   name: lang[key]
// }));
</script>

<template>
  <header>
    <BaseSelect v-model="lang[$i18n.locale]" :options="$i18n.availableLocales.map(key => ({
   _id: key,
   name: lang[key]
 }))"></BaseSelect>

    <div class="flex justify-between items-center gap-8">
      {{ userStore.user.name }}

      <img :src="userStore.user?.image?.url ?  userStore.user?.image?.url : noImage"
           @error="$event.target.src = noImage"
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
  width: calc(100% - 340px);
  background: var(--white);

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }
}

</style>
