import jwt from 'jsonwebtoken'

const generarJWT = (userId: string):Promise<string> =>{
    return new Promise((resolve, reject)=> {
        const payload = {userId}

        const token = jwt.sign(payload,process.env.SECRETKEY || 'secret',{
            expiresIn : '4h'
        })

        if(!token){
            reject( 'No se pudo generar el token' )
        }else{
            resolve( token );
        }
    })
}

export default generarJWT