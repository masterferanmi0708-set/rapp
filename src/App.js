import { useTheme } from "./context/ThemeContext";
import TopBar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import OutputPanel from "./components/OutputPanel";
import './App.css';
import useRecorder from "./hooks/useRecorder";
import { useState } from "react";


const App = () => {
  const { theme } = useTheme();
  const { isRecording, audioBlob, startRecording, stopRecording, handleUpload } = useRecorder();

  // this is where the API response from your mate's backend will live
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!audioBlob) return;
    setLoading(true);

    // later you'll send audioBlob to your mate's API here
    // for now we just simulate a response after 2 seconds
    setTimeout(() => {
      setResult({
        transcript: "…the resultant force on an object equals the rate of change of its momentum — so F = dp/dt, which simplifies to ma when mass is constant…",
        summary: "This session introduces Newton's laws of motion, momentum, and impulse. The lecturer walks through free body diagrams and applies F = ma to inclined plane problems involving friction coefficients.",
        concepts: ["Inertia and the first law", "F = ma — second law", "Action-reaction pairs", "Free body diagrams"],
        visualization: null, // your mate will send a base64 image string here when needed
      });
       setLoading(false);
    }, 2000);
  };


  return (
    <div className="app" data-theme={theme}>
      <TopBar />
      <div className="app-body">
        <Sidebar
          isRecording={isRecording}
          audioBlob={audioBlob}
          onStart={startRecording}
          onStop={stopRecording}
          onUpload={handleUpload}
          onSubmit={handleSubmit}
          loading={loading}
          transcript={result?.transcript}
        />
        <OutputPanel result={result} loading={loading} />
      </div>
    </div>
  );
}

export default App;
