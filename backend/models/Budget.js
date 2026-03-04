import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  month: {
    type: Number // 1-12, required for monthly budgets
  },
  year: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
