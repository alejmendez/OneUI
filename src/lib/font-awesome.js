import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faStop,
  faCalendarCheck,
  faRandom,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faStop);
library.add(faCalendarCheck);
library.add(faRandom);
library.add(faUser);

export const initFontAwesome = (VueInstance) => {
  VueInstance.component("font-awesome-icon", FontAwesomeIcon);
};
