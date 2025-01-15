import React, { useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'


const Task = ({ title, subtitle, createdAt, id,
    isCompleted }) => {

    const { backendUrl, getAllTask } = useContext(AppContext)

    const deleteTask = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/task/delete',
                { taskId: id }
            )

            if (response.data.success) {
                toast.success(response.data.messsage)
                getAllTask()
            }
            else {
                toast.error(response.data.messsage)
            }



        } catch (error) {
            toast.error(error.messsage)
        }

    }

    const handleIsCompleted = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/task//is-task-completed',
                { taskId: id }
            )
            if (response.data.success) {
                toast.success(response.data.success)
            }
            else {
                toast.success(response.data.success)
            }

        } catch (error) {
            toast.error(error.messsage)
        }
    }

    const editTask = async () => { }



    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className='bg-gradient-to-b from-orange-900 to-gray-900 w-full px-3 py-3 rounded-md  flex gap-2 mb-2'>
            {/* <div className='mt-2 '>
                <input onChange={() => handleIsCompleted} type="checkbox" className={`  checkbox-round `} />
            </div> */}
            <div className=' flex flex-col gap-1 w-full'>

                <div className=' flex flex-col gap-1  '>
                    <div className='flex items-center justify-between'>

                        <p className={isCompleted === true ? 'line-through' : 'text-white font-bold text-sm sm:text-lg '}>{title}</p>

                        <p className='text-white text-sm'>{formatTimestampToDate(createdAt)}</p>
                        {/* isCompleted===true ?  */}
                    </div>
                    <div>
                        <p className='text-gray-200 font-semibold text-xs sm:text-sm'>{subtitle}</p>
                    </div>


                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        {/* <p className='text-pink-700 text-sm font-medium'>23/06/2023</p> */}
                    </div>
                    <div className='flex justify-end gap-2 '>
                        <button onClick={() => deleteTask(id)} className='bg-gradient-to-l border border-red-900 from-red-700 to-orange-00 px-2 py-0.5 rounded-lg  text-purple-100'>Delete</button>
                        <button onClick={() => editTask} className='bg-blue-400 px-3 py-0.5 rounded-lg border border-blue-700 bg-gradient-to-r from-blue-600 to-purple-500 text-white'>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
