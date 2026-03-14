import { getMoistureStatus } from "../utils/irrigationLogic";

export default function PlantCard({ plant, onToggle, autoMode }) {
  const status = getMoistureStatus(plant.moisture);
  const pct = Math.min(100, plant.moisture);

  return (
    <div className={`plant-card ${plant.pump ? "pump-on" : ""}`}>
      <div className="plant-header">
        <div>
          <div className="plant-id">{plant.id}</div>
          <div className="plant-name">{plant.name}</div>
          <div className="plant-type">{plant.type} · {plant.zone}</div>
        </div>
        <div className={`pump-badge ${plant.pump ? "on" : "off"}`}>
          {plant.pump ? " ON" : "○ OFF"}
        </div>
      </div>

      <div className="moisture-ring-wrap">
        <svg viewBox="0 0 80 80" className="moisture-ring">
          <circle cx="40" cy="40" r="32" className="ring-bg" />
          <circle
            cx="40" cy="40" r="32"
            className="ring-fill"
            stroke={status.color}
            strokeDasharray={`${2 * Math.PI * 32 * pct / 100} ${2 * Math.PI * 32}`}
            strokeDashoffset="0"
            transform="rotate(-90 40 40)"
          />
          <text x="40" y="37" textAnchor="middle" className="ring-pct">{plant.moisture}%</text>
          <text x="40" y="50" textAnchor="middle" className="ring-label">moisture</text>
        </svg>
      </div>

      <div className="plant-stats">
        <div className="pstat">
          <span className="pstat-icon"></span>
          <span>{plant.temperature}°C</span>
        </div>
        <div className="pstat" style={{ color: status.color }}>
          <span>{status.emoji}</span>
          <span>{status.label}</span>
        </div>
        <div className="pstat">
          <span className="pstat-icon"></span>
          <span>≥{plant.threshold}%</span>
        </div>
      </div>

      <div className="moisture-bar-wrap">
        <div className="moisture-bar">
          <div className="moisture-fill" style={{ width: `${pct}%`, background: status.color }} />
        </div>
      </div>

      <button
        className={`pump-btn ${plant.pump ? "active" : ""}`}
        onClick={onToggle}
        disabled={autoMode}
        title={autoMode ? "Disable Auto Mode to control manually" : ""}
      >
        {autoMode ? " Auto Controlled" : plant.pump ? " Stop Pump" : " Start Pump"}
      </button>
    </div>
  );
}
