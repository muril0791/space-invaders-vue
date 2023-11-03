<template>
  <div id="menu">
    <button v-if="!startGame" @click="startGame = true">Iniciar Jogo</button>
    <button v-if="startGame" @click="startGame = false">Reiniciar Jogo</button>
  </div>
</template>

<script>
export default {
    name:'my-menu',
  data() {
    return {
      startGame: false,
    };
  },
};
</script>

<style scoped>
#menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
