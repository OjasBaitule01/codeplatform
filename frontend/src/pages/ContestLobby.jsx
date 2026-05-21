import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorPanel from '../components/EditorPanel';
import { initialProblems } from '../data/problems';

const initialContests = [
  {
    id: 'c1',
    title: 'Summer Code Clash',
    description: '90-minute contest featuring easy, medium, and hard problems.',
    startTime: '2026-05-21 10:00',
    endTime: '2026-05-21 12:00',
    problems: ['Array Jump Challenge', 'Binary Tree Race']
  }
];

export default function ContestLobby() {
  const [contests, setContests] = useState(initialContests);
  const [problems, setProblems] = useState(initialProblems);
  const [selectedProblemId, setSelectedProblemId] = useState(initialProblems[0].id);
  const navigate = useNavigate();
  const [code, setCode] = useState('// write your solution here');
  const [status, setStatus] = useState('Ready');
  const [showContestForm, setShowContestForm] = useState(false);
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [newContest, setNewContest] = useState({ title: '', description: '', startTime: '', endTime: '' });
  const [newProblem, setNewProblem] = useState({ title: '', description: '', difficulty: 'Easy', tags: '' });
  const [submissions, setSubmissions] = useState([]);

  const selectedProblem = problems.find((problem) => problem.id === selectedProblemId) || problems[0];

  const handleAddContest = () => {
    if (!newContest.title || !newContest.startTime || !newContest.endTime) return;
    setContests([{ ...newContest, id: `c${Date.now()}`, problems: [] }, ...contests]);
    setNewContest({ title: '', description: '', startTime: '', endTime: '' });
    setShowContestForm(false);
  };

  const handleAddProblem = () => {
    if (!newProblem.title || !newProblem.description) return;
    const problem = {
      id: `p${Date.now()}`,
      title: newProblem.title,
      description: newProblem.description,
      difficulty: newProblem.difficulty,
      tags: newProblem.tags.split(',').map((tag) => tag.trim()),
      editorial: 'Submit a solution to unlock the editorial and improve your score.'
    };
    setProblems([problem, ...problems]);
    setSelectedProblemId(problem.id);
    setNewProblem({ title: '', description: '', difficulty: 'Easy', tags: '' });
    setShowProblemForm(false);
  };

  const handleSubmit = () => {
    setStatus('Submitting...');
    setTimeout(() => {
      const verdict = code.includes('return') || code.includes('console.log') ? 'AC' : 'WA';
      const score = verdict === 'AC' ? 100 : 0;
      setSubmissions([{ id: Date.now(), problem: selectedProblem.title, verdict, score, time: new Date().toLocaleTimeString() }, ...submissions]);
      setStatus(verdict);
    }, 700);
  };

  return (
    <div>
      <section className="paper-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <h2>Contest Dashboard</h2>
            <p className="text-muted">Add contests and problems, then solve code directly from the dashboard.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-primary small-button" onClick={() => setShowContestForm((value) => !value)}>Add Contest</button>
            <button className="btn-primary small-button" onClick={() => setShowProblemForm((value) => !value)}>Add Problem</button>
          </div>
        </div>
      </section>

      {showContestForm && (
        <section className="paper-card form-card">
          <h3>Create Contest</h3>
          <div className="form-field">
            <label>Title</label>
            <input value={newContest.title} onChange={(event) => setNewContest({ ...newContest, title: event.target.value })} placeholder="Contest title" />
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea value={newContest.description} onChange={(event) => setNewContest({ ...newContest, description: event.target.value })} placeholder="Contest description" />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Start Time</label>
              <input type="datetime-local" value={newContest.startTime} onChange={(event) => setNewContest({ ...newContest, startTime: event.target.value })} />
            </div>
            <div className="form-field">
              <label>End Time</label>
              <input type="datetime-local" value={newContest.endTime} onChange={(event) => setNewContest({ ...newContest, endTime: event.target.value })} />
            </div>
          </div>
          <button className="btn-primary" onClick={handleAddContest}>Save Contest</button>
        </section>
      )}

      {showProblemForm && (
        <section className="paper-card form-card">
          <h3>Add Problem</h3>
          <div className="form-field">
            <label>Problem Title</label>
            <input value={newProblem.title} onChange={(event) => setNewProblem({ ...newProblem, title: event.target.value })} placeholder="Title" />
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea value={newProblem.description} onChange={(event) => setNewProblem({ ...newProblem, description: event.target.value })} placeholder="Problem description" />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Difficulty</label>
              <select value={newProblem.difficulty} onChange={(event) => setNewProblem({ ...newProblem, difficulty: event.target.value })}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div className="form-field">
              <label>Tags</label>
              <input value={newProblem.tags} onChange={(event) => setNewProblem({ ...newProblem, tags: event.target.value })} placeholder="arrays, dp" />
            </div>
          </div>
          <button className="btn-primary" onClick={handleAddProblem}>Save Problem</button>
        </section>
      )}

      <section className="dashboard-grid" style={{ marginTop: '26px' }}>
        <section className="paper-card">
          <h2>Active Contests</h2>
          {contests.map((contest) => (
            <div key={contest.id} className="problem-card" style={{ marginBottom: '16px' }}>
              <h3>{contest.title}</h3>
              <p>{contest.description}</p>
              <div className="text-muted">{contest.startTime} - {contest.endTime}</div>
              <div style={{ marginTop: '10px' }}>
                <span className="badge easy">{contest.problems.length} problems</span>
              </div>
            </div>
          ))}
          {contests.length === 0 && <p className="text-muted">No contests yet. Click “Add Contest” to create one.</p>}
        </section>

        <section className="paper-card">
          <h2>Problem Studio</h2>
          {problems.map((problem) => (
            <div
              key={problem.id}
              className={`problem-card ${problem.id === selectedProblemId ? 'selected-problem' : ''}`}
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => {
                navigate(`/problem/${problem.id}`, { state: { problem } });
              }}
            >
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <span className={`badge ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            </div>
          ))}
        </section>
      </section>

      <section className="paper-card" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <h2>{selectedProblem.title}</h2>
            <p className="text-muted">{selectedProblem.description}</p>
            <div className={`badge ${selectedProblem.difficulty.toLowerCase()}`}>{selectedProblem.difficulty}</div>
          </div>
          <div className="badge medium">Selected</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Editorial</h3>
          <p className="text-muted">{selectedProblem.editorial}</p>
        </div>
      </section>

      <EditorPanel code={code} setCode={setCode} onSubmit={handleSubmit} status={status} />

      <section className="paper-card scoreboard" style={{ marginTop: '24px' }}>
        <h2>Submission History</h2>
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Verdict</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No submissions yet. Submit code to see results.</td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.problem}</td>
                  <td>{submission.verdict}</td>
                  <td>{submission.score}</td>
                  <td>{submission.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
