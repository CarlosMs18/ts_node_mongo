import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'



interface IPayload{
    userId:string,
    iat : number,
    exp : number
}

const isAuth = (req:Request, res:Response, next:NextFunction) => {
    const tokenHeader = req.get('x-token')
    if(!tokenHeader){
        return res.status(404).json({message:'No hay un toen en la peticion'})
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenHeader,process.env.SECRETKEY || 'secret') as IPayload
        if(!decodedToken){
            return res.status(403).json({message:'Not Authenticated!'})
        }
       
       
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message : 'Server Internal Error'})
    }


  
}

export default isAuth