<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Users Management</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/dashboard">Dashboard</b-nav-item>
          <!-- <b-nav-item to="/posts-manager">Posts Manager</b-nav-item> -->
          <!-- <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item> -->
          <b-nav-item to="/">Login</b-nav-item>
          <!-- <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
