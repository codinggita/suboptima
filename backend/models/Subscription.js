import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true
  },
  detail: {
    type: String,
    required: [true, 'Please add details (e.g. number of licenses)']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  cost: {
    type: Number,
    required: [true, 'Please add a cost']
  },
  costDetail: {
    type: String
  },
  renewalDate: {
    type: Date,
    required: [true, 'Please add a renewal date']
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  lastUsedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Healthy', 'Warning', 'Waste'],
    default: 'Healthy'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Subscription', subscriptionSchema);
