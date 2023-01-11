import React, { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownload } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser';


const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

    const [postHovered, setPostHovered] = useState(false);

    const navigate = useNavigate();

    const user = fetchUser();

    const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.sub)?.length);

    const savePin = (id) => {
        if (!alreadySaved && user) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.sub
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                })
        }
    }
    const deletePin = (id) => {
        client.delete(id).then(() => { window.location.reload() })
    }

    return (
        <div className="mx-2 my-3 bg-transparent ">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto shadow-xl hover:shadow-2xl rounded-lg overflow-hidden"
            >
                {image && (
                    <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />)}
                {postHovered && (
                    <div
                        className="absolute hover:bg-blackOverlay2 top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50  transition-all duration-500 ease-in-out"
                        style={{ height: '100%' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }} style={{ marginLeft: '3px' }}
                                    className="bg-red-600 w-8 h-8 p-1 rounded-full flex items-center justify-center text-white text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                ><MdDownload />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type='button' className='flex items-center bg-red-500 opacity-70 hover:opacity-100 text-white whitespace-nowrap font-medium px-3 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e) => { e.stopPropagation() }}>
                                    {save?.length} <BsBookmarkFill className='text-lg ml-2' />
                                </button>
                            ) : (
                                <button type='button' className='bg-red-500 flex items-center opacity-70 hover:opacity-100 text-white text-base font-medium px-3 py-1 rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                >
                                    {!save ? 0 : save?.length} <BsBookmark className='text-lg ml-2 my-1' />
                                </button>
                            )}

                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {destination && (
                                <a href={destination} rel="noreferrer"
                                    target='_blank'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }} style={{ marginLeft: '3px' }}
                                    className='bg-white flex items-center gap-2 text-black text-sm font-normal py-1 px-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md whitespace-nowrap'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}...
                                </a>
                            )}
                            {postedBy?._id === user?.sub && (
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    deletePin(_id);
                                }}
                                    type='button' className="bg-white w-8 h-8 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 ml-2 items-center bg-transparent'>
                <img src={postedBy?.image} alt="user profile" className='w-8 h-8 bg-transparent rounded-full object-cover' />
                <p className='font-semibold capitalize bg-transparent'>{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin