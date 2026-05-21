import ProblemCard from '../components/ProblemCard';

const sampleProblems = [
  { title: 'Booking Calculator', description: 'Solve a timed scheduling challenge with greedy scoring.', difficulty: 'Easy', tags: ['greedy', 'arrays'] },
  { title: 'Graph DFS Race', description: 'Analyze contest graphs and compute fastest paths under constraints.', difficulty: 'Medium', tags: ['graphs', 'dfs'] },
  { title: 'AI Output Validator', description: 'Score submissions with a custom judge and leaderboard priorities.', difficulty: 'Hard', tags: ['implementation', 'simulation'] }
];

export default function Home() {
  return (
    <div>
      <section className="hero-card">
        <h1>Build the next competitive coding arena.</h1>
        <p>Admins create contests, students submit code in multiple languages, and live verdicts update instantly. Practice problems, leaderboards, and editorials come together in one polished React experience.</p>
        <a className="btn-primary" href="/dashboard">Open Dashboard</a>
      </section>

      <section className="dashboard-grid">
        <div className="paper-card">
          <h2>Fast contests</h2>
          <p>Timer-based rounds with problem sets, scoring rules, and live leaderboards for every contest.</p>
        </div>
        <div className="paper-card">
          <h2>Practice archive</h2>
          <p>Explore problems sorted by difficulty, view model solutions, and sharpen your algorithm skills.</p>
        </div>
        <div className="paper-card">
          <h2>Real-time verdicts</h2>
          <p>Get instant feedback for AC/WA/TLE/CE statuses and track your contest performance.</p>
        </div>
      </section>

      <section className="paper-card" style={{ marginTop: '26px' }}>
        <h2>Featured problems</h2>
        <div className="dashboard-grid">
          {sampleProblems.map((problem) => (
            <ProblemCard key={problem.title} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  );
}
