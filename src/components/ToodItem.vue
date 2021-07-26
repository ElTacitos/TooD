<template>
    <div :class="{ shake: animated }">
        <p
            v-long-press="1000"
            @long-press-start="onLongPressStart"
            @long-press-stop="onLongPressStop"
            v-bind:style="{
                textDecoration: isDisplayed ? 'line-through' : '',
                color: '#6F9B8A',
                textAlign: 'center',
            }"
            v-on:click="toogleItem"
        >
            {{ toodText }}
        </p>
    </div>
</template>

<script>
    import LongPress from "vue-directive-long-press";
    export default {
        name: "ToodItem",
        directives: {
            "long-press": LongPress,
        },
        props: {
            toodText: String,
            isDisplayed: Boolean,
        },
        data() {
            return {
                animated: false,
                longClick: false,
            };
        },
        methods: {
            toogleItem: function () {
                this.isDisplayed = !this.isDisplayed;
                this.$emit("changeStatus", this.toodText);
            },
            onLongPressStop: function () {
                if (this.longClick) {
                    this.$emit("toodGet", this.toodText);
                }
                this.longClick = false;
            },
            onLongPressStart: function () {
                console.log("Long beg");
                this.longClick = true;
                this.animated = true;
                setTimeout(() => {
                    this.animated = false;
                }, 1000);
            },
        },
    };
</script>

<style scoped>
    p {
        margin: 4% 0 4% 0;
        word-break: break-word;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .shake {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }

        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>
