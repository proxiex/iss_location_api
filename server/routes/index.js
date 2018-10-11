import { Router } from 'express';
import userRoute from './user';
import issHistoryRoute from './issHistory';

const router = Router();

router.use('/', userRoute);
router.use('/', issHistoryRoute);

export default router;
