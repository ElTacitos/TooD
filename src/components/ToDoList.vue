<template>
    <div>
        <div id="list">
            <li v-for="todo in todos" :key="todo">
                <tood-item
                    v-bind:tood-text="todo.text"
                    v-bind:isDisplayed="todo.status"
                    v-on:toodGet="toodReturn"
                    v-on:changeStatus="toodChangeStatus"
                />
            </li>
        </div>
        <input
            v-if="displayInput"
            v-model="newTood"
            v-on:keyup.enter="validate()"
            placeholder="New Tood"
        />
        <button v-if="displayButton" v-on:click="newItem(todos)">+</button>
    </div>
</template>

<script>
    import ToodItem from "@/components/ToodItem";

    export default {
        components: {
            "tood-item": ToodItem,
        },
        data() {
            const DEFAULT_NB = 3;

            return {
                displayButton: true,
                displayInput: false,
                nbNonCrossedTood: DEFAULT_NB,
                newTood: "",
                todos: [
                    { status: false, text: "Click on the plus to add a Tood" },
                    { status: false, text: "Click on a Tood to cross it" },
                    { status: false, text: "Long click a Tood to delete it" },
                ],
            };
        },
        methods: {
            newItem() {
                this.displayInput = true;
                this.displayButton = false;
            },
            saveTood() {
                localStorage.setItem("todos", JSON.stringify(this.todos));
            },
            toodChangeStatus(toodToChange) {
                const index = this.todos.findIndex(
                    (tood) => tood.text === toodToChange
                );
                if (index !== -1) {
                    this.todos[index] = {
                        status: !this.todos[index].status,
                        text: this.todos[index].text,
                    };
                    if (this.todos[index].status === true) {
                        const crossedTood = this.todos[index];
                        this.$delete(this.todos, index);
                        this.todos.push(crossedTood);
                        this.nbNonCrossedTood -= 1;
                    } else {
                        const notCrossed = this.todos[index];
                        this.$delete(this.todos, index);
                        this.todos.splice(this.nbNonCrossedTood, 0, notCrossed);
                        this.nbNonCrossedTood += 1;
                    }
                    this.saveTood();
                }
            },
            toodReturn(textToDel) {
                const index = this.todos.findIndex(
                    (tood) => tood.text === textToDel
                );
                if (!this.todos[index].status) {
                    this.nbNonCrossedTood -= 1;
                }

                this.$delete(
                    this.todos,
                    this.todos.findIndex((tood) => tood.text === textToDel)
                );
                this.saveTood();
            },
            validate() {
                this.todos.push({ status: false, text: this.newTood });
                this.newTood = "";
                this.displayInput = false;
                this.displayButton = true;
                this.saveTood();
            },
        },
        mounted() {
            if (localStorage.getItem("todos")) {
                try {
                    this.todos = JSON.parse(localStorage.getItem("todos"));
                    this.nbNonCrossedTood = 0;
                    this.todos.forEach((tood) => {
                        if (tood.status === false) {
                            this.nbNonCrossedTood += 1;
                        }
                    });
                    console.log(this.nbNonCrossedTood);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        name: "ToDoList",
    };
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    button {
        width: 30%;
        max-width: 200px;
        background-color: #acaab1;
        border-style: none;
        border-radius: 8px 8px 8px 8px;
        font-weight: bolder;
        font-size: 50px;
        color: #8c8a93;
    }
    input {
        width: 30%;
    }

    li {
        list-style-type: none;
    }

    #list {
        background-color: #b6cb9e;
        padding: 5% 5% 5% 5%;
        border-radius: 12px;
        margin-bottom: 21.44px;
        width: 75%;
        max-width: 500px;
        font-size: 30px;
    }

    input {
        background-color: transparent;
        border-style: solid;
        border-radius: 8px;
        width: 75%;
        max-width: 500px;
        font-size: 30px;
        color: #92b4a7;
    }

    input:focus {
        color: #92b4a7;
        border-color: #6c6c6c;
    }
</style>
