<script setup>
import BoardView from "./BoardView.vue";
const props = defineProps({
  team: {
    type: String,
    default: "xd",
    description: "Para destacar un participante en especifico",
  },
});
</script>

<template>
  <!-- Hack feo para que BoardView se rerenderee al cambiar de ruta ya que se estaba reutilizando el del
      Team anterior.  -->
  <BoardView :team="props.team" :key="props.team"/>
</template>
<style lang="scss">
</style>
