import express from 'express';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all budgets with calculated spent amount
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId }).populate('categoryId', 'name type');

    const budgetsWithSpent = await Promise.all(budgets.map(async (budget) => {
      const b = budget.toObject();
      const startDate = budget.period === 'monthly'
        ? new Date(b.year, (b.month || 1) - 1, 1)
        : new Date(b.year, 0, 1);
      const endDate = budget.period === 'monthly'
        ? new Date(b.year, b.month || 1, 0, 23, 59, 59)
        : new Date(b.year, 11, 31, 23, 59, 59);

      const transactions = await Transaction.find({
        userId: req.userId,
        categoryId: b.categoryId._id,
        date: { $gte: startDate, $lte: endDate }
      });

      b.spent = transactions.reduce((sum, t) => sum + t.amount, 0);
      return b;
    }));

    res.json(budgetsWithSpent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create budget
router.post('/', auth, async (req, res) => {
  try {
    const budget = new Budget({ ...req.body, userId: req.userId });
    await budget.save();
    const populated = await budget.populate('categoryId', 'name type');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update budget
router.put('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    ).populate('categoryId', 'name type');
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete budget
router.delete('/:id', auth, async (req, res) => {
  try {
    await Budget.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
