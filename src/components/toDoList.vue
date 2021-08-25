<template>
    <div>
        <div id="list">
            <div v-for="todo in todos" :key="todo">
                <tood-item
                    v-bind:tood-text="todo.text"
                    v-bind:isDisplayed="todo.status"
                    v-on:toodGet="toodReturn"
                    v-on:changeStatus="toodChangeStatus"
                />
            </div>
        </div>
        <input
            v-if="displayInput"
            v-model="newTood"
            v-on:keyup.enter="validate()"
            placeholder="New Tood"
        />
        <button v-if="displayButton" v-on:click="newItem()">+</button>
    </div>
</template>

<script lang="ts">
    import { IItem } from "@/interface";
    import toodItem from "@/components/toodItem.vue";
    import { Component, Vue } from "vue-property-decorator";

    const DEFAULT_NB = 3;

    @Component({
        components: { toodItem },
    })
    export default class ToDoList extends Vue {
        protected displayButton = true;
        protected displayInput = false;
        protected nbNonCrossedTood = DEFAULT_NB;
        protected newTood = "";
        protected todos: IItem[] = [
            { status: false, text: "Click on the plus to add a Tood" },
            { status: false, text: "Click on a Tood to cross it" },
            { status: false, text: "Long click a Tood to delete it" },
        ];

        protected mounted(): void {
            if (localStorage.getItem("todos") !== null) {
                try {
                    const JSON_STRING = localStorage.getItem("todos");
                    if (JSON_STRING !== null) {
                        // Cast must be done only if control are made to ensure object content
                        this.todos = JSON.parse(JSON_STRING) as IItem[];
                    }
                    this.nbNonCrossedTood = 0;
                    this.todos.forEach((tood): void => {
                        if (!tood.status) {
                            this.nbNonCrossedTood += 1;
                        }
                    });
                    console.log(this.nbNonCrossedTood);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        protected newItem(): void {
            this.displayInput = true;
            this.displayButton = false;
        }

        protected saveTood(): void {
            localStorage.setItem("todos", JSON.stringify(this.todos));
        }

        protected toodChangeStatus(toodToChange: string): void {
            const INDEX = this.todos.findIndex(
                (tood): boolean => tood.text === toodToChange
            );
            if (INDEX !== -1) {
                this.todos[INDEX] = {
                    status: !this.todos[INDEX].status,
                    text: this.todos[INDEX].text,
                };
                if (this.todos[INDEX].status) {
                    const crossedTood = this.todos[INDEX];
                    this.$delete(this.todos, INDEX);
                    this.todos.push(crossedTood);
                    this.nbNonCrossedTood -= 1;
                } else {
                    const notCrossed = this.todos[INDEX];
                    this.$delete(this.todos, INDEX);
                    this.todos.splice(this.nbNonCrossedTood, 0, notCrossed);
                    this.nbNonCrossedTood += 1;
                }
                this.saveTood();
            }
        }

        protected toodReturn(textToDel: string): void {
            const INDEX = this.todos.findIndex(
                (tood): boolean => tood.text === textToDel
            );
            if (!this.todos[INDEX].status) {
                this.nbNonCrossedTood -= 1;
            }

            this.$delete(
                this.todos,
                this.todos.findIndex((tood): boolean => tood.text === textToDel)
            );
            this.saveTood();
        }

        protected validate(): void {
            this.todos.push({ status: false, text: this.newTood });
            this.newTood = "";
            this.displayInput = false;
            this.displayButton = true;
            this.nbNonCrossedTood += 1;
            this.saveTood();
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
        margin-bottom: 22px;
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
