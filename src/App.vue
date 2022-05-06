<template>
  <Header></Header>
  <router-view/>
</template>

<script>
import Header from '@/components/template/HeaderComponent.vue'
export default {
  components: {
    Header,
  }
}
</script>

