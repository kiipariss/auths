import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const User = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }]
})


export default mongoose.model('User', User)