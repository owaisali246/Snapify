import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline, MdOutlineImageAspectRatio } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { client, urlFor } from '../client'
import { pinDetailQuery, pinDetailMorePinQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'



const PinDetail = ({ user }) => {

    const [pins, setPins] = useState(null)
    const [pinDetail, setPinDetail] = useState(null)
    const [comment, setComment] = useState('')
    const [addingComments, setAddingComments] = useState(false)
    const { pinId } = useParams();

    const addComment = () => {
        if (comment) {
            setAddingComments(true);

            client
                .patch(pinId)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment('');
                    setAddingComments(false);
                });
            window.location.reload(false);
        }
    };

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId);

        if (query) {
            client.fetch(query)
                .then((data) => {
                    setPinDetail(data[0])

                    if (data[0]) {
                        query = pinDetailMorePinQuery(data[0]);

                        client.fetch(query).then((response) => setPins(response))
                    }
                })
        }
    }

    useEffect(() => {
        fetchPinDetails();
        console.log('Page reloaded successfully');


    }, [pinId])

    if (!pinDetail) return <Spinner message="We are fetching Pin Details..." />

    return (
        <>
            <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
                <div className='flex justify-center items-center md:items-center flex-initial'>
                    <img src={pinDetail?.image && urlFor(pinDetail?.image).url()} alt="Pin expanded"
                        className='rounded-t-3xl rounded-b-xl'
                    />
                </div>
                <div className='w-full p-5 flex-1 xl:min-w-620'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                            <a href={`${pinDetail?.image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => {
                                    e.stopPropagation();
                                }} style={{ marginLeft: '3px' }}
                                className="bg-red-600 w-10 h-10 p-1 rounded-full flex items-center justify-center text-white text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            ><MdDownloadForOffline />
                            </a>
                        </div>
                        <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
                            {pinDetail.destination}
                        </a>
                    </div>
                    <div>
                        <h1 className='text-4xl font-bold break-words mt-3'>{pinDetail.title}</h1>
                        <p className='mt-3'> {pinDetail.about} </p>
                    </div>
                    <div className="max-w-max">
                        <Link to={`user-profile/${pinDetail?.postedBy._id}`} className='flex gap-2 mt-5 items-center bg-white'>
                            <img src={pinDetail?.postedBy?.image} alt="user profile" className='w-10 h-10 rounded-full object-cover' />
                            <p className='font-semibold capitalize'>{pinDetail?.postedBy?.userName}</p>
                        </Link>
                    </div>
                    <h2 className='mt-5 font-bold text-2xl'>Comments</h2>
                    <div className='max-h-370 overflow-y-auto'>
                        {pinDetail?.comments?.map((item) => (
                            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={item.comment}>
                                <img src={item.postedBy.image} alt="User Profile"
                                    className='w-10 h-10 rounded-full cursor cursor-pointer'
                                />
                                <div className='flex flex-col'>
                                    <p className='font-bold'> {item.postedBy.userName} </p>
                                    <p className='font-normal'> {item.comment} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-wrap mt-6 gap-3'>
                        <Link to={`user-profile/${user?._id}`} className=''>
                            <img src={user.image} alt="user profile" className='w-10 h-10 rounded-full cursor-pointer' />
                        </Link>
                        <input type="text" className='flex-1 border-gray-300 font-medium outline-none border-2 p-2 rounded-full focus:border-red-400'
                            placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)}
                        />
                        <button type='button' className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
                            onClick={addComment}
                        >
                            {addingComments ? 'Posting..' : 'Post'}
                        </button>
                    </div>
                </div>
            </div>
            {pins?.length > 0 ? (
                <>
                    <h2 className='text-center font-bold text-2xl mt-8 mb-4'>More like this</h2>
                    <MasonryLayout pins={pins} />
                </>
            ) : (
                <h2 className='text-center font-bold text-2xl mt-8 mb-4'>No more pins like this</h2>
            )}
        </>
    )
}

export default PinDetail