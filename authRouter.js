import Router from 'express'
import controller from "./authController.js"
import { check } from 'express-validator'
import authMidlewaree from './middlewaree/authMidlewaree.js'
import roleMiddleware from './middlewaree/roleMiddleware.js'

const router = new Router()

router.post('/registration', [
    check('userName', "user name is none").notEmpty(),
    check('password', "password is low 4 and haig 12 simbol").isLength({ min: 4, max: 12 }),

], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)


export default router














