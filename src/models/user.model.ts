import {Schema, model} from 'mongoose'


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

export default model('User',userSchmea)