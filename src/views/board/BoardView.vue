<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { intToTime } from "@/lib/time";
import { StatusTypes, getParticipants } from "@/services/board";
import Participant from "./components/Participant.vue";

let interval = null;
let timer = ref(0);
let currentParticipant = null;

const pendientesBlock = ref(null);

let state = reactive({
  participants: [],
});

const pendingParticipants = computed(() => {
  return state.participants.filter((participant) =>
    [StatusTypes.PENDING, StatusTypes.IN_PROGRESS].includes(participant.status)
  );
});

const readyParticipants = computed(() => {
  return state.participants.filter(
    (participant) => participant.status === StatusTypes.READY
  );
});

const totalTime = computed(() => {
  return intToTime(
    state.participants
      .filter((participant) => participant.status === StatusTypes.READY)
      .reduce((previousValue, participant) => {
        return previousValue + participant.time;
      }, 0)
  );
});

const initTimer = (initialTime = 0) => {
  timer.value = initialTime;
  interval = setInterval(() => {
    timer.value++;
    currentParticipant.time = timer.value;
  }, 1000);
};

const endTimer = () => {
  clearInterval(interval);
};

const getParticipant = (participantId) => {
  return state.participants.find(
    (participant) => participant.id === participantId
  );
};

function startTime(participant) {
  if (currentParticipant) {
    currentParticipant.status = StatusTypes.READY;
    endTimer();
  }
  currentParticipant = getParticipant(participant.id);
  currentParticipant.status = StatusTypes.IN_PROGRESS;
  initTimer(currentParticipant.time);
}

function setParticipantAsReady(participant) {
  participant = getParticipant(participant.id);
  participant.status = StatusTypes.READY;
  participant = null;
}

function setParticipantAsNotReady(participant) {
  currentParticipant = getParticipant(participant.id);
  currentParticipant.status = StatusTypes.PENDING;
  currentParticipant.time = 0;
}

function shuffleParticipants() {
  state.participants = state.participants.sort(() => Math.random() - 0.5);
}

onMounted(async () => {
  pendientesBlock.value.statusLoading();
  state.participants = await getParticipants();
  pendientesBlock.value.statusNormal();
});
</script>

<template>
  <BasePageHeading title="Board">
    <template #extra></template>
  </BasePageHeading>

  <div class="content">
    <div class="row items-push">
      <div class="col-md-6 col-sm-12">
        <BaseBlock class="h-100 mb-3" ref="pendientesBlock">
          <template #title>
            <font-awesome-icon :icon="['fas', 'users']" /> Participants ({{
              pendingParticipants.length
            }})
          </template>
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              @click="shuffleParticipants"
            >
              <font-awesome-icon :icon="['fas', 'random']" />
            </button>
          </template>
          <template
            v-for="participant in pendingParticipants"
            :key="participant.id"
          >
            <Participant
              :participant="participant"
              @startTime="startTime"
              @setParticipantAsReady="setParticipantAsReady"
            />
          </template>
        </BaseBlock>
      </div>
      <div class="col-md-6 col-sm-12">
        <BaseBlock class="h-100 mb-3">
          <template #title>
            <font-awesome-icon :icon="['fas', 'calendar-check']" /> Readies ({{
              readyParticipants.length
            }})
          </template>
          <template #subtitle>
            <small>Total time {{ totalTime }}</small>
          </template>
          <template
            v-for="participant in readyParticipants"
            :key="participant.id"
          >
            <Participant
              :participant="participant"
              @setParticipantAsNotReady="setParticipantAsNotReady"
            />
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
