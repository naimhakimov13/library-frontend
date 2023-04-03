<script setup>

import {onMounted} from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
    default: null,
  },
  labelKey: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

onMounted(() => {
  emit("update:modelValue", props.default);
})

function changeSelect(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="props.default" @change="changeSelect">
      <option v-for="option in options" :key="option._id" :value="option">{{ option.name }}</option>
    </select>
  </div>
</template>

