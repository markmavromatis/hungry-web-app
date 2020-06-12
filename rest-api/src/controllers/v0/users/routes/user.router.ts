import {Router, Request, Response} from 'express';
import { AuthenticationRouter, requireAuth } from './authentication.router';

import {User} from '../models/User';

const router : Router = Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.use('/auth', AuthenticationRouter);

router.get('/')

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

export const UserRouter: Router = router;
