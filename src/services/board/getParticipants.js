import { v4 as uuidv4 } from "uuid";

const StatusTypes = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  READY: "ready",
};

const participantsList = [
  "César Encina",
  "Alejandro Mendez",
  "Edgar Ramos",
  "Cristian Mendoza",
  "Carlos Mujica",
  "Daniela Pellegrini",
  "Enrique Cruz",
  "José Lara",
  "Jorge Montero",
  "Jean Pierre Rodríguez",
  "Natalia Sandoval",
  "Ramiro Galvez",
  "Sebastián He",
  "Valentina Contreras",
  "Diego Marin",
  "Julio Arismendi",
  "Joaquin Couyoumdjian",
];

const getParticipants = async () => {
  return participantsList
    .map((participant) => {
      return {
        id: uuidv4(),
        name: participant,
        status: StatusTypes.PENDING,
        time: 0,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export { StatusTypes, getParticipants };
