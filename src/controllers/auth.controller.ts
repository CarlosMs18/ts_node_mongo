import {Request, Response} from 'express';
import {validationResult} from 'express-validator'
import User from '../models/user.model'
import generarJWT from '../helpers/generar-jwt.helper'

export const signup =async(req: Request, res: Response) => {   
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
    }

    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        return res.status(401).json({message : 'El email ya se encuentra en uso'})
    }

    try {
        const {body} = req
        const user = new User(body)
        await user.save()
        
        res.status(201).json(user)
        
    } catch (error) {
        console.log(error)
    }  
}

export const signin = async(req:Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
    }

    const usuarioExiste = await User.findOne({email : req.body.email})
    if(!usuarioExiste){
        return res.status(404).json({message : 'El usuario no existe!'})
    }

    const compararPassword = await usuarioExiste.comparePassword(req.body.password)
    console.log(compararPassword)
    if(!compararPassword){
        return res.status(402).json({message : 'Contraseña Incorrecta'})
    }

    const token = await generarJWT(usuarioExiste._id)
    res.status(200).json({userId:usuarioExiste._id, token})
    
   
}

export const profile = async(req:Request, res:Response) => {
    const user = await User.findById(req.userId)
    if(!user){
        return res.status(404).json({message:'User does not exist!'})
    }
    res.status(200).json(user)
   /*  console.log(req.userId) */
}