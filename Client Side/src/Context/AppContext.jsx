import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL


    // passing the credentials like token to backend for security
    axios.defaults.withCredentials = true

    const [tasks, setTasks] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState()


    // get all the tasks of the logged in user
    const getAllTask = async () => {
        try {
            // Send the session token to your backend
            const response = await axios.get(backendUrl + '/api/task/all-task', {}, {})
            if (response.data.success) {
                setTasks(response.data.tasks)
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }

    }


    // get auth status of user while loading the site 
    const getAuthStatus = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/auth-status', {}, {})
            if (response.data.success) {
                setIsLoggedIn(true)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getUserDetails = async (req, res) => {
        try {

            const response = await axios.get(backendUrl + '/api/user/user-data')
            if (response.data.success) {
                setUserData(response.data.userData)
                console.log(response.data)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllTask()
        getUserDetails()
    }, [])

    useEffect(() => {
        getAuthStatus()
    })

    const value = {
        backendUrl, isLoggedIn, setIsLoggedIn, tasks, getAllTask,
        userData, getUserDetails
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

