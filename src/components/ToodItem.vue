<template>
  <div :class="{'shake' : animated}" >
    <p v-long-press="1000" @long-press-start="onLongPressStart" @long-press-stop="onLongPressStop"
          v-bind:style="{color: crossedOff ? offColor : onColor,
          textDecoration: crossedOff ? 'line-through':'',
          color: '#6F9B8A',
          textAlign: 'center'}"
          v-on:click="toogleItem">
      {{toodText}}
    </p>
  </div>
</template>

<script>
import LongPress from 'vue-directive-long-press';
export default {
  name: "ToodItem",
  directives: {
    'long-press': LongPress
  },
  props:{
    toodText: String,
  },
  data(){
    return {
      crossedOff: false,
      onColor: 'black',
      offColor: 'gray',
      altText: 'click me',
      animated: false,
      isDisplayed: true,
      longClick: false,
    }
  },
  methods:{
    toogleItem: function (){
      this.crossedOff = ! this.crossedOff;
      console.log("test");
    },
    onLongPressStop: function (){
      console.log("long end");
      if(this.longClick) {
        this.$emit('toodGet', this.toodText);
      }
      this.longClick = false;
    },
    onLongPressStart: function (){
      console.log("Beg")
      this.longClick = true;
      this.animated = true
      setTimeout(() => {
        this.animated = false
      }, 1000)
    },
  }
}
</script>

<style scoped>
p{
  margin: 4% 0 4% 0;
  word-break: break-word;
}

div{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
