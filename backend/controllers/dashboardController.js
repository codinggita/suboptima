import Subscription from '../models/Subscription.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });

    let totalMonthlySpend = 0;
    let potentialWaste = 0;
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    subscriptions.forEach(sub => {
      // Calculate monthly spend
      if (sub.billingCycle === 'monthly') {
        totalMonthlySpend += sub.cost;
      } else if (sub.billingCycle === 'yearly') {
        totalMonthlySpend += sub.cost / 12;
      }

      // Calculate potential waste
      // If last used more than 14 days ago, consider it waste
      if (sub.lastUsedDate < fourteenDaysAgo) {
        if (sub.billingCycle === 'monthly') {
          potentialWaste += sub.cost;
        } else if (sub.billingCycle === 'yearly') {
          potentialWaste += sub.cost / 12;
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions: subscriptions.length,
        totalMonthlySpend: Number(totalMonthlySpend.toFixed(2)),
        potentialWaste: Number(potentialWaste.toFixed(2))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
