<template>
  <div>
    <div id="list">
      <li v-for="todo in todos" :key="todo">
        <tood-item v-bind:tood-text="todo.text" v-bind:isDisplayed="todo.status"
                   v-on:toodGet="toodReturn" v-on:changeStatus="toodChangeStatus"/>
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
        {text: 'Click on the plus to add a Tood', status: false},
        {text: 'Click on a Tood to cross it', status: false},
        {text: 'Long click a Tood to delete it', status: false},
      ],
      newTood: '',
      nbNonCrossedTood: 3,
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
      this.todos.push({text: this.newTood, status: false});
      this.newTood = '';
      this.displayInput = false;
      this.displayButton = true;
      this.saveTood();
    },
    toodReturn: function (textToDel){
      const index = this.todos.findIndex(tood => tood.text === textToDel);
      if(!this.todos[index].status)
        this.nbNonCrossedTood--;

      this.$delete(this.todos, this.todos.findIndex(tood => tood.text === textToDel));
      this.saveTood();
    },
    toodChangeStatus: function (toodToChange){
      const index = this.todos.findIndex(tood => tood.text === toodToChange);
      if(index !== -1){
        this.todos[index] = {text: this.todos[index].text, status: !this.todos[index].status};
        if(this.todos[index].status == true){
          const crossedTood = this.todos[index];
          this.$delete(this.todos, index);
          this.todos.push(crossedTood);
          this.nbNonCrossedTood--;
        }
        else{
          const notCrossed = this.todos[index];
          this.$delete(this.todos, index);
          this.todos.splice(this.nbNonCrossedTood, 0, notCrossed);
          this.nbNonCrossedTood++;
        }
        this.saveTood();
      }
    },
    saveTood(){
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  mounted() {
    if(localStorage.getItem('todos')){
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'))
        this.nbNonCrossedTood = 0;
        this.todos.forEach((tood) => {if(tood.status===false) {this.nbNonCrossedTood++;}});
        console.log(this.nbNonCrossedTood);
      } catch (e) {
        console.log(e);
      }
    }
  },
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
  max-width: 200px;
  background-color: #ACAAB1;
  border-style: none;
  border-radius: 8px 8px 8px 8px;
  font-weight: bolder;
  font-size: 50px;
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
  max-width: 500px;
  font-size: 30px;
}

input{
  background-color: transparent;
  border-style: solid;
  border-radius: 8px;
  width: 75%;
  max-width: 500px;
  font-size: 30px;
  color: #92B4A7;
}

input:focus{
  color: #92B4A7;
  border-color: #6c6c6c;
}

</style>
