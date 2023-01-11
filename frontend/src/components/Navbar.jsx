import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();
    const Login = () => {
        navigate('/login')
    }

    // if (!user) return null;

    return (
        <div className=" bg-transparent mx-auto rounded-full flex justify-center px-3 w-max py-1 my-3">
            <div className=" flex justify-start items-center w-[60vw] mr-2 md:mr-0 md:w-[30vw] px-2 py-1 rounded-full box-border h-12 shadow-sm bg-gray-200 hover:bg-gray-300 focus-within:border-2 focus-within:border-red-500">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" value={searchTerm} onFocus={() => navigate('/search')} className="w-[90%] bg-transparent p-2 outline-none" />
            </div>
            <div className="flex gap-3">

                {user ?
                    (<Link to={`user-profile/${user?._id}`} className="hidden md:block md:ml-3">
                        <img src={user.image} alt="user-pic" className="w-12  h-12 rounded-full " />
                    </Link>) : (
                        <button type='button' className='bg-red-500 hover:bg-red-600 active:bg-red-700 hidden md:block ml-3 cursor-pointer text-white font-semibold rounded-full px-4' onClick={Login}>
                            Login
                        </button>
                    )}


                <Link to={`create-pin`} className="bg-gray-200 hover:bg-gray-300 text-black rounded-full w-12 h-12 border-2 border-gray-300 box-border md:w-12 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            </div>

        </div>

    )


}

export default Navbar