<template>
    <div id="app">
        <h1>TOOD</h1>
        <to-do-list />
    </div>
</template>

<script>
    import ToDoList from "@/components/ToDoList";

    export default {
        components: {
            "to-do-list": ToDoList,
        },
        created() {
            document.body.style.backgroundColor = "#8C8A93";
        },
        name: "App",
    };
</script>

<style>
    @font-face {
        font-family: "Nimbus Sans Becker";
        src: local("Nimbus Sans Becker"),
            url(assets/fonts/Nimbus-Sans-Becker-PBla-Regular.otf)
                format("opentype");
    }
    h1 {
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
        color: #92b4a7;
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
