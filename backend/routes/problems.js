const express = require('express');
const auth = require('../middleware/auth');
const Problem = require('../models/Problem');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load problems' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description, difficulty, tags, editorial, sampleInput, sampleOutput } = req.body;
  try {
    const problem = new Problem({ title, description, difficulty, tags, editorial, sampleInput, sampleOutput });
    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create problem' });
  }
});

module.exports = router;
