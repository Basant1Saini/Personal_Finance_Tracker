import express from 'express';
import Transaction from '../models/Transaction.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Summary for current month (or given month/year)
router.get('/summary', auth, async (req, res) => {
  try {
    const { month, year } = req.query;
    let matchQuery = { userId: req.userId };
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      matchQuery.date = { $gte: startDate, $lte: endDate };
    }
    const transactions = await Transaction.find(matchQuery).populate('categoryId', 'name type');
    let totalIncome = 0;
    let totalExpenses = 0;
    const byCategory = {};
    transactions.forEach(t => {
      const type = t.categoryId?.type;
      const catName = t.categoryId?.name || 'Unknown';
      if (type === 'income') totalIncome += t.amount;
      if (type === 'expense') {
        totalExpenses += t.amount;
        byCategory[catName] = (byCategory[catName] || 0) + t.amount;
      }
    });
    res.json({
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      byCategory: Object.entries(byCategory).map(([name, amount]) => ({ name, amount }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Monthly income/expense breakdown for a given year
router.get('/monthly', auth, async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);
    const transactions = await Transaction.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    }).populate('categoryId', 'name type');
    const monthly = Array.from({ length: 12 }, (_, i) => ({ month: i, income: 0, expenses: 0 }));
    transactions.forEach(t => {
      const m = new Date(t.date).getMonth();
      if (t.categoryId?.type === 'income') monthly[m].income += t.amount;
      if (t.categoryId?.type === 'expense') monthly[m].expenses += t.amount;
    });
    res.json(monthly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions with optional filtering
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate, categoryId, type } = req.query;
    const query = { userId: req.userId };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate + 'T23:59:59');
    }
    if (categoryId) query.categoryId = categoryId;
    let transactions = await Transaction.find(query)
      .populate('categoryId', 'name type')
      .sort({ date: -1 });
    if (type) transactions = transactions.filter(t => t.categoryId?.type === type);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: req.userId });
    await transaction.save();
    const populated = await transaction.populate('categoryId', 'name type');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    ).populate('categoryId', 'name type');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
