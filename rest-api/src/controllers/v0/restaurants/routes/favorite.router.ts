import {Router, Request, Response} from 'express';

import {Favorite} from '../models/Favorite';
import {User} from '../../users/models/User';

import {enableCors} from "../../../../util/CorsHelper";
import {requireAuth} from "../../users/routes/authentication.router";

const router : Router = Router();

enableCors(router);

// Search favorites by email address
router.get('/:email', requireAuth, async (req: Request, res: Response) => {
    let { email} = req.params;

    if (!email) {
        res.status(400).send("email is required");
    }

    const favorites = await Favorite.findAll({
        where: {email: email}
    })

    res.status(200).send(favorites);
    
});

//register a new favorite
router.post('/', requireAuth, async (req: Request, res: Response) => {
    const {email, restaurantId, name, url, latitude, 
        longitude, address1, city, state, zip} = req.body;

    if (!email || !restaurantId || !name || !url || !latitude || !longitude 
        || !address1 || !city || !state || !zip) {
            return res.status(400).send({message: "email, restaurantid, name, url, latitude, longitude, address1, city, state, and zip are all required"});
    }
    
    // find the user
    const user = await User.findByPk(email);
    // check that user doesnt exists
    if(user == null) {
        return res.status(400).send({ message: `No user found with email address: ${email}` });
    }

    // Check that a favorite does not already exist
    const existingFavorites = await Favorite.findAll({where: {
        email: email,
        restaurantId: restaurantId
    }});
    // check that favorite doesn't exist
    if(existingFavorites.length > 0) {
        // If it does, then just returns success silently without doing anything.
        return res.status(200).send({ message: `Favorite already exists with email address: ${email} and restaurant ID: ${restaurantId}` });
    }
    
    const newFavorite = await new Favorite({
        email: email,
        restaurantId: restaurantId,
        name: name,
        url: url,
        latitude: String(latitude),
        longitude: String(longitude),
        address1 : address1,
        city: city,
        state: state,
        zip: zip
    })

    let createdFavorite;
    try {
        createdFavorite = await newFavorite.save();
    } catch (e) {
        console.error(e)
        throw e;
    }

    // Generate JWT
    res.status(201).send({favorite: newFavorite});
});

router.delete('/', requireAuth, async (req: Request, res: Response) => {
    const {email} = req.body;

    if (!email) {
            res.status(400).send({message: "email is required"});
    }
    
    const foundFavorites = await Favorite.findAll({where: {
        email: email
    }})

    if (foundFavorites.length > 0) {
        let count = foundFavorites.length;
        let i = 1
        foundFavorites.forEach(async favorite => {
            await favorite.destroy();
            if (i == count) {
                res.status(200).send();
            }
            i += 1;
        })
    } else {
        // Just silently success this request.
        res.status(200).send();
    }
});


export const FavoriteRouter: Router = router;

