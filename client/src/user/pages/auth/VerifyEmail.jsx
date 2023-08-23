import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthApi from '../../api/AuthApi';
import { Button, Result, Spin } from 'antd';

const VerifyEmail = () => {
    const { id } = useParams()
    const [error, seterror] = useState(0)
    useEffect(() => {
        const handleVerifyEmail = async () => {
            try {
                await AuthApi.verifyEmail(id)
                seterror(1)
            } catch (error) {
                seterror(2)
            }
        }
        handleVerifyEmail()
    }, [])

    return (
        <div className={`w-[40%] mx-auto animate__animated animate__fadeIn animate__fast `}>
            <div className={`bg-white shadow-md rounded px-8 mb-4 ${error == 0 ? 'h-[280px]' : "pt-6 pb-8 "}`}>
                {
                    error == 1 ? <Result
                        status="success"
                        title="Votre email a éte verifié avec succés"
                        subTitle="Pour vous connecter, veuillez suivre le lien ci-dessous : "
                        extra={[

                            <Link to="/login" className='block mb-3  bg-blue-500 w-[90%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                aria-current="page"> Se connecter </Link>

                        ]}
                    /> : error == 2 ? <Result
                        status="warning"
                        title="Votre email est deja verifé"
                        extra={
                            <Link to="/login" className='block mb-3  bg-blue-500 w-[90%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                aria-current="page"> Se connecter </Link>
                        }
                    /> : <Spin className='py-20' tip="verification en cours" size="large">
                        <div className="content" />
                    </Spin>
                }
            </div>
        </div>

    )
}

export default VerifyEmail