import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";


export const addTask = async (req, res) => {
    const { userId, title, subtitle } = req.body

    try {

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ message: 'Login first', success: true })
        }

        const task = new taskModel({ userId, title, subtitle })
        await task.save();

        user.tasks.push(task._id)
        await user.save()

        res.json({ task, success: true })

    } catch (error) {
        res.json({ message: error.message, success: false })

    }

}

export const updateTask = async (req, res) => {

    const { taskId, title, subtitle } = req.body

    try {

        const existingTask = await taskModel.findById(taskId)
        if (!existingTask) {
            return res.json({ message: 'task not found', success: false })
        }

        const task = await taskModel.findByIdAndUpdate(taskId, { title, subtitle })

        res.json({ success: true, message: 'task updated' })

    } catch (error) {
        res.json({ message: error.message, success: false })
    }

}

export const isTaskCompleted = async (req, res) => {

    const { taskId } = req.body

    try {

        const existingTask = await taskModel.findById(taskId)
        if (!existingTask) {
            return res.json({ message: 'task not found', success: false })
        }

        if (existingTask.isCompleted) {
            existingTask.isCompleted = false
        }
        else {
            existingTask.isCompleted = true
        }

        await existingTask.save()

        res.json({ message: 'updated', success: true })



    } catch (error) {
        res.json({ message: error.message, success: false })
    }

}

const deleteTask = async (req, res) => {

}

export const allTask = async (req, res) => {

    try {

        const { userId } = req.body
        const user = await userModel.findById(userId).populate('tasks');
        // btw no need to recheck
        if (!user) {
            return res.json({ message: 'Login first', success: false })
        }
        res.json({ tasks: user.tasks, success: true })

    } catch (error) {
        res.json({ message: error.message, success: false })
    }

}