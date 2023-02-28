<template>
  <component :is="layout">
<!--    <router-view/>-->
  </component>
</template>

<script>
import main from './layouts/MainLayout.vue'
import empty from './layouts/EmptyLayout.vue'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  },
  components: {
    empty,
    main
  }
}
</script>
