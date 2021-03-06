// This router handles the creation and verification of login credentials.
import {Router, Request, Response} from 'express';
import {User} from '../models/User';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {NextFunction} from 'connect';

import * as EmailValidator from 'email-validator';

import {config} from "../../../../config/config";
import {enableCors} from "../../../../util/CorsHelper"

const router: Router = Router();

enableCors(router);

async function hashPassword(inputPassword : string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(inputPassword, salt);
    
    return hash
}

async function comparePasswords(inputPassword : string, hashed : string) : Promise<boolean> {
    const result = await bcrypt.compare(inputPassword, hashed);
    return result;
}

function generateJWT(user: User) : string {
    return jwt.sign(user.toJSON(), config.dev.jwt_secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({message: "Missing authorization headers!"})
    }

    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({message: "Malformed token"})
    }

    const token = tokenBearer[1];

    return jwt.verify(token, config.dev.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate!'})
        }
        return next();
    });
}

router.get("/verification", requireAuth, async(req: Request, res: Response) => {
    return res.status(200).send({auth: true, message: "Authenticated"});
})

router.post('/login', async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'password is required' });
    }

    const user = await User.findByPk(email);
    // check that user exists
    if(!user) {
        return res.status(401).send({ auth: false, message: 'Unauthorized!' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.passwordHashed)

    if(!authValid) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // Generate JWT
    const jwt = generateJWT(user);

    res.status(200).send({ auth: true, token: jwt, user: user.email});
});

//register a new user
router.post('/', async (req: Request, res: Response) => {
    const {email, password, fullName} = req.body;

    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'email is required or malformed' });
    }

    // check password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'password is required' });
    }

    // check fullName valid
    if (!fullName) {
        return res.status(400).send({ auth: false, message: 'fullName is required' });
    }
    
    // find the user
    const user = await User.findByPk(email);
    // check that user doesnt exists
    if(user) {
        return res.status(409).send({ auth: false, message: 'User may already exist' });
    }

    const password_hash = await hashPassword(password);

    const newUser = await new User({
        email: email,
        passwordHashed: password_hash,
        fullName: fullName
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    // Generate JWT
    const jwt = generateJWT(savedUser);

    res.status(201).send({token: jwt, user: savedUser.email});
});


export const AuthenticationRouter: Router = router;