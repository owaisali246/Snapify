import React, { useState, useEffect } from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { useParams, useNavigate } from 'react-router-dom'
import { client } from '../client'
import { googleLogout } from '@react-oauth/google'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const UserProfile = ({ originalUser }) => {

    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created')
    const [activeBtn, setActiveBtn] = useState('created')
    const navigate = useNavigate();
    const { userId } = useParams()

    const activeBtnStyles = 'bg-red-500 mx-1 text-white font-bold p-2 outline-none rounded-full w-20'
    const notActiveBtnStyles = 'bg-primary mx-1 text-black font-bold p-2 outline-none rounded-full w-20'

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query).then((response) => {
            setUser(response[0])
        })

    }, [userId])

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)

            client.fetch(createdPinsQuery).then((response) => {
                setPins(response)
            })
        }
        else if (text === 'Saved') {
            const savedPinsQuery = userSavedPinsQuery(userId)

            client.fetch(savedPinsQuery).then((response) => {
                setPins(response)
            })
        }
    }, [text, userId])


    if (!user) {
        return <Spinner message='Loading Profile...' />

    }

    return (
        <div className='relative pb-2 h-full justify-center items-center'>
            <div className='flex flex-col pb-5'>
                <div className='relative flex flex-col mb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src="https://unsplash.it/1600/900" alt="Banner pic"
                            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
                        />
                        <img src={user.image} alt="user-pic"
                            className='rounded-full w-40 h-40 -mt-20 shadow-xl object-cover'
                        />
                        <h1 className='font-bold text-3xl text-center mt-3 '>{user.userName}</h1>
                        <div className='absolute top-0 z-1 right-0 p-2'>
                            {originalUser && userId === originalUser._id && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        googleLogout()
                                        localStorage.clear()
                                        navigate('/login')
                                    }}
                                    className='bg-red-500 hover:bg-red-600 text-white font-semibold active:bg-red-700 flex justify-center items-center px-3 py-2 rounded-full cursor-pointer outline-none shadow-md'>
                                    <IoMdLogOut className='mr-2 text-2xl' /> Logout
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button type='button' onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn('created')
                        }} className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}>
                            Created
                        </button>
                        <button type='button' onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn('saved')
                        }} className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}>
                            Saved
                        </button>
                    </div>
                    {pins?.length > 0 ? (

                        <div className='px-2'>
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                            No Pins Found!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile