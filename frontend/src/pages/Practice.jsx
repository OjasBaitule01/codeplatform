import ProblemCard from '../components/ProblemCard';

const archive = [
  { title: 'Grid Explorer', description: 'Navigate a grid using BFS and scoring rules.', difficulty: 'Easy', tags: ['bfs', 'grid'] },
  { title: 'Schedule Optimizer', description: 'Create a priority schedule for contest tasks.', difficulty: 'Medium', tags: ['sorting', 'greedy'] },
  { title: 'Concurrent Compiler', description: 'Manage language execution and error handling in a simulation.', difficulty: 'Hard', tags: ['simulation', 'strings'] }
];

export default function Practice() {
  return (
    <div>
      <section className="paper-card">
        <h2>Practice Mode</h2>
        <p className="text-muted">Solve curated problems in archival mode with editorial solutions unlocked after you submit.</p>
      </section>

      <section className="dashboard-grid" style={{ marginTop: '24px' }}>
        {archive.map((problem) => (
          <ProblemCard key={problem.title} problem={problem} />
        ))}
      </section>
    </div>
  );
}
