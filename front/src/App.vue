<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/agents">View Agents</router-link>
      <router-link to="/agents/new">Add Agent</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  text-align: center;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 30px;
  background-color: #08ce54;
  padding: 15px 0;
  margin-bottom: 20px;
  border-radius: 8px;
}

.navbar > a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  transition: background 0.3s, color 0.3s;
  border-radius: 5px;
}

.navbar > a:hover {
  background-color: #42b983;
  color: #ffffff;
}

.navbar > a.active {
  background-color: #42b983;
  color: rgb(22, 25, 199);
}
</style>