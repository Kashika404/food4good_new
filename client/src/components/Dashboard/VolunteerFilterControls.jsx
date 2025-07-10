import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const VolunteerFilterControls = ({ searchTerm, setSearchTerm, urgencyFilter, setUrgencyFilter, sortMethod, setSortMethod }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-white/60 rounded-xl shadow-sm">
      
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-orange-300 focus:border-orange-500"
        />
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
      
 
      <div className="relative">
        <select 
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-orange-500 focus:border-orange-500 bg-white"
        >
          <option value="All">All Urgencies</option>
          <option value="Urgent">Urgent</option>
          <option value="Today">Today</option>
          <option value="Flexible">Flexible</option>
        </select>
        <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
      
      
      <div className="relative">
        <select 
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-orange-400 focus:border-orange-500 bg-white"
        >
          <option value="distance-asc">Sort by Distance (Nearest)</option>
          <option value="newest">Sort by Newest</option>
          <option value="urgency">Sort by Urgency</option>
        </select>
        <FontAwesomeIcon icon={faSortAmountDown} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
    </div>
  );
};

export default VolunteerFilterControls;
