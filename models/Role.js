import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const Role = new Schema({
    value: { type: String, unique: true, default: "USER" },

})

export default mongoose.model('Role', Role)
