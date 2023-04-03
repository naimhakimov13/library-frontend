<script setup>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="main">
    <Aside/>
    <div class="main-views">
      <Header/>
      <div class="page">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  height: calc(100vh - 40px);

  &-views {
    margin-top: 60px;
    width: 100%;
    margin-left: 300px;
  }
}
</style>
