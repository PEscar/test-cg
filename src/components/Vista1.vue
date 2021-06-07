<template>
  <div class="hello">
    <button @click="loadRandomUsers()">Consultar</button>

    {{ randomUsers[0] }}

<!--     <table>
      <thead>
        <th>Género</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Nacionalidad</th>
        <th>Fecha de Nacimiento</th>
        <th>Fecha de Registro</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5">asd</td>
        </tr>
      </tbody>
    </table> -->

    <v-client-table ref="myTable" :data="randomUsers" :columns="columns" :options="tableOptions">

      <template slot="name" slot-scope="data">
        {{ data.row.name.first }} {{ data.row.name.last }}
      </template>

    </v-client-table>

    <template>
      <h1>Filtros</h1>

      
      
    </template>

  </div>
</template>

<script>
export default {
  name: 'Vista1',
  data(){
      return {
          randomUsers: [],
          columns: ['gender', 'name', 'email', 'nat', 'dob.date', 'registered.date'],
          page: 1,
          results: 10,
          tableOptions: {
            // sortIcon: { base:'bi', up:'bi-sort-down', down:'bi-sort-up', is:'bi-sort' },
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
  methods:
  {
    loadRandomUsers: function ()
    {
      console.log('loadRandomUsers')
      this.axios
        .get('https://randomuser.me/api?page=' + this.page + '&results=' + this.results)
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
