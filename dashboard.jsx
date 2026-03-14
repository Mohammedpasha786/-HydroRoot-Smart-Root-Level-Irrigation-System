import PlantCard from "./PlantCard";
import { getMoistureStatus } from "../utils/irrigationLogic";

export default function Dashboard({ plants, activePlants, avgMoisture, totalWaterSaved, togglePump, autoMode }) {
  const criticalPlants = plants.filter(p => p.moisture < 25);

  return (
    <div className="dashboard">
      {criticalPlants.length > 0 && (
        <div className="alert-banner">
          ⚠️ {criticalPlants.length} plant{criticalPlants.length > 1 ? "s" : ""} critically low on moisture:{" "}
          {criticalPlants.map(p => p.name).join(", ")}
        </div>
      )}

      <div className="stat-grid">
        <StatCard icon="💧" label="Avg Soil Moisture" value={`${avgMoisture}%`} sub="Across all zones" color="blue" />
        <StatCard icon="⚡" label="Pumps Active" value={`${activePlants} / ${plants.length}`} sub="Running now" color="green" />
        <StatCard icon="🌡️" label="Avg Temperature" value={`${(plants.reduce((a,p)=>a+p.temperature,0)/plants.length).toFixed(1)}°C`} sub="Sensor average" color="orange" />
        <StatCard icon="💰" label="Water Saved" value={`${totalWaterSaved} L`} sub="vs. schedule irrigation" color="teal" />
      </div>

      <div className="section-title">
        <h2>Plant Stations</h2>
        <span className="section-sub">Real-time root sensor data</span>
      </div>

      <div className="plant-grid">
        {plants.map(p => (
          <PlantCard key={p.id} plant={p} onToggle={() => togglePump(p.id)} autoMode={autoMode} />
        ))}
      </div>

      <div className="zone-summary">
        {["Zone 1", "Zone 2", "Zone 3"].map(zone => {
          const zPlants = plants.filter(p => p.zone === zone);
          const avg = (zPlants.reduce((a, p) => a + p.moisture, 0) / zPlants.length).toFixed(0);
          const status = getMoistureStatus(Number(avg));
          return (
            <div key={zone} className="zone-card">
              <div className="zone-name">{zone}</div>
              <div className="zone-moisture" style={{ color: status.color }}>{avg}% {status.emoji}</div>
              <div className="zone-label" style={{ color: status.color }}>{status.label}</div>
              <div className="zone-plants">{zPlants.length} stations</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-sub">{sub}</div>
      </div>
    </div>
  );
}
