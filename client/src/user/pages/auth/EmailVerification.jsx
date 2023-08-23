import React from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md';
const EmailVerification = () => {
    return (
        <div className="w-[40%] mx-auto animate__animated animate__fadeIn animate__fast ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center ">
                <MdOutlineMarkEmailRead className='m-auto text-[100px] text-blue-500' />
                <p>Lien de confirmation a été envoyé a votre boite mail </p>
            </div>

        </div>
    )
}

export default EmailVerification