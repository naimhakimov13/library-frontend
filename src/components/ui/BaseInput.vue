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
