<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <a style="cursor:pointer" :style="{'display': installBtn}" @click="installer()">
        <h1>Install!</h1>
      </a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      installBtn: "none",
      installer: undefined
    };
  },
  created() {
    let installPrompt;

    console.log('created');

    window.addEventListener("beforeinstallprompt", e => {

      console.log('beforeinstallprompt');

      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installer = () => {

      console.log('en installer');

      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === "accepted") {
          console.log("Install accepted!")
        } else {
          console.log("Install denied!")
        }
      });
    };
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
