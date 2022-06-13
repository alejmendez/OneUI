import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faStop,
  faCheck,
  faUndo,
  faCalendarCheck,
  faRandom,
  faUser,
  faUsers,
  faHourglass,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faStop);
library.add(faCheck);
library.add(faUndo);
library.add(faCalendarCheck);
library.add(faRandom);
library.add(faUser);
library.add(faUsers);
library.add(faHourglass);
library.add(faClock);

export const initFontAwesome = (VueInstance) => {
  VueInstance.component("font-awesome-icon", FontAwesomeIcon);
};
