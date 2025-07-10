import React from 'react';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckEmailPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-6xl text-orange-500 mb-6" />
            <h1 className="text-3xl font-bold text-neutral-800">Please Check Your Email</h1>
            <p className="text-lg text-neutral-600 mt-3 max-w-lg">
                Thank you for registering! We've sent a verification link to your email address.
            </p>
            <p className="text-md text-neutral-500 mt-2 max-w-lg">
                Please click the link in the email to activate your account. You may need to check your spam folder.
            </p>
        </div>
    );
};

export default CheckEmailPage;