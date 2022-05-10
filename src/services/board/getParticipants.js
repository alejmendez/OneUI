import { v4 as uuidv4 } from "uuid";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const StatusTypes = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  READY: "ready",
};

const getParticipants = async () => {
  const db = getFirestore();
  const participantsSnapshot = await getDocs(collection(db, "participants"));
  const participantsList = participantsSnapshot.docs.map((doc) => doc.data());
  console.log(participantsList);
  const result = participantsList
    .map((participant) => {
      return {
        id: uuidv4(),
        name: participant.name,
        status: StatusTypes.PENDING,
        time: 0,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return result;
};

export { StatusTypes, getParticipants };
