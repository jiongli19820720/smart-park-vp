import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
// import "./index.scss";
import { store } from "./store";

async function bootstrap() {
  if (
    import.meta.env.VITE_USE_MOCK === "true" ||
    (import.meta.env.VITE_USE_MOCK === undefined && import.meta.env.DEV)
  ) {
    await import("./mock");
  }

  createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

void bootstrap();
