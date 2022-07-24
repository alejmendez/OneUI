<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { intToTime, getMinutesfromInt, getSecondsfromInt, getTwoDigitNumber} from "@/lib/time";
import { StatusTypes, getParticipants } from "@/services/board";
import Participant from "./components/Participant.vue";

const props = defineProps({
  team: {
    type: String,
    description: "Para destacar un participante en especifico",
  },
});

// Para el tiempo que lleva actualmente el participante
let timer = ref(0);
let intervalTime = null;
// Tiempo sugerido que tendrá cada participante en su turno
let countdown = ref(90);
// Tiempo restante que le queda al participante actual, se reinicia
// al empezar el turno de otro participante
let timeLeft = ref(90);
let intervalTimeLeft = null;

const pendientesBlock = ref(null);

let state = reactive({
  participants: [],
  currentParticipant: null,
  editingSuggestedTime: true,
  totalTimeEdit: null, // "mm:ss"
  totalSecondsEdit: null, // cantidad de segundos en edición
  minEditTime: null, // string minutes edición
  secEditTime: null, // string seconds edición
});

const pendingParticipants = computed(() => {
  return state.participants.filter((participant) =>
    [StatusTypes.PENDING, StatusTypes.IN_PROGRESS].includes(participant.status) &&
    participant.id != state.currentParticipant?.id
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
  // Tiempo actual
  timer.value = initialTime;
  intervalTime = setInterval(() => {
    timer.value++;
    state.currentParticipant.time = timer.value;
  }, 1000);

  // Tiempo restante del participante actual
  timeLeft.value = countdown.value
  intervalTimeLeft = setInterval(() => {
    timeLeft.value--;
  }, 1000);
};

const endTimer = () => {
  clearInterval(intervalTime);
  clearInterval(intervalTimeLeft);
};

const getParticipant = (participantId) => {
  return state.participants.find(
    (participant) => participant.id === participantId
  );
};

function startTime(participant) {
  if (state.currentParticipant) {
    state.currentParticipant.status = StatusTypes.READY;
    endTimer();
  }
  state.currentParticipant = getParticipant(participant.id);
  state.currentParticipant.status = StatusTypes.IN_PROGRESS;
  initTimer(state.currentParticipant.time);
}

function setParticipantAsReady(participant) {
  participant = getParticipant(participant.id);
  participant.status = StatusTypes.READY;
  state.currentParticipant = null;
  endTimer();
}

function setParticipantAsNotReady(participant) {
  participant = getParticipant(participant.id);
  participant.status = StatusTypes.PENDING;
  participant.time = 0;
}

function shuffleParticipants() {
  state.participants = state.participants.sort(() => Math.random() - 0.5);
}

function toggleTimeEdit() {
  console.log(state.editingSuggestedTime)
  state.editingSuggestedTime = !state.editingSuggestedTime;
  console.log(state.editingSuggestedTime)
}

// cambiar a watcher de los dos inputs
function changeCountdown(e, attr) {
  // Para formatear el input a que sea de maximo 60 y minimo 0
  if (attr == "min") {
    state.minEditTime = getTwoDigitNumber(state.minEditTime);
  } else {
    state.secEditTime = getTwoDigitNumber(state.secEditTime);
  }
  // Actualizamos el tiempo compuesto de edición
  state.totalSecondsEdit = parseInt(state.minEditTime) * 60 + parseInt(state.secEditTime);
  state.totalTimeEdit = intToTime(state.totalSecondsEdit);
  // Actualizamos el tiempo sugerido por participante
  countdown.value = (state.totalSecondsEdit)/state.participants.length;
}

onMounted(async () => {
  pendientesBlock.value.statusLoading();
  state.participants = await getParticipants(props.team);
  pendientesBlock.value.statusNormal();
  state.totalSecondsEdit = countdown.value * state.participants.length;
  state.totalTimeEdit = intToTime(state.totalSecondsEdit); // "MM:SS"
  state.minEditTime = getMinutesfromInt(state.totalSecondsEdit); // "MM"
  state.secEditTime = getSecondsfromInt(state.totalSecondsEdit); // "SS"
});
</script>

<template>
  <BaseBlock class="h-100 mb-0"
    ref="baseClock"
    :headerClass="'border-bottom'"
    :headerStyle="{'border-bottom-color': '#98a3b47d !important'}">
    <template #title>
      <div class="content d-flex justify-content-between mb-0 pb-0 pt-0">
        <div>
          Tiempo sugerido por participante {{ intToTime(countdown) }}
        </div>
        <div>
          <button type="button" class="btn-block-option" @click="toggleTimeEdit">
            <font-awesome-icon :icon="['fas', 'pencil']" />
          </button>
        </div>
      </div>
    </template>
    <template #content v-if="state.editingSuggestedTime">
      <div class="d-flex p-4 justify-content-center align-items-center flex-column block-header-default">
        <div>
          <input type="number" min="0" step="1" max="60" class="p-0"
            @input="changeCountdown($event, 'min')"
            v-model="state.minEditTime"/>
          (M):
          <input type="number" min="0" max="59" step="1" class="p-0"
            @input="changeCountdown($event, 'sec')"
            v-model="state.secEditTime"/>
          (s)
        </div>
        <p class="mb-0 mt-1">Cantidad de participantes: {{state.participants.length}} </p>
      </div>
    </template>
    <template #content v-else>
    </template>
  </BaseBlock>
  <BaseBlock v-if="state.currentParticipant !== null"
    class="h-100 mb-3 border border-secundary"
    ref="ActiveParticipantBlock"
    :rounded="false">
    <template #content>
      <div class="content">
        <Participant :participant="state.currentParticipant" :highlight="true" @startTime="startTime"
          @setParticipantAsReady="setParticipantAsReady" />
        <div class="d-flex p-4 justify-content-center">
          <div class="badge d-flex flex-row justify-content-between rounded-1 fs-1"
            :class="timeLeft < 0 ? 'bg-danger bg-gradient' : 'bg-secondary'">
            <div class="d-flex align-items-center justify-content-center m-2">
              <div class="d-flex">
                <font-awesome-icon :icon="['fas', 'hourglass']" class="spinner-hourglass" />
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center m-2">
              {{ intToTime(timeLeft) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseBlock>

  <div class="content">
    <div class="row items-push">
      <div class="col-md-6 col-sm-12">
        <BaseBlock class="h-100 mb-3" ref="pendientesBlock">
          <template #title>
            <font-awesome-icon :icon="['fas', 'clock']" /> Participantes pendientes ({{pendingParticipants.length}})
          </template>
          <template #options>
            <button type="button" class="btn-block-option" @click="shuffleParticipants">
              <font-awesome-icon :icon="['fas', 'random']" />
            </button>
          </template>
          <template v-for="participant in pendingParticipants" :key="participant.id">
            <Participant :participant="participant" @startTime="startTime"
              @setParticipantAsReady="setParticipantAsReady" />
          </template>
        </BaseBlock>
      </div>
      <div class="col-md-6 col-sm-12">
        <BaseBlock class="h-100 mb-3">
          <template #title>
            <font-awesome-icon :icon="['fas', 'calendar-check']" /> Listos ({{
                readyParticipants.length
            }})
          </template>
          <template #subtitle>
            <small>Tiempo total {{ totalTime }}</small>
          </template>
          <template v-for="participant in readyParticipants" :key="participant.id">
            <Participant :participant="participant" @setParticipantAsNotReady="setParticipantAsNotReady" />
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.badge-time {
  width: 1000px;
}

.spinner-hourglass {
  animation: rotation 2s infinite linear;
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
