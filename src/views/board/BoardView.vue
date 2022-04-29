<script setup>
import { reactive, watch, computed } from "vue";
import Participant from "./components/Participant.vue";

let state = reactive({
  participants: [
    {
      name: "Alejandro Mendez",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Carlos Mujica",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "César Encina",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Cristian Mendoza",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Daniela Pellegrini",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Enrique Cruz",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Jean Pierre Rodríguez",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Joaquin Couyoumdjian",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Jorge Montero",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "José Lara",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Julio Arismendi",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Natalia Sandoval",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Ramiro Galvez",
      status: "pendiente",
      tiempo: 0,
    },
    {
      name: "Valentina Contreras",
      status: "pendiente",
      tiempo: 0,
    },
  ],
   currentTime: 0,
   enabledTime: false,
   interval: null
});

const pendingParticipants = computed(() => {
  return state.participants.filter(
    (participant) => participant.status === "pendiente"
  );
});
const readyParticipants = computed(() => {
  return state.participants.filter(
    (participant) => participant.status === "listo"
  );
});

function enabledTime() {
  if(state.enabledTime) {
    state.interval = setInterval(() => {state.currentTime ++}, 1000);
  } else {
    if (state.interval !== null) clearInterval(state.interval);
  }
}

watch(() => ({ ...state.enabledTime }), enabledTime)

function setParticipantAsReady(participant) {
  const index = state.participants.findIndex(
    (p) => p.name === participant.name
  );
  state.participants[index].status = "listo";
  state.participants[index].tiempo = state.currentTime
  state.currentTime = 0;
  state.enabledTime = true;
  console.log({ pendingParticipants });
  console.log({ readyParticipants });
}
</script>

<template>
  <BasePageHeading title="Board">
    <template #extra></template>
  </BasePageHeading>

  <div class="content">
    <div class="row items-push">
      <div class="col-sm-12 align-items">
        <BaseBlock title="Tiempo" class="h-100 mb-0">
          <p>{{state.currentTime}}</p>
          <button @click="state.enabledTime ? state.enabledTime = false : state.enabledTime = true;">
            {{state.enabledTime ? "Detener" : "Comenzar"}}
          </button>
        </BaseBlock>
      </div>
      <div class="col-sm-12">
        <BaseBlock title="Pendientes" class="h-100 mb-0">
          <template
            v-for="participant in pendingParticipants"
            :key="participant.name"
          >
            <Participant
              :participant="participant"
              @setParticipantAsReady="setParticipantAsReady"
            />
          </template>
        </BaseBlock>
      </div>
      <div class="col-sm-12">
        <BaseBlock title="Listos" class="h-100 mb-0">
          <template
            v-for="participant in readyParticipants"
            :key="participant.name"
          >
            <Participant :participant="participant" />
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
