import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
