import React from 'react'

const Task = ({ title, subtitle }) => {
    return (
        <div className='bg-gray-900 w-full px-3 py-3 rounded-md flex flex-col gap-4'>
            <div className=' flex flex-col gap-3 '>
                <p className='text-white font-bold text-xl sm:text-2xl'>title</p>
                <p className='text-gray-200 font-bold text-xs sm:text-sm'>subtitle</p>
            </div>
            <div className='flex justify-end gap-2'>
                <button className='bg-red-600 px-2 py-0.5 rounded-lg'>Delete</button>
                <button className='bg-blue-400 px-2 py-0.5 rounded-lg'>Edit</button>
            </div>
        </div>
    )
}

export default Task
