<template>
  <div>
    <div id="list">
      <li v-for="todo in todos" :key="todo">
        <tood-item v-bind:tood-text="todo" v-on:toodGet="toodReturn"/>
      </li>
    </div>
    <input v-if="displayInput" v-model="newTood" v-on:keyup.enter="validate()" placeholder="New Tood">
    <button v-if="displayButton" v-on:click="newItem(todos)">+</button>
  </div>
</template>

<script>
import ToodItem from "@/components/ToodItem";
export default {
  name: "ToDoList",
  components: {ToodItem},
  data() {
    return {
      todos: [
        'Click on the plus to add a Tood',
        'Click on a Tood to cross it',
        'Long click a Tood to delete it',
      ],
      newTood: '',
      displayInput: false,
      displayButton: true,
    }
  },

  methods: {
    newItem: function (){
      this.displayInput = true;
      this.displayButton = false;
    },
    validate: function (){
      this.todos.push(this.newTood);
      this.newTood = '';
      this.displayInput = false;
      this.displayButton = true;
    },
    toodReturn: function (toodToDel){
      console.log(toodToDel);
      console.log(this.todos.indexOf(toodToDel));
      this.$delete(this.todos, this.todos.indexOf(toodToDel));
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button{
  width: 30%;
  background-color: #ACAAB1;
  border-style: none;
  border-radius: 8px 8px 8px 8px;
  font-weight: bolder;
  color: #8C8A93;
}
input{
  width: 30%;
}

li{
  list-style-type: none;
}

#list{
  background-color: #B6CB9E;
  padding: 5% 5% 5% 5%;
  border-radius: 12px;
  margin-bottom: 21.440px;
  width: 75%;
}

input{
  background-color: transparent;
  border-style: solid;
  border-radius: 8px;
}
input{
  background-color: transparent;
  border-style: solid;
  border-radius: 4px;
  color: #6c6c6c;
}

input:focus{
  color:  #6c6c6c;
  border-color: #6c6c6c;
}

</style>
