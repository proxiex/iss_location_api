import { Router } from 'express';
import validate from '../utils/validations';
import Auth from '../utils/authenticate';
import { issHistoryController } from '../controllers';

const router = Router();

router.post('/iss/location', Auth.Verify, validate.issLocation, issHistoryController.addHistory);
router.get('/iss/location', Auth.Verify, issHistoryController.viewHistory);

export default router;
