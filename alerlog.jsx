export default function AlertLog({ alerts, onClear }) {
  return (
    <div className="page-section">
      <div className="section-title">
        <h2>System Alerts</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span className="section-sub">{alerts.length} events</span>
          {alerts.length > 0 && (
            <button className="clear-btn" onClick={onClear}>Clear All</button>
          )}
        </div>
      </div>
      {alerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <p>No alerts yet. System is monitoring...</p>
        </div>
      ) : (
        <div className="alert-list">
          {alerts.map(a => (
            <div key={a.id} className={`alert-item alert-${a.type}`}>
              <div className="alert-dot" />
              <div className="alert-body">
                <div className="alert-msg">{a.msg}</div>
                <div className="alert-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
