<script setup>
defineProps({
  modelValue: String,
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

function changeSelect(event) {
  console.log(event.target.value)
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="form-control">
    <label v-if="label">{{ label }}</label>
    <select @change="changeSelect">
      <option v-for="option in options" :key="option._id" :value="option._id">
        {{ typeof option === 'string' ? option : option.name}}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
select {
  border: 1px solid var(--gray-400);
  border-radius: 8px;
  background: var(--input-color);
  outline: none;
  padding: 8px;
  font-size: 14px;
  line-height: 20px;
}
</style>
