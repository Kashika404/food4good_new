import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// This component will receive an onLogout function prop to handle the logout action
const ProfileMenu = ({ onLogout }) => {
  return (
    <div 
      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-30"
      // Added animation for a smoother appearance
      style={{ animation: 'fadeInDown 0.2s ease-out' }}
    >
      <div className="p-2">
        <Link 
          to="/profile" // Link to the user's profile page
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
        >
          <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5" />
          <span>My Profile</span>
        </Link>
        <Link 
          to="/settings" // Link to a settings page
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
        >
          <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <div className="my-1 border-t border-gray-100"></div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Simple CSS for the animation (add to your main CSS file if you don't have it)
/*
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/

export default ProfileMenu;
