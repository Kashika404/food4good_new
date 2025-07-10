import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const EmailVerifiedPage = () => {
    const [searchParams] = useSearchParams();
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const success = searchParams.get('success') === 'true';
        setIsSuccess(success);
        setMessage(searchParams.get('message') || (success ? 'Your email has been successfully verified!' : 'Verification failed. The link may be invalid or expired.'));
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <FontAwesomeIcon icon={isSuccess ? faCheckCircle : faTimesCircle} className={`text-7xl mb-6 ${isSuccess ? 'text-green-500' : 'text-red-500'}`} />
            <h1 className="text-3xl font-bold text-neutral-800">{isSuccess ? 'Verification Successful!' : 'Verification Failed'}</h1>
            <p className="text-lg text-neutral-600 mt-3 max-w-lg">{message}</p>
            {isSuccess && (
                <p className="text-md text-neutral-500 mt-2">You can now log in to your account.</p>
            )}
            <Link to="/" className="mt-8 bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                {isSuccess ? 'Proceed to Login' : 'Back to Home'}
            </Link>
        </div>
    );
};

export default EmailVerifiedPage;