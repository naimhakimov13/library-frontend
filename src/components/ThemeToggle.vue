<script setup>
import {onMounted, ref} from "vue";
const isDark = ref(getDarkTheme())

onMounted(() => {
  if (isDark.value) {
    document.body.classList.add('dark')
    setLocalStorage(true)
    isDark.value = true
  } else {
    setLocalStorage(false)
  }
})

function toggle() {
  const dark = getDarkTheme()
  if (dark) {
    document.body.classList.remove('dark')
    setLocalStorage(false)
  } else {
    document.body.classList.add('dark')
    setLocalStorage(true)
  }
  isDark.value = !isDark.value
}

function getDarkTheme() {
  return JSON.parse(localStorage.getItem('dark'))
}

function setLocalStorage(value) {
  localStorage.setItem('dark', JSON.stringify(value))
}
</script>

<template>
  <div class="theme" @click="toggle">
    <span v-if="isDark" class="icon icon-sun"></span>
    <span v-else class="icon icon-moon"></span>
  </div>
</template>

<style scoped>
.theme {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>