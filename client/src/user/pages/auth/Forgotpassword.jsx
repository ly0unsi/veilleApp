import React, { useState } from 'react'
import AuthApi from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { ImSpinner2 } from 'react-icons/im'

const Forgotpassword = () => {
    const [email, setemail] = useState("")
    const [loading, setloading] = useState(false)
    const [errors, seterrors] = useState({})
    const handleSubmit = async () => {
        setloading(true)
        await AuthApi.csrf()
        try {
            await AuthApi.forget(email)
            toast.success("We have sent reset link", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setloading(false)
        } catch (error) {
            setloading(false)
            if (error?.response?.status == 422) {
                seterrors(error.response.data.errors)
            } else {
                console.log(error);
                toast.error("Error while sending email", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                seterrors({})
            }
            console.log("error", error);
            setloading(false)
        }
    }
    return (
        <div className="md:w-[40%] w-full m-auto mt-[10%] animate__animated animate__fadeIn animate__fast">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input value={email} onChange={(e) => setemail(e.target.value)}
                        className={`shadow appearance-none ${errors.email && "border border-red-500"}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        id="username" type="text" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>

                <div className='justify-center text-center'>
                    <button onClick={handleSubmit} className="block mb-3  bg-blue-500 w-[90%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        {
                            loading ? <ImSpinner2 className='mx-auto animate-spin my-1' /> : "Submit"
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

export default Forgotpassword