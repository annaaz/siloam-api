import { NextFunction, Request, Response } from 'express'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user) {
        return res.sendStatus(403)
    }
    next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    console.log({ user })
    if (!user || user._doc.role !== 'admin') {
        return res.sendStatus(403)
    }
    next()
}
