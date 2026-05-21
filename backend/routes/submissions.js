const express = require('express');
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const { runJudge } = require('../utils/judge');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { contestId, problemId, sourceCode, language } = req.body;
  try {
    const contest = await Contest.findById(contestId);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });

    const result = runJudge({ sourceCode, language, problemId });
    const submission = new Submission({ contestId, problemId, userId: req.user.id, language, sourceCode, verdict: result.verdict, score: result.score });
    await submission.save();
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Submission failed' });
  }
});

router.get('/contest/:contestId', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ contestId: req.params.contestId }).populate('problemId', 'title').sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load submissions' });
  }
});

module.exports = router;
