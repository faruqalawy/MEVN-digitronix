import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema)