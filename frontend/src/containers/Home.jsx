import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userQuery } from '../utils/data';
import Pins from './Pins';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import logo from '../assets/logo.png';



const Home = () => {

    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const Login = () => {
        navigate('/login')
    }


    const userInfo = fetchUser();

    useEffect(() => {
        const query = userQuery(userInfo?.sub);

        client.fetch(query)
            .then((data) => {
                setUser(data[0]);
            })
    }, []);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial z-20">
                <Sidebar user={user && user} />
            </div>
            <div className="z-20 flex md:hidden flex-row">
                <div className="px-4 py-2 w-full flex flex-row justify-between items-center shadow-md h-[128px]">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    {user ?
                        (<Link to={`user-profile/${user?._id}`}>
                            <img src={user?.image} alt="logo" className="w-28 rounded-full" />
                        </Link>) : (
                            <button type='button' className='bg-red-500 hover:bg-red-600 active:bg-red-700 ml-3 cursor-pointer text-white font-semibold rounded-full px-5 py-2' onClick={Login}>
                                Login
                            </button>
                        )}
                </div>
                {toggleSideBar && (
                    <div className="fixed w-3/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSideBar} />
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile originalUser={user && user} />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home