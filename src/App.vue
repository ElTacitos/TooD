<template>
  <div id="app">
    <h1>TOOD</h1>
    <ToDoList/>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";


export default {
  name: 'App',
  components: {
    ToDoList
  },
  created() {
    document.body.style.backgroundColor = "#8C8A93";
  }
}
</script>

<style>
@font-face {
  font-family: "Nimbus Sans Becker";
  src: local("Nimbus Sans Becker"),
  url(assets/fonts/Nimbus-Sans-Becker-PBla-Regular.otf) format("opentype");
}
h1{
  font-family: "Nimbus Sans Becker", sans-serif;
  font-size: 400%;
  margin: 21px;
}
#app {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 150%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #92B4A7;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
