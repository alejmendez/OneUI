<script setup>
import { ref } from "vue";
import { intToTime } from "@/lib/time";
import { StatusTypes } from "@/services/board";

const props = defineProps({
  participant: {
    type: Object,
  },
});

const participantFirstName = ref(props.participant.name.split(" ").shift());
</script>
<template>
  <div class="participant rounded my-2">
    <font-awesome-icon :icon="['fas', 'user']" />
    <span class="participant-name ms-3">
      {{ participant.name }}
    </span>

    <template v-if="participant.status === StatusTypes.PENDING">
      <button
        class="btn btn-sm btn-primary float-end"
        title="Start"
        @click="$emit('startTime', participant)"
      >
        <font-awesome-icon :icon="['fas', 'play']" />
      </button>

      <button
        class="btn btn-sm btn-success float-end me-2"
        title="Ready"
        @click="$emit('setParticipantAsReady', participant)"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
      </button>
    </template>

    <template v-if="participant.status === StatusTypes.IN_PROGRESS">
      <button
        class="btn btn-sm btn-warning float-end"
        @click="$emit('setParticipantAsReady', participant)"
      >
        <font-awesome-icon :icon="['fas', 'stop']" />
      </button>
      <span class="badge bg-secondary float-end me-2 mt-1 badge-time">
        <div class="float-start" style="width: 12px">
          <font-awesome-icon
            class="spinner-hourglass"
            :icon="['fas', 'hourglass']"
          />
        </div>
        {{ intToTime(participant.time) }}
      </span>
    </template>

    <template v-if="participant.status === StatusTypes.READY">
      <button
        class="btn btn-sm btn-info float-end"
        title="Set as not ready"
        @click="$emit('setParticipantAsNotReady', participant)"
      >
        <font-awesome-icon :icon="['fas', 'undo']" />
      </button>
      <span
        class="badge bg-secondary float-end me-2 mt-1 badge-time"
        :title="participantFirstName + '\'s total time'"
      >
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        {{ intToTime(participant.time) }}
      </span>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.participant {
  padding: 12px 18px;
  transition: all 0.3s;

  &:hover {
    background-color: #11161e;
  }

  .btn-sm {
    padding: 0.18rem 0.5rem;
  }

  .participant-name {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .badge-time {
    width: 70px;
  }

  .spinner-hourglass {
    animation: rotation 2s infinite linear;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
