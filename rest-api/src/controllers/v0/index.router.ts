import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';
import {RestaurantRouter} from './restaurants/routes/restaurant.router';

const router: Router = Router();

router.use('/users', UserRouter);
router.use('/restaurants', RestaurantRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;