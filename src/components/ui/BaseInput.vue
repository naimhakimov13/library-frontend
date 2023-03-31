<script setup>
import {defineProps} from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const updateValue = (event) => {
  if (props.type === 'file') {
    emit('change', event.target.files[0])
  } else {
    emit('update:modelValue', event.target.value)
  }
}
</script>

<template>
  <div class="form-control">
    <label v-if="label" :for="label">{{ label }}</label>
    <input
        :id="label"
        :type="props.type"
        :disabled="disabled"
        class="form-control__field"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"/>
  </div>
</template>

<style scoped lang="scss">

.form-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;

  &__field {
    border: 1px solid var(--gray-400);
    border-radius: 8px;
    outline: none;
    padding: 10px;
    transition: .4s all;
    font-size: 14px;
    line-height: 20px;
    background: var(--gray-400);

    &:hover {
      border-color: var(--primary);
    }
  }
}

.dark {
  .form-control__field {
    color-scheme: dark;
  }
}
</style>
