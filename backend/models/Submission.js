const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  language: { type: String, default: 'javascript' },
  sourceCode: { type: String, required: true },
  verdict: { type: String, enum: ['Pending', 'AC', 'WA', 'TLE', 'CE'], default: 'Pending' },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
