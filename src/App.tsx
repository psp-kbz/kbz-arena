import Router from "@/config/router";
import { usePreventZoom } from "@/hooks/use-prevent-zoom";
import "@/styles/arena.css";

function App() {
  usePreventZoom();

  return <Router />;
}

export default App;
