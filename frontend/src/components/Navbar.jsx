import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="flex justify-center gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className="flex justify-start items-center w-3/5 px-2 rounded-full bg-gray-200 border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" value="Search term" onFocus={() => navigate('/search')} className="w-full bg-gray-200 p-2 outline-none" />
            </div>
            <div className="flex gap-3">
                {/* Causing errors, fix it by copying code from the repo */}

                {user && <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                    <img src={user.image} alt="user-pic" className="w-14 h-14 rounded-full " />
                </Link>}


                <Link to={`create-pin`} className="bg-gray-200 text-black rounded-full w-12 h-12 md:w-14 md:h-14 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            </div>

        </div>

    )


}

export default Navbar