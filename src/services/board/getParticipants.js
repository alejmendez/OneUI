import { v4 as uuidv4 } from "uuid";

const StatusTypes = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  READY: "ready",
};

const participants = [
  "César Encina",
  "Alejandro Mendez",
  "Edgar Ramos",
  "Cristian Mendoza",
  "Carlos Mujica",
  "Daniela Pellegrini",
  "Enrique Cruz",
  "Joaquin Couyoumdjian",
  "José Lara",
  "Jorge Montero",
  "Jean Pierre Rodríguez",
  "Natalia Sandoval",
  "Ramiro Galvez",
  "Valentina Contreras",
  "Julio Arismendi",
];

const getParticipants = () => {
  return participants.map((name) => {
    return {
      id: uuidv4(),
      name,
      status: StatusTypes.PENDING,
      time: 0,
    };
  });
};

export { StatusTypes, getParticipants };
