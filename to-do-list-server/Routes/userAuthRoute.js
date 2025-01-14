import express from 'express'
import { isSignedIn, login, logout, register } from '../controller/userAuthController.js'
import { userAuth } from '../middleware/userAuth.js'

const userAuthRouter = express.Router()

userAuthRouter.post('/register', register)
userAuthRouter.post('/login', login)
userAuthRouter.post('/logout', logout)
userAuthRouter.get('/auth-status', userAuth, isSignedIn)


export default userAuthRouter