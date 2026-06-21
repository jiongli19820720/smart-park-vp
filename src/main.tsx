import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import "./index.scss";
import "./mock";

createRoot(document.getElementById("root")!).render(<App />);
