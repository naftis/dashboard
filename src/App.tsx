import { useState } from "react";
import { useDoubleTap } from "use-double-tap";
import { BusStop } from "./components/BusStop";
import { LiveCamera } from "./components/LiveCamera";

const App = () => {
  const [selectedPage, setSelectedPage] = useState<"bus-stop" | "live-camera">(
    "bus-stop"
  );

  const bind = useDoubleTap(() => {
    setSelectedPage(selectedPage === "bus-stop" ? "live-camera" : "bus-stop");
  });

  const goBusStop = () => {
    setSelectedPage("bus-stop");
  };

  return (
    <div className="App" {...bind}>
      {selectedPage === "bus-stop" && <BusStop />}
      {selectedPage === "live-camera" && <LiveCamera goBack={goBusStop} />}
    </div>
  );
};

export default App;
