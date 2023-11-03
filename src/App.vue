<template>
  <div id="app">
    <Menu />
    <Game :startGame="startGame" />
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Game from './components/Game.vue';

export default {
  components: {
    Menu,
    Game,
  },
  data() {
    return {
      startGame: false,
    };
  },
};
</script>
