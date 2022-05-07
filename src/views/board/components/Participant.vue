<script setup>
import { intToTime } from "@/lib/time";
import { StatusTypes } from "@/services/board";

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
    </span>

    <template v-if="participant.status === StatusTypes.PENDING">
      <button
        class="btn btn-sm btn-primary float-end"
        v-if="participant.status === StatusTypes.PENDING"
        @click="$emit('startTime', participant)"
      >
        <font-awesome-icon :icon="['fas', 'play']" />
        Start
      </button>

      <button
        class="btn btn-sm btn-success float-end me-2"
        @click="$emit('setParticipantAsReady', participant)"
      >
        Ready
      </button>
    </template>

    <template v-if="participant.status === StatusTypes.IN_PROGRESS">
      <button
        class="btn btn-sm btn-warning float-end setParticipantAsReady"
        @click="$emit('setParticipantAsReady', participant)"
      >
        <font-awesome-icon :icon="['fas', 'stop']" />
        Stop [{{ intToTime(participant.time) }}]
      </button>
    </template>

    <template v-if="participant.status === StatusTypes.READY">
      <button
        class="btn btn-sm btn-info float-end"
        @click="$emit('setParticipantAsNotReady', participant)"
      >
        Set as not ready
      </button>
      <span class="badge bg-secondary float-end me-2 mt-1 badge-time">
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        {{ intToTime(participant.time) }}
      </span>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.participant {
  padding: 4px 6px;

  .participant-name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .setParticipantAsReady {
    width: 135px;
  }

  .badge-time {
    width: 65px;
  }
}
</style>
