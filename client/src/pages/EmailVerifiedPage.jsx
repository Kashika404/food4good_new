// import React, { useEffect, useState } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// const EmailVerifiedPage = () => {
//     const [searchParams] = useSearchParams();
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const success = searchParams.get('success') === 'true';
//         setIsSuccess(success);
//         setMessage(searchParams.get('message') || (success ? 'Your email has been successfully verified!' : 'Verification failed. The link may be invalid or expired.'));
//     }, [searchParams]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
//             <FontAwesomeIcon icon={isSuccess ? faCheckCircle : faTimesCircle} className={`text-7xl mb-6 ${isSuccess ? 'text-green-500' : 'text-red-500'}`} />
//             <h1 className="text-3xl font-bold text-neutral-800">{isSuccess ? 'Verification Successful!' : 'Verification Failed'}</h1>
//             <p className="text-lg text-neutral-600 mt-3 max-w-lg">{message}</p>
//             {isSuccess && (
//                 <p className="text-md text-neutral-500 mt-2">You can now log in to your account.</p>
//             )}
//             <Link to="/" className="mt-8 bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
//                 {isSuccess ? 'Proceed to Login' : 'Back to Home'}
//             </Link>
//         </div>
//     );
// };

// export default EmailVerifiedPage;


import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const EmailVerifiedPage = () => {
    const { url } = useContext(AppContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // State to manage the verification process: 'verifying', 'success', or 'failed'
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('Verifying your email, please wait...');

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setStatus('failed');
                setMessage('No verification token found. The link may be incomplete.');
                return;
            }

            try {
                // This POST request is safe from email security scanners
                const response = await axios.post(`${url}/api/user/verify-email`, { token });
                if (response.data.success) {
                    setStatus('success');
                    setMessage('Your email has been successfully verified! Redirecting you to login...');
                    // Redirect to home/login after a short delay
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                setStatus('failed');
                setMessage(error.response?.data?.message || 'Verification failed. The link may be invalid or expired.');
            }
        };

        verifyToken();
    }, []); // This effect runs only once when the page loads

    // Render different content based on the verification status
    const renderContent = () => {
        switch (status) {
            case 'success':
                return { icon: faCheckCircle, color: 'text-green-500', title: 'Verification Successful!' };
            case 'failed':
                return { icon: faTimesCircle, color: 'text-red-500', title: 'Verification Failed' };
            default: // 'verifying'
                return { icon: faSpinner, color: 'text-orange-500', title: 'Verifying...' };
        }
    };

    const { icon, color, title } = renderContent();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-slate-50">
            <FontAwesomeIcon icon={icon} className={`text-7xl mb-6 ${color} ${status === 'verifying' && 'animate-spin'}`} />
            <h1 className="text-3xl font-bold text-neutral-800">{title}</h1>
            <p className="text-lg text-neutral-600 mt-3 max-w-lg">{message}</p>
            {status !== 'verifying' && (
                 <Link to="/" className="mt-8 bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                    Back to Home
                </Link>
            )}
        </div>
    );
};

export default EmailVerifiedPage;