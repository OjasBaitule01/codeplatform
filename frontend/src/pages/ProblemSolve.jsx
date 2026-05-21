import { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import EditorPanel from '../components/EditorPanel';
import { initialProblems } from '../data/problems';

export default function ProblemSolve() {
  const { id } = useParams();
  const location = useLocation();
  const problemFromState = location.state?.problem;
  const problem = problemFromState || initialProblems.find((item) => item.id === id);
  const [code, setCode] = useState('// write your solution here');
  const [status, setStatus] = useState('Ready');
  const [submitted, setSubmitted] = useState(false);
  const [verdict, setVerdict] = useState('');

  const handleSubmit = () => {
    setStatus('Submitting...');
    setTimeout(() => {
      const result = code.includes('return') || code.includes('console.log') ? 'AC' : 'WA';
      setVerdict(result);
      setStatus(result);
      setSubmitted(true);
    }, 700);
  };

  if (!problem) {
    return (
      <section className="paper-card">
        <h2>Problem not found</h2>
        <p className="text-muted">Please return to the dashboard and choose a valid problem.</p>
        <Link className="btn-primary" to="/dashboard">Back to Dashboard</Link>
      </section>
    );
  }

  return (
    <div>
      <section className="paper-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <h2>{problem.title}</h2>
            <p className="text-muted">{problem.description}</p>
            <div style={{ marginTop: '12px' }}>
              {problem.tags.map((tag) => (
                <span key={tag} className="badge easy" style={{ marginRight: '8px' }}>{tag}</span>
              ))}
            </div>
          </div>
          <Link className="btn-primary small-button" to="/dashboard">Back to Dashboard</Link>
        </div>
      </section>

      <section className="paper-card" style={{ marginTop: '24px' }}>
        <h3>Problem Details</h3>
        <p className="text-muted">Solve this problem directly in the live editor below. Submit your code to get an instant verdict.</p>
        <div className="paper-card" style={{ marginTop: '18px', padding: '20px' }}>
          <h4>Editorial</h4>
          <p className="text-muted">{problem.editorial}</p>
        </div>
      </section>

      <EditorPanel code={code} setCode={setCode} onSubmit={handleSubmit} status={status} />

      {submitted && (
        <section className="paper-card scoreboard" style={{ marginTop: '24px' }}>
          <h2>Submission Result</h2>
          <p className="text-muted">Your solution was evaluated as <strong>{verdict}</strong>.</p>
        </section>
      )}
    </div>
  );
}
