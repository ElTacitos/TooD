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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
