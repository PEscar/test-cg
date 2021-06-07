<template>
  <div class="hello">
    <!-- <button @click="loadRandomUsers()">Consultar</button> -->

    <v-client-table ref="myTable" :data="filteredRandomUsers" :columns="columns" :options="tableOptions">

      <template slot="name" slot-scope="data">
        {{ data.row.name.first }} {{ data.row.name.last }}
      </template>

    </v-client-table>

    <template>
      <button v-if="page > 1" @click="page = page - 1"><< {{ page - 1 }}</button>
      &nbsp;<label for="page">Página {{page}}</label>&nbsp;
      <button @click="page = page + 1">{{ page + 1 }} >></button>
    </template>

    <template>
      <h1>Filtros</h1>

      <label for="genderFilter">Género</label>
      <v-select id="genderFilter" @input="loadRandomUsers" ref="genderFilter" v-model="genderFilter" :options="genderFilterOptions" label="label" :reduce="option => option.value"></v-select>

      <label for="nationalityFilter">Nacionalidad</label>
      <v-select id="nationalityFilter" @input="loadRandomUsers" ref="nationalityFilter" v-model="nationalityFilter" :options="nationalitiesFilterOptions" label="label" :reduce="option => option.value"></v-select>

      <label for="ageFilter">Edad</label>
      <input type="number" class="form-control" v-model="ageFilter" value=''>

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
        columns: ['gender', 'name', 'email', 'nat', 'dob.date', 'registered.date', 'dob.age'], // table columns
        page: 1, // initial page
        results: 10, // page size

        tableOptions: { // table options
          headings: {
            gender: 'Género',
            name: 'Nombre',
            email: 'Email',
            nat: 'Nacionalidad',
            'dob.date': 'Fecha de Nacimiento',
            'registered.date': 'Fecha de Registro',
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
        .get('https://randomuser.me/api?page=' + this.page + '&results=' + this.results + '&gender=' + this.genderFilter + '&nat=' + this.nationalityFilter)
        .then(response => (this.randomUsers = response.data.results))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.VueTables__search {
  display: none
}
</style>
