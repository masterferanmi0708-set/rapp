import "./OutputPanel.css";

const OutputPanel = ({ result, loading }) => {

  if (loading) {
    return (
      <div className="output-panel">
        <div className="loading-state">
          <div className="loading-dot"></div>
          <p>Analysing your lecture...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="output-panel">
        <div className="empty-state">
          <div className="empty-icon">◎</div>
          <p>Record or upload a lecture to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="output-panel">
      <div className="output-header">
        <div className="output-title">Lecture notes</div>
        <div className="output-sub">Updated just now</div>
      </div>

      <div className="summary-prose">{result.summary}</div>

      <div className="sec-label">Key concepts</div>
      <div className="concepts-grid">
        {result.concepts.map((concept, i) => (
          <div key={i} className="concept-chip">
            <span className="concept-num">0{i + 1}</span>
            {concept}
          </div>
        ))}
      </div>

      {/* visualization only shows if your mate's API sends one back */}
      {result.visualization && (
        <>
          <div className="sec-label">Visualization</div>
          <div className="viz-area">
            <img
              src={`data:image/png;base64,${result.visualization}`}
              alt="Generated visualization"
              className="viz-img"
            />
          </div>
        </>
      )}

      <div className="btns">
        <button className="btn-outline">Download notes</button>
        <button className="btn-fill">New session</button>
      </div>
    </div>
  );
};

export default OutputPanel;

