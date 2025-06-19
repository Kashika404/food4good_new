import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const ReceiverFilterControls = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, sortMethod, setSortMethod, categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-white/60 rounded-xl shadow-sm">
     
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search by food name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
        />
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
      
     
      <div className="relative">
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-orange-500 focus:border-orange-500 bg-white"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
  
      <div className="relative">
        <select 
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-orange-500 focus:border-orange-500 bg-white"
        >
          <option value="distance-asc">Sort by Distance (Nearest)</option>
          <option value="expiry-asc">Sort by Expiry (Soonest)</option>
          <option value="title-asc">Sort by Name (A-Z)</option>
        </select>
        <FontAwesomeIcon icon={faSortAmountDown} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>
    </div>
  );
};

export default ReceiverFilterControls;
