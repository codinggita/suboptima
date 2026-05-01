import express from 'express';
import {
  getSubscriptions,
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(getSubscriptions)
  .post(createSubscription);

router
  .route('/:id')
  .get(getSubscription)
  .put(updateSubscription)
  .delete(deleteSubscription);

export default router;
