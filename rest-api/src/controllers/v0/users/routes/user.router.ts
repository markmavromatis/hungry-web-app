import {Router, Request, Response} from 'express';
import { AuthenticationRouter, requireAuth } from './authentication.router';

import {User} from '../models/User';
import {enableCors} from "../../../../util/CorsHelper";

const router : Router = Router();

enableCors(router);

router.use('/auth', AuthenticationRouter);

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

export const UserRouter: Router = router;
