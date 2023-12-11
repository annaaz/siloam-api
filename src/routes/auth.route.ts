import { Router } from 'express'
import { createSession, refreshSession, registerUser } from '../controllers/auth.controllers'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)
AuthRouter.post('/refresh', refreshSession)
