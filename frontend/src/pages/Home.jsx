import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';

const sampleProblems = [
  { title: 'Booking Calculator', description: 'Solve a timed scheduling challenge with greedy scoring.', difficulty: 'Easy', tags: ['greedy', 'arrays'] },
  { title: 'Graph DFS Race', description: 'Analyze contest graphs and compute fastest paths under constraints.', difficulty: 'Medium', tags: ['graphs', 'dfs'] },
  { title: 'AI Output Validator', description: 'Score submissions with a custom judge and leaderboard priorities.', difficulty: 'Hard', tags: ['implementation', 'simulation'] }
];

export default function Home() {
  const [contest, setContest] = useState({ title: '', description: '', startTime: '', endTime: '' });
  const [problem, setProblem] = useState({ title: '', description: '', difficulty: 'Easy', tags: '' });
  const [createdContests, setCreatedContests] = useState([]);
  const [createdProblems, setCreatedProblems] = useState([]);

  const handleCreateContest = () => {
    if (!contest.title || !contest.description || !contest.startTime || !contest.endTime) return;
    setCreatedContests([contest, ...createdContests]);
    setContest({ title: '', description: '', startTime: '', endTime: '' });
  };

  const handleCreateProblem = () => {
    if (!problem.title || !problem.description) return;
    setCreatedProblems([{
      ...problem,
      tags: problem.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    }, ...createdProblems]);
    setProblem({ title: '', description: '', difficulty: 'Easy', tags: '' });
  };

  return (
    <div>
      <section className="hero-card">
        <h1>Build the next competitive coding arena.</h1>
        <p>Admins create contests, students submit code in multiple languages, and live verdicts update instantly. Practice problems, leaderboards, and editorials come together in one polished React experience.</p>
        <Link className="btn-primary" to="/dashboard">Open Dashboard</Link>
      </section>

      <section className="paper-card" style={{ marginTop: '24px' }}>
        <h2>Create Contest</h2>
        <div className="form-field">
          <label>Contest Title</label>
          <input value={contest.title} onChange={(event) => setContest({ ...contest, title: event.target.value })} placeholder="Enter contest title" />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea value={contest.description} onChange={(event) => setContest({ ...contest, description: event.target.value })} placeholder="Enter contest description" />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Start Time</label>
            <input type="datetime-local" value={contest.startTime} onChange={(event) => setContest({ ...contest, startTime: event.target.value })} />
          </div>
          <div className="form-field">
            <label>End Time</label>
            <input type="datetime-local" value={contest.endTime} onChange={(event) => setContest({ ...contest, endTime: event.target.value })} />
          </div>
        </div>
        <button className="btn-primary" onClick={handleCreateContest}>Add Contest</button>
      </section>

      {createdContests.length > 0 && (
        <section className="paper-card" style={{ marginTop: '24px' }}>
          <h2>Recent Contests</h2>
          {createdContests.map((item, index) => (
            <div key={`${item.title}-${index}`} className="problem-card" style={{ marginBottom: '16px' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="text-muted">{item.startTime} to {item.endTime}</div>
            </div>
          ))}
        </section>
      )}

      <section className="paper-card" style={{ marginTop: '24px' }}>
        <h2>Create Problem</h2>
        <div className="form-field">
          <label>Problem Title</label>
          <input value={problem.title} onChange={(event) => setProblem({ ...problem, title: event.target.value })} placeholder="Enter problem title" />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea value={problem.description} onChange={(event) => setProblem({ ...problem, description: event.target.value })} placeholder="Enter problem description" />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Difficulty</label>
            <select value={problem.difficulty} onChange={(event) => setProblem({ ...problem, difficulty: event.target.value })}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="form-field">
            <label>Tags</label>
            <input value={problem.tags} onChange={(event) => setProblem({ ...problem, tags: event.target.value })} placeholder="arrays, dp" />
          </div>
        </div>
        <button className="btn-primary" onClick={handleCreateProblem}>Add Problem</button>
      </section>

      {createdProblems.length > 0 && (
        <section className="paper-card" style={{ marginTop: '24px' }}>
          <h2>Recent Problems</h2>
          {createdProblems.map((item, index) => (
            <div key={`${item.title}-${index}`} className="problem-card" style={{ marginBottom: '16px' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="text-muted">{item.difficulty} • {item.tags.join(', ')}</div>
            </div>
          ))}
        </section>
      )}

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
