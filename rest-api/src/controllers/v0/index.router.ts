import { Router, Request, Response } from 'express';
import { FavoriteRouter } from './restaurants/routes/favorite.router';
import { UserRouter } from './users/routes/user.router';
import {RestaurantRouter} from './restaurants/routes/restaurant.router';
import { Favorite } from './restaurants/models/Favorite';

const router: Router = Router();

router.use('/users', UserRouter);
router.use('/restaurants', RestaurantRouter);
router.use('/favorites', FavoriteRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;