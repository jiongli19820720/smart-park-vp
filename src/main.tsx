import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
// import "./index.scss";
import "./mock";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
