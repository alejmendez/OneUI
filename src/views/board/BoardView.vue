<script setup>
import { reactive, computed } from "vue";
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
});

const participantsPendiente = computed(() => {
  return state.participants.filter(
    (participant) => participant.status === "pendiente"
  );
});
const participantsListos = computed(() => {
  return state.participants.filter(
    (participant) => participant.status === "listo"
  );
});

function participantListo(participant) {
  const index = state.participants.findIndex(
    (p) => p.name === participant.name
  );
  state.participants[index].status = "listo";

  console.log({ participantsPendiente });
  console.log({ participantsListos });
}
</script>

<template>
  <BasePageHeading title="Board">
    <template #extra></template>
  </BasePageHeading>

  <div class="content">
    <div class="row items-push">
      <div class="col-sm-12">
        <BaseBlock title="Pendientes" class="h-100 mb-0">
          <template
            v-for="participant in participantsPendiente"
            :key="participant.name"
          >
            <Participant
              :participant="participant"
              @participantListo="participantListo"
            />
          </template>
        </BaseBlock>
      </div>
      <div class="col-sm-12">
        <BaseBlock title="Listos" class="h-100 mb-0">
          <template
            v-for="participant in participantsListos"
            :key="participant.name"
          >
            <Participant :participant="participant" />
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
