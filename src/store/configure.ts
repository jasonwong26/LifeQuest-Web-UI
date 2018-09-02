import { Store } from "redux";
import { History } from "history";
import { ApplicationState } from "./root";

let configureStore: (history: History)=> Store<ApplicationState>;

if (process.env.NODE_ENV === "production") {
  configureStore = require("./configure.prod").default;
} else {
  configureStore = require("./configure.dev").default;
}

export { configureStore };
