import express from 'express';
import Transaction from '../models/Transaction.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .populate('categoryId', 'name type')
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.userId
    });
    await transaction.save();
    res.status(201).json(transaction);
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