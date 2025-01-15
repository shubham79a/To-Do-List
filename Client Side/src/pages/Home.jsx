
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import Task from '../comonents/Task';
import axios from 'axios';
import Navbar from '../comonents/Navbar';
import { toast } from 'react-toastify';

const Home = () => {
    const { backendUrl, isLoggedIn, getUserDetails, setIsLoggedIn, tasks, getAllTask } = useContext(AppContext)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [inputTitle, setInputTitle] = useState('')
    const [inputSubtitle, setInputSubtitle] = useState('')


    const [state, setState] = useState('Login')


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {

            axios.defaults.withCredentials = true

            if (state === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (response.data.success) {
                    navigate('/')
                    toast.success(response.data.message)
                    getUserDetails()

                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setIsLoggedIn(true)
                    getUserDetails()
                }
                else {
                    toast.error(response.data.message)
                }
            }



        } catch (error) {
            toast.error(error.message)
        }

    }


    const addTask = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/task/add',
                { title: inputTitle, subtitle: inputSubtitle }
            )
            if (response.data.success) {

                getAllTask()
                setInputTitle('')
                setInputSubtitle('')
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }


    return (
        <div className=''>


            {/* before login */}

            {!isLoggedIn && (
                <>
                    <div>
                        <div className=' h-screen flex flex-col justify-center'>
                            {state === 'Login' ?
                                <p className='text-center text-black mb-4  text-xl sm:text-2xl font-bold'>Sign In to your account</p> :
                                <p className='text-center text-black mb-4 text-xl sm:text-2xl font-bold'>Sign Up to your account</p>
                            }
                            {state === 'Login' ?
                                <p className='text-center text-black mb-4  text-sm sm:text-xl font-medium'>Login to your account</p> :
                                <p className='text-center text-black mb-4 text-sm sm:text-xl font-medium'>Create your account</p>
                            }
                            <form onSubmit={onSubmitHandler} className='px-[6%] sm:px-[30%]'>
                                <div className=' '>
                                    <div className='flex flex-col gap-5 mb-4'>
                                        {state === 'Login' ?
                                            null :
                                            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2 border border-black outline-none  text-black' type="text" placeholder='name' />
                                        }
                                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-4 py-2  border border-black outline-none text-black' type="email" placeholder='email address' />
                                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-4 py-2  border border-black outline-none text-black' type="password" placeholder='password' />
                                    </div>

                                    <div className='flex justify-between mb-1.5'>
                                        <p className='cursor-pointer text-sm'>Forget Password?</p>
                                        <p className='cursor-pointer text-sm' onClick={() => (
                                            state === 'Sign Up' ? setState('Login') : setState('Sign Up')
                                        )} >
                                            {state === 'Login' ? 'Create account' : 'Login'}
                                        </p>
                                    </div>
                                    <button className='bg-black text-white font-semibold w-full px-3 py-1.5  border border-black outline-none mb-8'>{state}</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </>
            )}



            {/* after login */}

            {
                isLoggedIn
                &&
                <>
                    <Navbar />

                    <div className='mx-[4%] sm:mx-[20%] lg:mx-[25%] mb-5 '>
                        <div className='flex flex-col bg-gradient-to-r from-green-500 to-gray-800  py-4 px-10 gap-4'>
                            <input className='px-2.5 py-1 rounded-sm outline-none text-base' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} type="text" placeholder='Enter your title' />
                            <input className='px-2.5 py-1 rounded-sm outline-none text-base' value={inputSubtitle} onChange={(e) => setInputSubtitle(e.target.value)} type="text" placeholder='Enter your subtitle' />
                            <div className='flex justify-end'>
                                <button onClick={addTask} className='bg-gradient-to-br border border-green-950 from-slate-900 to-green-00 text-white px-7 py-1 rounded-sm'>Add Task</button>
                            </div>

                        </div>
                    </div>




                    {/* listing of task  */}
                    {
                        tasks && tasks.map((task, index) => (
                            <div key={index} className='mx-[4%] sm:mx-[20%] lg:mx-[25%]'>
                                <Task
                                    title={task.title}
                                    subtitle={task.subtitle}
                                    createdAt={task.createdAt}
                                    id={task._id}
                                    isCompleted={task.isCompleted}

                                />
                            </div>
                        ))
                    }



                </>
            }




        </div>

    )
}

export default Home
