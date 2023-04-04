<template>
  <div>
    <component :is="layout"/>
    <ThemeToggle/>
  </div>
</template>

<script>
import main from '@/layouts/MainLayout.vue'
import empty from '@/layouts/EmptyLayout.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  },
  components: {
    ThemeToggle,
    empty,
    main
  }
}
</script>
