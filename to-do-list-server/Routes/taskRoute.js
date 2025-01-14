
import { addTask, allTask, isTaskCompleted, updateTask } from '../controller/taskController.js';

import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
const app = express();




const taskRouter = express.Router()

taskRouter.post('/add', userAuth, addTask)
taskRouter.post('/update', userAuth, updateTask)
taskRouter.get('/all-task',  allTask)
taskRouter.post('/is-complete', userAuth, isTaskCompleted)


export default taskRouter
