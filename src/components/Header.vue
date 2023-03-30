<script setup>
import {useUserStore} from "@/stores/userStore";
const noImage = 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
const userStore = useUserStore()
</script>

<template>
  <header>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>
    </div>

    {{ userStore.user.name }}

    <img :src="userStore.user?.image?.url ?  userStore.user?.image?.url : noImage"
         @error="$event.target.src = noImage"
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
