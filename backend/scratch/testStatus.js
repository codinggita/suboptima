import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

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

const run = async () => {
  const Subscription = (await import('../models/Subscription.js')).default;
  const subs = await Subscription.find({});
  console.log("Total subs:", subs.length);
  for (let sub of subs) {
    console.log(`Sub: ${sub.name}, Renewal: ${sub.renewalDate}, Status in DB: ${sub.status}, Calc Status: ${calculateStatus(sub.renewalDate)}`);
  }
  process.exit(0);
};

run();
