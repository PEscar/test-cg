<template>
  <div class="home">
    <UserDetail/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserDetail from '@/components/UserDetail.vue'

export default {
  name: 'home',
  components: {
    UserDetail
  }
}
</script>
