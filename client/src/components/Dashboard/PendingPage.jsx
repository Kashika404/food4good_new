import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faTruck, faSeedling, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';


const roleConfig = {
    Donor: {
        icon: faSeedling,
        color: 'green',
        title: "Get Ready to Make an Impact!",
        message: "Once approved, you'll be able to easily list surplus food, track your donations, and see the direct impact you're having on the community.",
        preview: (
            <div className="mt-6 p-4 border-2 border-dashed border-green-300/50 rounded-lg w-full max-w-sm bg-green-50/30">
                <h4 className="font-semibold text-green-800">Your Future Dashboard</h4>
                <div className="mt-2 text-left text-sm text-green-700/80 space-y-1">
                    <p>✓ List Cooked & Uncooked Food</p>
                    <p>✓ View Donation History</p>
                    <p>✓ Track Community Impact</p>
                </div>
            </div>
        )
    },
    Receiver: {
        icon: faShoppingBasket,
        color: 'blue',
        title: "Connecting You with Community Support",
        message: "As soon as your account is verified, you can browse available food donations from generous donors in your area and claim what you need for your organization.",
         preview: (
            <div className="mt-6 p-4 border-2 border-dashed border-blue-300/50 rounded-lg w-full max-w-sm bg-blue-50/30">
                <h4 className="font-semibold text-blue-800">Coming Soon</h4>
                 <div className="mt-2 text-left text-sm text-blue-700/80 space-y-1">
                    <p>✓ Browse Available Donations</p>
                    <p>✓ Claim Items for Your Org</p>
                    <p>✓ Coordinate Pickups</p>
                </div>
            </div>
        )
    },
    Volunteer: {
        icon: faTruck,
        color: 'purple',
        title: "Ready to Be a Local Hero?",
        message: "Once your account is approved, you'll be able to see a list of available pickup and delivery tasks. Accept tasks that fit your schedule and become a vital link in our food rescue chain.",
         preview: (
            <div className="mt-6 p-4 border-2 border-dashed border-purple-300/50 rounded-lg w-full max-w-sm bg-purple-50/30">
                <h4 className="font-semibold text-purple-800">Your Future Tasks</h4>
                 <div className="mt-2 text-left text-sm text-purple-700/80 space-y-1">
                    <p>✓ View Open Tasks Nearby</p>
                    <p>✓ Accept Pickup & Delivery Jobs</p>
                    <p>✓ Track Your Completed Tasks</p>
                </div>
            </div>
        )
    }
};


const PendingPage = ({ role }) => {
   
    const config = roleConfig[role] || {
        icon: faHourglassHalf,
        color: 'yellow',
        title: "Account Pending Approval",
        message: "Your account is currently under review by our admin team. You will receive an email notification once your account has been approved.",
        preview: null
    };

    const colorClasses = {
        yellow: 'text-yellow-500',
        green: 'text-green-500',
        blue: 'text-blue-500',
        purple: 'text-purple-500'
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <FontAwesomeIcon icon={config.icon} className={`text-6xl ${colorClasses[config.color]} mb-6`} />
            <h1 className="text-3xl font-bold text-neutral-800">{config.title}</h1>
            <p className="text-lg text-neutral-600 mt-3 max-w-lg">
                {config.message}
            </p>
            
        
            {config.preview}
        </div>
    );
};

export default PendingPage;