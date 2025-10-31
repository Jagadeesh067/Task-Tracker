export default function Insights({ insights, refresh }) {
  if (!insights) return <div>Loading insights...</div>;
  return (
    <div>
      <h3>Insights</h3>
      <div><strong>Summary:</strong> {insights.summary}</div>
      <div style={{ marginTop: 10 }}>
        <strong>Counts by priority:</strong>
        <ul>
          {Object.entries(insights.counts_by_priority || {}).map(([k,v]) => <li key={k}>{k}: {v}</li>)}
        </ul>
      </div>
      <div><strong>Due soon:</strong> {insights.due_soon_count}</div>
      <div><strong>Busiest day:</strong> {insights.busiest_day || '—'}</div>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
