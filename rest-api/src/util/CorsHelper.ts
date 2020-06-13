import {Router} from 'express';

export function enableCors(router: Router) {
    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", ['GET', 'PUT', 'POST', 'DELETE']);
        next();
    });    
}

