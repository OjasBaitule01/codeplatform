const express = require('express');
const auth = require('../middleware/auth');
const Contest = require('../models/Contest');
const Problem = require('../models/Problem');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startTime: -1 }).populate('problems');
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load contests' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description, startTime, endTime, problemIds } = req.body;
  try {
    const problems = await Problem.find({ _id: { $in: problemIds } });
    const contest = new Contest({ title, description, startTime, endTime, problems: problems.map((p) => p._id), leaderboard: [] });
    await contest.save();
    res.json(contest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contest' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate('problems');
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load contest' });
  }
});

module.exports = router;
