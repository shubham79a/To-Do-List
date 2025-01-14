
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import Task from '../comonents/Task';
import axios from 'axios';
import Navbar from '../comonents/Navbar';
import { toast } from 'react-toastify';

const Home = () => {
    const { backendUrl, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [state, setState] = useState('Login')


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {

            axios.defaults.withCredentials = true

            if (state === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (response.data.success) {
                    toast.success(response.data.message)
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
                }
                else {
                    toast.error(response.data.message)
                }
            }



        } catch (error) {
            toast.error(error.message)
        }

    }


    return (
        <div className=''>


            {/* before login */}

            {!isLoggedIn
                && (
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

                    <div className='flex flex-col gap-4'>
                        <div className='mx-[8%] sm:mx-52 lg:mx-96  '>
                            <Task
                                title={"Geography"}
                                subtitle={"to Completed the map and all stuff"}
                            />
                            <Task
                                title={"Geography"}
                                subtitle={"to Completed the map and all stuff"}
                            />
                        </div>
                    </div>
                </>
            }




        </div>

    )
}

export default Home
