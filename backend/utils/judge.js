const runJudge = ({ sourceCode, language, problemId }) => {
  const normalized = sourceCode.toLowerCase();
  if (normalized.includes('while(true)') || normalized.includes('for(;;)')) {
    return { verdict: 'TLE', score: 0 };
  }
  if (normalized.includes('return') || normalized.includes('console.log')) {
    const isCorrect = normalized.includes('solve') || normalized.includes('output');
    return { verdict: isCorrect ? 'AC' : 'WA', score: isCorrect ? 100 : 0 };
  }
  return { verdict: 'WA', score: 0 };
};

module.exports = { runJudge };
