import express from 'express';
import { sequelize } from './sequelize';

import bodyParser from 'body-parser';

(async () => {

    await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080; // default port to listen
  
    app.use(bodyParser.json());

    // Root URI call
    app.get( "/", async ( req, res ) => {
        res.send( "Server is up!");
    } );
  

    // Start the Server
    app.listen( port, () => {
        console.log( `server running http://localhost:${ port }` );
        console.log( `press CTRL+C to stop server` );
    } );
})();