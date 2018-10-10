import { Router } from 'express';
import validate from '../utils/validations';
import { userController } from '../controllers';

const router = Router();

router.post('/auth/signup', validate.signup, userController.signup);

export default router;
