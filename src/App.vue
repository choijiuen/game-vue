<template>
  <HeaderComponent></HeaderComponent>
  <router-view/>
</template>

<script>
import HeaderComponent from '@/components/template/HeaderComponent.vue'
export default {
  components: {
    HeaderComponent,
  }
}
</script>

