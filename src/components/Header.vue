<script setup>

import BaseSelect from "@/components/ui/BaseSelect.vue";
import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore()
</script>

<template>
  <header>
    <BaseSelect v-model="$i18n.locale" :options="$i18n.availableLocales" ></BaseSelect>



    {{ userStore.user.name }}

    <img :src="userStore.user?.image?.url ?  userStore.user?.image?.url : userStore.noAvatar"
         @error="$event.target.src = userStore.noAvatar"
         alt="">
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

header {
  padding: 20px;
  border-bottom: 1px solid $gray-400;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 15px;
  top: 0;
  width: calc(100% - 340px);
  background: $white;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 50%;
  }
}
</style>
