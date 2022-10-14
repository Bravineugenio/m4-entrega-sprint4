import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const ensureAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error:any, decoded:any) => {
        if(error){
            return res.status(401).json({
                message: 'Invalid token'
            })
        }

        req.user = {
            isAdm: decoded.isAdm,
            id: decoded.id

        }

        return next()

    })

}

export default ensureAuthMiddleware