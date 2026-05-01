import Subscription from '../models/Subscription.js';

// @desc    Get subscription insights and classification
// @route   GET /api/insights
// @access  Private
export const getInsights = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });

    const now = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

    let totalWasteCount = 0;
    let totalWarningCount = 0;
    let totalHealthyCount = 0;

    const classifiedSubscriptions = subscriptions.map(sub => {
      let status = 'healthy';
      const isInactive = sub.lastUsedDate < fourteenDaysAgo;
      const isUpcomingRenewal = sub.renewalDate > now && sub.renewalDate <= fiveDaysFromNow;

      // Classification Logic
      if (isUpcomingRenewal) {
        status = 'warning';
        totalWarningCount++;
      } else if (isInactive && sub.cost > 300) {
        status = 'waste';
        totalWasteCount++;
      } else {
        status = 'healthy';
        totalHealthyCount++;
      }

      // Return a plain object with the status field added
      return {
        ...sub.toObject(),
        status
      };
    });

    res.status(200).json({
      success: true,
      data: {
        subscriptions: classifiedSubscriptions,
        summary: {
          totalWasteCount,
          totalWarningCount,
          totalHealthyCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
