import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ApprovalModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md text-center p-8 transform transition-all animate-fadeInDown">
                <FontAwesomeIcon icon={faCheckCircle} className="text-7xl text-green-500 mb-5" />
                <h1 className="text-3xl font-bold text-neutral-800">Account Approved!</h1>
                <p className="text-lg text-neutral-600 mt-3">
                    Welcome to the Food4Good community! We're thrilled to have you on board.
                </p>
                <p className="text-md text-neutral-500 mt-2">
                    You now have full access to your dashboard. Let's make a difference, together.
                </p>
                <button
                    onClick={onClose}
                    className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-full w-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Let's Get Started!
                </button>
            </div>
        </div>
    );
};

export default ApprovalModal;