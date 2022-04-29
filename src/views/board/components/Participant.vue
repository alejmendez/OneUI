<script setup>
defineProps({
  participant: {
    type: Object,
  },
});
</script>
<template>
  <div class="participant border-bottom">
    <span class="participant-name">
      {{ participant.name }}
      {{ participant.tiempo !== 0 ? participant.tiempo : null}}
    </span>

    <button
      class="btn btn-sm btn-primary float-end"
      @click="$emit('setParticipantAsReady', participant)"
    >
      listo
    </button>
  </div>
</template>
<style lang="scss" scoped>
.participant {
  padding: 4px 6px;

  .participant-name {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
