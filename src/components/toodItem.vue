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

<script lang="ts">
    // Import LongPress from "vue-directive-long-press";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component({
        /*
         *Directives: {
         *  "long-press": LongPress,
         *},
         */

        props: {
            isDisplayed: {
                type: Boolean,
            },
            toodText: {
                type: String,
            },
        },
    })
    export default class ToodItem extends Vue {
        @Prop(Boolean) protected isDisplayed!: boolean;
        @Prop(String) protected toodText!: string;

        protected animated = false;
        protected longClick = false;

        protected onLongPressStart(): void {
            this.longClick = true;
            this.animated = true;
            const ANIMATION_TIMEOUT = 1000;
            setTimeout((): void => {
                this.animated = false;
            }, ANIMATION_TIMEOUT);
        }

        protected onLongPressStop(): void {
            if (this.longClick) {
                this.$emit("toodGet", this.toodText);
            }
            this.longClick = false;
        }

        protected toogleItem(): void {
            this.isDisplayed = !this.isDisplayed;
            this.$emit("changeStatus", this.toodText);
        }
    }
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
