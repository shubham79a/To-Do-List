import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

export const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL


    // passing the credentials like token to backend for security
    axios.defaults.withCredentials = true

    const [tasks, setTasks] = useState()
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
                console.log(response.data.message)
            }
            console.log(response.data)
            console.log(response);

        } catch (error) {
            console.log(error)
        }

    }


    // get auth status of user while loading the site 
    const getAuthStatus = async (req, res) => {
        try {
            const response = await axios.get(backendUrl + '/api/user/auth-status', {}, {})
            if (response.data.success) {
                setIsLoggedIn(true)
                getAllTask()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuthStatus()
    })

    const value = {
        backendUrl, isLoggedIn, setIsLoggedIn
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

