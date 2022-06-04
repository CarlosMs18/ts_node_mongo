import {signup, signin,profile} from '../controllers/auth.controller'
import {Router}from 'express'
import {check} from 'express-validator'
import isAuth from '../middlewares/is-auth.middleware'


const router: Router = Router()

router.post('/signup',[
    check('username','Debe de tener un minimo de 3 digitos')
    .isLength({min :3}),
    check('email','Lo ingresado debe de ser un email correcto')
    .isEmail()
    .normalizeEmail(),
    check('password','El password debe de tener un minimo de 3 digitos')
    .isLength({min :3})
],signup)

router.post('/signin',[
    check('email','Lo ingresado debe de ser un email valido')
    .isEmail()
    .normalizeEmail()
],signin)

router.get('/profile',isAuth,profile)

export default router