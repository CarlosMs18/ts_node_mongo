import {Request, Response} from 'express';
export const signup = (req: Request, res: Response) => {   
    console.log(req.body)
    res.send(req.body)
}