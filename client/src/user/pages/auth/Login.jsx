import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthApi from '../../api/AuthApi'
import { ImSpinner2 } from 'react-icons/im';


import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, CloseCircleOutlined, LockOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/AuthAction';
import { Input } from 'antd';

const Login = ({ mode = 'user' }) => {

    const [formdata, setformdata] = useState({ email: "", password: "", mode })

    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleToastErrors = (error) => {

        if (error.response.status == 426) {
            const msg = error.response.data
            toast.error(msg, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (error.response.status == 427) {
            const msg = error.response.data
            toast.error(msg, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (error.response.status == 409) {
            const msg = error.response.data
            toast.error(msg, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error("Identifiants incorrects", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleSubmit = async () => {
        setloading(true)
        try {
            await AuthApi.csrf()
            await AuthApi.signin(formdata)
            await dispatch(getUser())
            if (mode == 'user') navigate('/');
            else navigate('/admin');
            setloading(false)
        } catch (error) {
            seterror(true)
            setloading(false)
            handleToastErrors(error)
        }
    }


    return (
        <div className="w-[40%] mx-auto animate__animated animate__fadeIn animate__fast">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>

                    <Input
                        value={formdata.email}
                        onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                        placeholder="Email"
                        status={error && "error"} prefix={error ? <CloseCircleOutlined /> : <MailOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'

                    />

                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe
                    </label>
                    <Input.Password
                        value={formdata.password}
                        onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                        placeholder="Mot de passe"
                        status={error && "error"} prefix={error ? <CloseCircleOutlined /> : <LockOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'

                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                    />



                </div>
                <div className='justify-center text-center'>
                    <button onClick={handleSubmit} className="block mb-3 hover:opacity-[85%]  bg-primary w-[90%] mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        {
                            loading ? <ImSpinner2 className='mx-auto animate-spin my-1' /> : "Se connecter"
                        }

                    </button>
                    <Link className="font-semibold mx-auto  text-sm text-blue-500 hover:text-blue-800" to="/forgot">
                        Mot de passe oublié?
                    </Link>
                    {
                        mode == 'user' && <Link className="block mx-auto  font-semibold text-sm text-blue-500 " to="/signup">
                            Vous n'avez pas de compte ?
                        </Link>
                    }

                </div>


            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default Login