import { getMoistureStatus } from "../utils/irrigationLogic";

export default function WaterUsageChart({ history, plants }) {
  const maxWater = Math.max(...history.map(h => h.waterUsed));
  const maxMoisture = 100;

  return (
    <div className="page-section">
      <div className="section-title">
        <h2>Water Analytics</h2>
        <span className="section-sub">24-hour overview</span>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Hourly Water Usage (L)</h3>
          <div className="bar-chart">
            {history.map((h, i) => (
              <div key={i} className="bar-col">
                <div
                  className="bar"
                  style={{ height: `${(h.waterUsed / maxWater) * 100}%` }}
                  title={`${h.waterUsed.toFixed(1)}L`}
                />
                {i % 4 === 0 && <div className="bar-label">{h.time}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Avg Moisture Trend (%)</h3>
          <div className="line-chart">
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="line-svg">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34c759" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#34c759" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points={history.map((h, i) =>
                  `${(i / (history.length - 1)) * 400},${120 - (h.avgMoisture / maxMoisture) * 110}`
                ).join(" ")}
                fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinejoin="round"
              />
              <polygon
                points={[
                  ...history.map((h, i) =>
                    `${(i / (history.length - 1)) * 400},${120 - (h.avgMoisture / maxMoisture) * 110}`
                  ),
                  "400,120", "0,120"
                ].join(" ")}
                fill="url(#lineGrad)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="plant-table-wrap">
        <h3>Current Sensor Readings</h3>
        <table className="plant-table">
          <thead>
            <tr>
              <th>Plant ID</th>
              <th>Name</th>
              <th>Moisture %</th>
              <th>Temperature</th>
              <th>Water Pump</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plants.map(p => {
              const st = getMoistureStatus(p.moisture);
              return (
                <tr key={p.id}>
                  <td className="td-id">{p.id}</td>
                  <td>{p.name}</td>
                  <td>
                    <div className="td-moisture">
                      <div className="mini-bar">
                        <div className="mini-fill" style={{ width: `${p.moisture}%`, background: st.color }} />
                      </div>
                      {p.moisture}%
                    </div>
                  </td>
                  <td>{p.temperature}°C</td>
                  <td>
                    <span className={`pump-tag ${p.pump ? "on" : "off"}`}>
                      {p.pump ? "ON" : "OFF"}
                    </span>
                  </td>
                  <td style={{ color: st.color }}>{st.emoji} {st.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
