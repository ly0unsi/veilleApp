import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import AuthApi from '../../api/AuthApi'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [loading, setloading] = useState(false)
    const [errors, seterrors] = useState({})
    const { token } = useParams()
    const [formdata, setformdata] = useState({
        email: "",
        token: "",
        password: "",
        password_confirmation: ""
    })
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const handleSubmit = async () => {
        setloading(true)
        try {
            await AuthApi.csrf()
            await AuthApi.reset(formdata)
            navigate('/login')
            setloading(false)
        } catch (error) {
            if (error?.response?.status == 422) {
                seterrors(error.response.data.errors)
                if (error.response.data.errors.email) {
                    toast.error("Token is invalid", {
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
            console.log("error", error);
            setloading(false)
        }
    }
    useEffect(() => {
        setformdata({ ...formdata, email: searchParams.get('email'), token })
    }, [])

    return (
        <div className="w-[40%] mx-auto animate__animated animate__fadeIn animate__fast">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Password
                    </label>
                    <input value={formdata.password} onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                        className={`${errors.password && "border border-red-500 "} shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        type="password" placeholder="Password" />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password Confirmation
                    </label>
                    <input
                        value={formdata.password_confirmation}
                        onChange={(e) => setformdata({ ...formdata, password_confirmation: e.target.value })}
                        className={`shadow appearance-none ${errors.password && "border border-red-500 "}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password" type="password" placeholder="Confirmation" />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

                </div>
                <div className='justify-center text-center'>
                    <button onClick={handleSubmit} className="block mb-3  bg-blue-500 w-[90%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        {
                            loading ? <ImSpinner2 className='mx-auto animate-spin my-1' /> : "Reset"
                        }

                    </button>

                </div>


            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default ResetPassword