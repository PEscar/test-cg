<template>
  <div class="hello">
    <!-- <button @click="loadRandomUsers()">Consultar</button> -->

    <v-client-table ref="myTable" :data="filteredRandomUsers" :columns="columns" :options="tableOptions">

      <template slot="name" slot-scope="data">
        {{ data.row.name.first }} {{ data.row.name.last }}
      </template>

      <template slot="actions" slot-scope="data">
        <router-link :to="'/about?lat=' + data.row.location.coordinates.latitude + '&long=' + data.row.location.coordinates.longitude + '&cell=' + data.row.cell + '&phone=' + data.row.phone + '&streetNumber=' + data.row.location.street.number + '&streetName=' + data.row.location.street.name + '&city=' + data.row.location.city + '&email=' + data.row.email + '&thumb=' + data.row.picture.large + '&name=' + data.row.name.first + ' ' + data.row.name.last"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></router-link>
      </template>

      <template slot="gender" slot-scope="data">
        {{ data.row.gender == 'male' ? 'Hombre' : 'Mujer' }}
      </template>

    </v-client-table>

    <template>
      <button v-if="page > 1" @click="page = page - 1"><< {{ page - 1 }}</button>
      &nbsp;<label for="page">Página {{page}}</label>&nbsp;
      <button @click="page = page + 1">{{ page + 1 }} >></button>
    </template>

    <template>
      <h1>Filtros</h1>

      <div class="form-group mb-2">
        <label for="genderFilter">Género&nbsp;</label>
        <v-select id="genderFilter" @input="loadRandomUsers" ref="genderFilter" v-model="genderFilter" :options="genderFilterOptions" label="label" :reduce="option => option.value"></v-select>
      </div>

      <div class="form-group mb-2">
        <label for="nationalityFilter">Nacionalidad&nbsp;</label>
        <v-select id="nationalityFilter" @input="loadRandomUsers" ref="nationalityFilter" v-model="nationalityFilter" :options="nationalitiesFilterOptions" label="label" :reduce="option => option.value"></v-select>
      </div>

      <div class="form-group mb-2">
        <label for="ageFilter">Edad&nbsp;</label>
        <input type="number" class="" v-model="ageFilter" value=''>
      </div>

    </template>

  </div>
</template>

<script>
export default {
  name: 'Vista1',
  data(){
      return {
        genderFilter: '',
        genderFilterOptions: [{label: 'Todos', value: ''}, {label: 'Hombres', value: 'male'}, {label: 'Mujeres', value: 'female'}],

        nationalityFilter: '',
        nationalitiesFilterOptions: [{label: 'Todas', value: ''}, {label: 'AU', value: 'AU'}, {label: 'BR', value: 'BR'}, {label: 'CA', value: 'CA'}, {label: 'CH', value: 'CH'}, {label: 'DE', value: 'DE'}, {label: 'DK', value: 'DK'}, {label: 'ES', value: 'ES'}, {label: 'FI', value: 'FI'}, {label: 'FR', value: 'FR'}, {label: 'GB', value: 'GB'}, {label: 'IE', value: 'IE'}, {label: 'IR', value: 'IR'}, {label: 'NO', value: 'NO'}, {label: 'NL', value: 'NL'}, {label: 'NZ', value: 'NZ'}, {label: 'TR', value: 'TR'}, {label: 'US', value: 'US'}],

        ageFilter: '',

        randomUsers: [], // table rows
        filteredRandomUsers: [], // results filtered by age
        columns: ['gender', 'name', 'email', 'nat', 'dob.date', 'registered.date', 'dob.age', 'actions'], // table columns
        page: 1, // initial page
        results: 10, // page size

        tableOptions: { // table options
          sortable: ['gender', 'name', 'email', 'nat', 'dob.date', 'registered.date', 'dob.age'],
          headings: {
            gender: 'Género',
            name: 'Nombre',
            email: 'Email',
            nat: 'Nacionalidad',
            'dob.date': 'Fecha de Nacimiento',
            'dob.age': 'Edad',
            'registered.date': 'Fecha de Registro',
            actions: '',
          }
        },
      }
  },

  created: function(){
    this.loadRandomUsers()
  },

  watch:
  {
    page: function()
    {
      this.loadRandomUsers()
    },

    ageFilter: function(newAgeFilter)
    {
      if ( newAgeFilter )
      {
        this.filteredRandomUsers = this.randomUsers.filter(user => user.dob.age == newAgeFilter)
      }
      else
      {
        this.loadRandomUsers()
      }
    },

    randomUsers: function(newRandomUsers)
    {
      this.filteredRandomUsers = newRandomUsers
    }
  },

  methods:
  {
    loadRandomUsers: function ()
    {
      this.axios
        .get('https://randomuser.me/api?inc=gender,name,email,nat,dob,registered,picture,location,phone,cell&page=' + this.page + '&results=' + this.results + '&gender=' + this.genderFilter + '&nat=' + this.nationalityFilter)
        .then(response => (this.randomUsers = response.data.results))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.v-select {
  display: inline-block;
}

input[type='number'] {
  display: inline-block;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px
}

</style>

<style>
  .VueTables__search {
  display: none
}
</style>