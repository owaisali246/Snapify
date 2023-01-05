import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { client } from '../client'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from "jwt-decode";

const Login = () => {

    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(jwt_decode(response.credential))

        localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)));

        const { name, picture, sub } = jwt_decode(response.credential)

        const doc = {
            _id: sub,   //! the underscore variables let sanity know which schema are we referring to
            _type: 'user',
            userName: name,
            image: picture,
        };

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    }


    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop={true}
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='bg-blackOverlay flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0'>
                    <div className='p-5'>
                        <img src={logo} width='130px' alt="logo" />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'>
                                    <FcGoogle className='mr-4' /> Sign in with google account
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login