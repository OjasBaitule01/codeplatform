import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Practice from './pages/Practice';
import ContestLobby from './pages/ContestLobby';
import ProblemSolve from './pages/ProblemSolve';
import TopBar from './components/TopBar';

export default function App() {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ContestLobby />} />
          <Route path="/contest" element={<ContestLobby />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/problem/:id" element={<ProblemSolve />} />
        </Routes>
      </main>
    </div>
  );
}
