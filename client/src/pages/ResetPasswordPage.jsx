import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ResetPasswordPage = () => {
    const { url } = useContext(AppContext);
    const navigate = useNavigate();
    
    // Get the 'id' and 'token' from the URL
    const { id, token } = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            // Send the new password to the backend endpoint, including the id and token from the URL
            const response = await axios.post(`${url}/api/user/reset-password/${id}/${token}`, { password });

            if (response.data.success) {
                setMessage(response.data.message + " You will be redirected to the login page shortly.");
                // Redirect to home/login page after a short delay
                setTimeout(() => {
                    navigate('/'); // Navigate to home, which will prompt login if needed
                }, 4000);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred or the link may have expired. Please try again.");
            console.error("Reset password failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50/50 to-orange-50/50 p-4">
            <form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-slate-500 shadow-xl w-full max-w-md'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Reset Your Password</h1>
                <p className='text-sm text-center mt-2'>Please enter your new password below.</p>
                
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-6'>
                    <img src={assets.lock_icon} alt="lock" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='outline-none text-sm w-full' 
                        placeholder='New Password' 
                        required 
                    />
                </div>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="lock" />
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='outline-none text-sm w-full' 
                        placeholder='Confirm New Password' 
                        required 
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}

                <button type="submit" className='bg-orange-400 w-full text-white py-2 rounded-full mt-6'>
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
