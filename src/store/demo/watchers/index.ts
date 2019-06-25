
import * as App from "./app";
import * as Cutscenes from "./cutscenes";

export const sagas = [
  ...App.sagas,
  ...Cutscenes.sagas
];
