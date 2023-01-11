import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import PinDetail from '../components/PinDetail';
import CreatePin from '../components/CreatePin';
import Search from '../components/Search';
import NotFound from '../components/NotFound';

const Pins = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="px-2 md:px-5">
            <div className=" bg-white top-32 md:top-0 md:left-[62%] md:translate-x-[-50%] z-10 w-[100%] fixed" >
                <Navbar className='' searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
            </div>

            <div className="h-full mt-24">
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/category/:categoryId" element={<Feed />} />
                    <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
                    <Route path="/create-pin" element={<CreatePin user={user && user} />} />
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>

    )
}

export default Pins