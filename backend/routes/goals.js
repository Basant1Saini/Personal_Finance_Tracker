import express from 'express';
import Goal from '../models/Goal.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ deadline: 1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create goal
router.post('/', auth, async (req, res) => {
  try {
    const goal = new Goal({ ...req.body, userId: req.userId });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update goal (amount, progress, etc.)
router.put('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete goal
router.delete('/:id', auth, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
