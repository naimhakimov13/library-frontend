<script setup>
import {defineProps} from "vue";

defineProps({
  modelValue: String,
  label: String,

  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <div class="checkbox">
    <input
        :id="label"
        type="checkbox"
        :disabled="disabled"
        class="input"
        :value="modelValue"
        @input="updateValue"/>
    <label v-if="label" :for="label">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.checkbox {
  display: flex;
  align-items: center;
  gap: 12px;

  input {
    border: 1px solid $gray-400;

  }
}

input[type=checkbox] {
  background-color: var(--gray-400);
  border-color: var(--gray-400);
  width: 24px;
  height: 24px;
  border-radius: 5px;
  appearance: none;
  transition: .4s;
  background-position: top 1px left 1px;
}

input[type=checkbox]:checked {
  accent-color: var(--white);
  background-image: url("@/assets/svg/check.svg");
  background-repeat: no-repeat;
  background-color: var(--primary);
  border-color: var(--gray-400);
  background-position: top 1px left 1px;
}

</style>
