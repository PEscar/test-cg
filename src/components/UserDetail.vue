<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <img :src="this.$route.query.thumb">
      </div>

      <div class="col-md-6">
        <!-- <iframe src="https://www.google.es/maps/@41.371064,2.1548569,15z?hl=es"></iframe> -->
        <iframe width="256" height="256" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="mapUrl"></iframe>
      </div>

      <div class="col-md-3">
        Fav Si / No | Pending
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <p>Nombre: {{ this.$route.query.name }}</p>
        <p>Email: {{ this.$route.query.email }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <p>Ciudad: {{ this.$route.query.city }}</p>
        <p>Calle: {{ this.$route.query.streetName }}</p>
        <p>Número: {{ this.$route.query.streetNumber }}</p>
        <p>Teléfono: {{ this.$route.query.phone }}</p>
        <p>Móvil: {{ this.$route.query.cell }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  data(){
      return {}
  },

  computed:
  {
    mapUrl: function()
    {
      return 'http://maps.google.com/maps?ll=' + this.$route.query.lat +',' + this.$route.query.long + '&output=embed&z=14'
    }
  }
}
</script>

<style scoped>
.row {
  border:  solid 1px;
  padding: 10px;
  display: flex;
  align-items: center;
}
</style>