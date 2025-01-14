import { useCallback, useContext } from "react"
import { AppContext } from "../Context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const Navbar = () => {

    const { backendUrl, setIsLoggedIn } = useContext(AppContext)

    const logout = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/user/logout')
            if (response.data.success) {
                toast.success(response.data.message)
                setIsLoggedIn(false)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex justify-between items-center h-20 bg-gray-800 text-white px-4 sm:px-16 mb-8">
            <div>
                <p className="text-xl sm:text-2xl font-bold font-serif ">To Do List</p>
            </div>
            <div className="flex justify-end gap-4">
                <p className="px-2.5 sm:py-1 sm:px-3 py-0.5 text-lg text-black rounded-full bg-white font-serif font-extrabold ">S</p>
                <button onClick={logout} className="text-lg sm:text-2xl font-serif font-medium ">Logout</button>
            </div>
        </div>
    )
}

export default Navbar
