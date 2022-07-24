import { v4 as uuidv4 } from "uuid";

const StatusTypes = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  READY: "ready",
};

const participantsListEmp = [
  "César Encina",
  "Edgar Ramos",
  "Daniela Pellegrini",
  "José Lara",
  "Jorge Montero",
  "Natalia Sandoval",
  "Ramiro Galvez",
  "Sebastián He",
  "Valentina Contreras",
  "Joaquin Couyoumdjian",
];

const participantsListAsis = [
  "Alejandro Mendez",
  "Cristian Mendoza",
  "Carlos Mujica",
  "Daniela Pellegrini",
  "Enrique Cruz",
  "Jorge Montero",
  "Valentina Contreras",
  "Diego Marin",
  "Julio Arismendi",
];

const participantsHash = {empleado: participantsListEmp, asistencia: participantsListAsis}

const getParticipants = async (team) => {
  return participantsHash[team]
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
