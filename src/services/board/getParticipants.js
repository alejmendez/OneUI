import { v4 as uuidv4 } from "uuid";

const StatusTypes = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  READY: "ready",
};

const participants = [
  {
    id: uuidv4(),
    name: "Alejandro Mendez",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Carlos Mujica",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "César Encina",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Cristian Mendoza",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Daniela Pellegrini",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Enrique Cruz",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Jean Pierre Rodríguez",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Joaquin Couyoumdjian",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Jorge Montero",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "José Lara",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Julio Arismendi",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Natalia Sandoval",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Ramiro Galvez",
    status: StatusTypes.PENDING,
    time: 0,
  },
  {
    id: uuidv4(),
    name: "Valentina Contreras",
    status: StatusTypes.PENDING,
    time: 0,
  },
];

const getParticipants = () => {
  return participants;
};

export { StatusTypes, getParticipants };
