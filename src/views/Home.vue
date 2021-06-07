<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Vista1/>
  </div>
</template>

<script>
// @ is an alias to /src
import Vista1 from '@/components/Vista1.vue'

export default {
  name: 'home',
  components: {
    Vista1
  }
}
</script>
