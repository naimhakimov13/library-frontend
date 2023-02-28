<script setup>
import {defineProps} from "vue";

defineProps({
  type: {
    type: String,
    default: 'button'
  },
  color: {
    default: 'primary'
  }
})
</script>

<template>
  <button :type="type" class="btn" :class="'btn-' + color">
    <slot/>
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.btn {
  padding: 15px 25px;
  border-radius: 8px;
  color: $white;
  outline: none;
  border: none;

  &:hover  {
    opacity: .8;
  }

  &-primary {
    background: $green;
  }

}

</style>
