import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    resetOtp: {
        type: Number,
        default: 0
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'task'
        }
    ]
}, { minimize: false })


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel