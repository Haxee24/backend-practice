import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        loggedIn: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true}
);

userSchema.pre("save", async function (){
    if (!this.isModified("password"));
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.compareInputPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userSchema);