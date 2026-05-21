export default function ProblemCard({ problem }) {
  return (
    <article className="problem-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
        <h3>{problem.title}</h3>
        <span className={`badge ${problem.difficulty?.toLowerCase()}`}>{problem.difficulty}</span>
      </div>
      <p>{problem.description}</p>
      <div className="text-muted">Tags: {problem.tags?.join(', ') || 'None'}</div>
    </article>
  );
}
