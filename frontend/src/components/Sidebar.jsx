import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import logo from '../assets/SnapifyLogo.png'
import { categories } from '../utils/data'

const isNotActiveStyle = 'flex items-center px-5 gap-3 font-semibold text-gray-700 hover:text-black transition-all duration-75 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold text-red-600 border-r-2 border-red-500 transition-all duration-75 ease-in-out capitalize';

const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    };
    return (
        <div className="flex flex-col justify-between shadow-2xl bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col mb-5">
                <Link
                    to="/"
                    className="flex justify-items-center-center px-5 gap-2 mx-auto my-6 pt-1 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo" className="w-36" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? isActiveStyle : isNotActiveStyle
                        }
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-center font-semibold text-lg">
                        Discover categories
                    </h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) =>
                                isActive ? isActiveStyle : isNotActiveStyle
                            }
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            <img
                                src={category.image}
                                className="w-8 h-8 rounded-full shadow-sm"
                            />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSidebar}
                >
                    <img
                        src={user.image}
                        className="w-10 h-10 rounded-full"
                        alt="user-profile"
                    />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    );
}

export default Sidebar