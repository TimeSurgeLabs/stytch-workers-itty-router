import { IRequest, Router, json } from 'itty-router';
import { withAuthenticatedUser } from './middleware';
import signup from './routes/signup';
import login from './routes/login';

const router = Router();

router.get('/', () => json({ hello: 'world' }));
router.get('/verify', withAuthenticatedUser, (req: IRequest) => json(req.session));
router.post('/signup', signup);
router.post('/login', login);

export default router;
