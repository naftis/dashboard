import { useDoubleTap } from "use-double-tap";

export const LiveCamera: React.FC<{ goBack: () => void }> = ({ goBack }) => {
  const bind = useDoubleTap(() => {
    goBack();
  });
  return (
    <>
      <div
        style={{
          height: "20vh",
          width: "20vw",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
        }}
        {...bind}
      ></div>

      <iframe
        title="Live-camera"
        src="https://flycam.roundshot.co/kansijaareena/"
        style={{ height: "100vh", width: "100vw", borderWidth: "0" }}
      ></iframe>
    </>
  );
};
