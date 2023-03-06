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
@import "@/assets/styles/variables";

.main {
  display: flex;

  &-views {
    margin-top: 60px;
    width: 100%;
    margin-left: 300px;

  }
}
</style>
