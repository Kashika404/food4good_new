import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const ProfileMenu = ({ onLogout }) => {
  return (
    <div 
      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-30"
      
      style={{ animation: 'fadeInDown 0.2s ease-out' }}
    >
      <div className="p-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
        >
          <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5" />
          <span>My Profile</span>
        </Link>
        <Link 
          to="/settings" 
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


export default ProfileMenu;
