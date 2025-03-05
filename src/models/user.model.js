import mongoose from "mongoose";
import mongoose_1 from "mongoose";
// User schema
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    linktree: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "LinkTree",
        }
    ]
}, { timestamps: true });
// Create User model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
