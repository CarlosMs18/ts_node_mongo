import {Schema, model, Document} from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface IUser extends Document{
    username : string,
    email : string,
    password : string,
    comparePassword(password : string): Promise<boolean>
}

const userSchmea = new Schema({
    username : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required:true
    },
    active:{
        type : Boolean,
        default : true
    }
})

userSchmea.methods.toJSON = function(){
    let user = this.toObject()
    delete user.password
    return user
}

userSchmea.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcryptjs.genSaltSync(10)
    const hashed = bcryptjs.hashSync(this.password,salt)
    this.password = hashed
    return next()
})

userSchmea.methods.comparePassword = async function(password: string):Promise<boolean>{
    
    return bcryptjs.compareSync(password, this.password)
}
export default model<IUser>('User',userSchmea)