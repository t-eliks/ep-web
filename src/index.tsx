import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { user } from "redux/modules/user/reducer";
import { snackbar } from "./redux/modules/snackbar/reducer";
import { modal } from "./redux/modules/modal/reducer";
import { project } from "./redux/modules/project/reducer";
import { epic } from "./redux/modules/epic/reducer";
import { assignment } from "./redux/modules/assignment/reducer";
import { invitation } from "./redux/modules/invitation/reducer";
import { discussion } from "./redux/modules/discussion/reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const combinedReducers = combineReducers({
  user,
  snackbar,
  modal,
  epic,
  project,
  assignment,
  invitation,
  discussion,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export type AppState = ReturnType<typeof combinedReducers>;

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById("root")
);
