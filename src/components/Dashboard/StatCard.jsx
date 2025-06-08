import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/70 p-4 rounded-lg shadow-sm flex items-center space-x-4">
    <div className="bg-orange-100 p-3 rounded-full">
      <FontAwesomeIcon icon={icon} className="text-orange-500 text-xl" />
    </div>
    <div>
      <p className="text-sm text-neutral-600">{title}</p>
      <p className="text-2xl font-bold text-neutral-800">{value}</p>
    </div>
  </div>
);

export default StatCard;