import {Router, Request, Response} from 'express';

import {Restaurant} from '../models/Restaurant';
import { config } from '../../../../config/config';

const router : Router = Router();

const yelp = require('yelp-fusion');

// Check whether a string value can be converted to a number.
// Copied from StackOverflow answer:
// https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
function isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}


router.get('/')

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await Restaurant.findByPk(id);
    res.send(item);
});

// Search restaurants by criteria
router.get('/', (req: Request, res: Response) => {
    let { address, distanceInMiles} = req.query;

    if (!address) {
        res.status(400).send("address is required");
    }

    if (!distanceInMiles) {
        res.status(400).send("distanceInMiles is required");
    }

    // console.log("*** DISTANCE IN MILES TO STRING IS: " + distanceInMiles);
    const distanceInMilesString = distanceInMiles.toString();
    // console.log("DISTANCE IN MILES TO STRING IS: " + distanceInMilesString);

    if (!isNumber(distanceInMilesString)) {
        res.status(400).send("distanceInMiles needs to be a number")
    }

    // Convert distance to meters
    const distanceInMeters = Math.round(1609.34 * parseFloat(distanceInMilesString));

    const apiKey = config.dev.yelp_fusion_key;
    const client = yelp.client(apiKey);
    const searchRequest = {
        term:'restaurants',
        location: address,
        radius: distanceInMeters
      };

    //   const result = await client.search(searchRequest);
      client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
        res.status(200).send(prettyJson);
    }).catch( e => {
        console.error(e);
        res.status(500).send("Error connecting to Yelp search: " + e);
      });
});

export const RestaurantRouter: Router = router;
