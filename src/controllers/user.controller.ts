import User from '../models/user.model'
import {Request, Response} from 'express'


export const getUser = async(req :Request,res:Response) => {
    
    const {userId} = req.params
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'Entity does not exist!'}) 
        }

        return res.status(200).json(user)

    } catch (error) {
       return res.status(500).json({message:'Internal Server Error'})
    }
}


export const getUsers = async(req:Request, res:Response) => {
    const users = await User.find()
    return res.status(200).json(users)
}

export const updateUser = async(req:Request, res:Response) => {

    const {userId} = req.params
    const {body} = req
    const user = await User.findOne({_id : userId , active: true})
    if(!user){
        return res.status(404).json({message : 'No existe dicho usuario!'})
    }
    if(req.userId != userId){
        
        return res.status(403).json({message:'No tiene acceso para actualizar dicho perfil'})
    }
 
    try {
        const userUpdated = await User.findByIdAndUpdate(userId,body, {new : true})
    
        res.status(200).json(userUpdated)

    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})

    }

}

export const deleteUser = async(req:Request, res:Response) => {
    const {userId} = req.params
    const deleteActive = {
        active : false
    }
    const user = await User.findOne({_id : userId , active: true})
    if(!user){
        return res.status(404).json({message : 'No existe dicho usuario!'})
    }
    if(req.userId != userId){
        
        return res.status(403).json({message:'No tiene acceso para actualizar dicho perfil'})
    }
    try {
        const usuarioEliminado = await User.findByIdAndUpdate(userId, {active :false})
        res.status(200).json({message:'Usuario Eliminado!'})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}