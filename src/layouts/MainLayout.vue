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
  background: var(--white);

  &-views {
    margin-top: 65px;
    width: 100%;
    margin-left: 300px;
    height: calc(100vh - 65px);
  }
}
</style>
