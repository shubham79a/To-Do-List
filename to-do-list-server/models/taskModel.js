import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Number
    },

    az: {
        type: String
    },
    bz: {
        type: String
    },
    cz: {
        type: Number
    },
    dz: {
        type: Number
    }

})


const taskModel = mongoose.models.task || mongoose.model('task', taskSchema);

export default taskModel