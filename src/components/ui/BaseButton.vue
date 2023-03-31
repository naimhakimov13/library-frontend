<script setup>
import {defineProps} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  color: {
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :disabled="loading" :type="type" class="btn" :class="'btn-' + color">
    <slot/>
    <div v-if="loading" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 18px;

  &:hover {
    opacity: .8;
  }

  &-primary {
    background: $green;
  }

  &:disabled {
    opacity: .8;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
