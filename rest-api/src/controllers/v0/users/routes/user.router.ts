import {Router, Request, Response} from 'express';
import { AuthenticationRouter, requireAuth } from './authentication.router';

import {User} from '../models/User';

const router : Router = Router();

router.use('/auth', AuthenticationRouter);

router.get('/')

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

export const UserRouter: Router = router;
