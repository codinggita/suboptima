import Subscription from '../models/Subscription.js';

// Helper to calculate status based on renewal date
const calculateStatus = (renewalDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const renewal = new Date(renewalDate);
  renewal.setHours(0, 0, 0, 0);

  const diffTime = renewal.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'Waste'; // Expired
  } else if (diffDays <= 3) {
    return 'Warning'; // Renewing soon
  } else {
    return 'Healthy';
  }
};

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });

    // Update statuses dynamically
    const updatedSubscriptions = subscriptions.map(sub => {
      const currentStatus = calculateStatus(sub.renewalDate);
      if (sub.status !== currentStatus) {
        sub.status = currentStatus;
        sub.save(); // Async but no need to wait
      }
      return sub;
    });

    res.status(200).json({
      success: true,
      count: updatedSubscriptions.length,
      data: updatedSubscriptions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single subscription
// @route   GET /api/subscriptions/:id
// @access  Private
export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Make sure user owns subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update status dynamically
    const currentStatus = calculateStatus(subscription.renewalDate);
    if (subscription.status !== currentStatus) {
      subscription.status = currentStatus;
      await subscription.save();
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new subscription
// @route   POST /api/subscriptions
// @access  Private
export const createSubscription = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    // Auto-calculate status
    if (req.body.renewalDate) {
      req.body.status = calculateStatus(req.body.renewalDate);
    }

    const subscription = await Subscription.create(req.body);

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Private
export const updateSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Make sure user owns subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Auto-calculate status if date changed
    if (req.body.renewalDate) {
      req.body.status = calculateStatus(req.body.renewalDate);
    }

    subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Make sure user owns subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await subscription.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
