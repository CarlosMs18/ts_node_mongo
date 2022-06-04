import {Router} from 'express'
import {deleteUser, getUser, getUsers, updateUser} from '../controllers/user.controller'
import isAuth from '../middlewares/is-auth.middleware'

const router:Router = Router()

router.get('/user/:userId',isAuth,getUser)

router.get('/users',isAuth,getUsers)

router.put('/user/:userId',isAuth,updateUser)

router.delete('/user/:userId',isAuth,deleteUser)
export default router
