
import { addTask, allTask, deleteTask, isTaskCompleted, updateTask } from '../controller/taskController.js';

import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
const app = express();




const taskRouter = express.Router()

taskRouter.post('/add', userAuth, addTask)
taskRouter.post('/update', userAuth, updateTask)
taskRouter.get('/all-task', userAuth, allTask)
taskRouter.post('/is-complete', userAuth, isTaskCompleted)
taskRouter.post('/delete',userAuth,deleteTask)
taskRouter.post('/is-task-completed',userAuth,isTaskCompleted)

export default taskRouter
