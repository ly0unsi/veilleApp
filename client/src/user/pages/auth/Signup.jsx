import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone, CloseCircleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import AuthApi from '../../api/AuthApi'
import { ImSpinner2 } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import zxcvbn from 'zxcvbn';
import { Input } from 'antd';

const Signup = () => {
    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        password: "",
        password_confirmation: ""
    })
    const strength = zxcvbn(formdata.password).score;
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    const [errors, seterrors] = useState({})
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setloading(true)
        try {
            await AuthApi.csrf()
            const { data } = await AuthApi.signup(formdata)
            console.log("user id is ", data.id);
            await AuthApi.sendEmailNotification(data.id)
            // localStorage.setItem("userLogged", 1)
            navigate('/email/notification')
            setloading(false)
        } catch (error) {
            // console.log("error", error);
            setloading(false)
            if (error?.response?.status == 422) {
                seterrors(error.response.data.errors)
            } else {
                console.log(error);
            }

        }
    }
    return (
        <div className="w-[40%] mx-auto animate__animated animate__fadeIn animate__fast">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Prenom
                    </label>
                    <Input
                        value={formdata.firstname}
                        onChange={(e) => setformdata({ ...formdata, firstname: e.target.value })}
                        placeholder="Nom"
                        status={errors.firstname && "error"} prefix={errors.firstname ? <CloseCircleOutlined /> : <UserOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'

                    />
                    {errors.firstname && <p className="text-red-500 text-xs italic animate__animated animate__fadeIn animate__fast">{errors.firstname}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Nom
                    </label>
                    <Input
                        value={formdata.lastname}
                        onChange={(e) => setformdata({ ...formdata, lastname: e.target.value })}
                        placeholder="Nom"
                        status={errors.lastname && "error"} prefix={errors.lastname ? <CloseCircleOutlined /> : <UserOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'

                    />
                    {errors.lastname && <p className="text-red-500 text-xs italic animate__animated animate__fadeIn animate__fast">{errors.lastname}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <Input
                        value={formdata.email}
                        onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                        placeholder="Email"
                        status={errors.email && "error"} prefix={errors.email ? <CloseCircleOutlined /> : <MailOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'

                    />
                    {errors.email && <p className="text-red-500 text-xs italic animate__animated animate__fadeIn animate__fast">{errors.email}</p>}

                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Mot de passe
                    </label>
                    <Input.Password
                        value={formdata.password}
                        onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                        placeholder="Mot de passe"
                        status={errors.password && "error"} prefix={errors.password ? <CloseCircleOutlined /> : <LockOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                        suffix={strength === 4 ? 'Strong' : strength > 2 ? 'Moderate' : 'Weak'}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                    />
                    {errors.password ? <p className="text-red-500 text-xs italic animate__animated animate__fadeIn animate__fast">{errors.password}</p>
                        : formdata.password.length > 0 && <p className={`${strength === 4 ? 'text-green-500' : strength > 2 ? 'text-yellow-500' : 'text-red-500'} text-sm`}> {strength === 4 ? 'Fort' : strength > 2 ? 'Moyen' : 'Faible'}</p>
                    }
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Confirmation du mot de passe
                    </label>
                    <Input.Password
                        value={formdata.password_confirmation}
                        onChange={(e) => setformdata({ ...formdata, password_confirmation: e.target.value })}
                        placeholder="Confirmation du mot de passe"
                        status={errors.password && "error"} prefix={errors.password ? <CloseCircleOutlined /> : <LockOutlined className='text-gray-400' />}
                        className='rounded w-full  text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                        suffix={strength === 4 ? 'Strong' : strength > 2 ? 'Moderate' : 'Weak'}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                    />

                    {errors.password && <p className="text-red-500 text-xs italic animate__animated animate__fadeIn animate__fast">{errors.password}</p>}
                </div>
                <div className='justify-center text-center'>
                    <button
                        onClick={handleSubmit}
                        className="block mb-3 bg-primary  hover:opacity-[85%] w-[90%] mx-auto  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        {
                            loading ? <ImSpinner2 className='mx-auto animate-spin my-1' /> : "S'inscrire"
                        }

                    </button>
                    <Link className="font-semibold mx-auto  text-sm text-blue-500 hover:text-blue-800" to="/login">
                        Vous avez déjà un compte?
                    </Link>

                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default Signup