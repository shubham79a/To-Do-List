import express from 'express'
import { getUserData, isSignedIn, login, logout, register } from '../controller/userAuthController.js'
import { userAuth } from '../middleware/userAuth.js'

const userAuthRouter = express.Router()

userAuthRouter.post('/register', register)
userAuthRouter.post('/login', login)
userAuthRouter.post('/logout', logout)
userAuthRouter.get('/auth-status', userAuth, isSignedIn)
userAuthRouter.get('/user-data', userAuth, getUserData)

export default userAuthRouter