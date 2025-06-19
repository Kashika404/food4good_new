
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const AvailableDonationCard = ({ donation, onClaim, buttonText = "Claim Donation", isButtonDisabled = false }) => {

  const getDaysLeft = (date) => {
    if (!date) return null;
    const diffDays = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  const daysLeft = getDaysLeft(donation.expiryDate);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <img className="h-48 w-full object-cover" src={donation.imageUrl} alt={donation.title} />
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-neutral-500">{donation.category} ({donation.type})</p>
        <h3 className="text-xl font-semibold text-neutral-800 tracking-tight mt-1">{donation.title}</h3>
        
        <div className="mt-2 text-md text-neutral-700 flex-grow">
            <span className="font-medium">Quantity:</span> 
       
            {donation.type === 'Cooked' && donation.quantity.value ? `${donation.quantity.value} ${donation.quantity.unit}` : donation.quantity}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-neutral-600 space-y-2">
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                <span>{donation.distance} away</span>
            </div>
            {daysLeft !== null && (
                <p>Expires in: <span className="font-bold">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</span></p>
            )}
        </div>
      </div>
      <div className="px-5 pb-5 mt-auto">
       
          <button 
            onClick={() => onClaim(donation._id)} 
            disabled={isButtonDisabled}
            className={`w-full font-semibold py-2 rounded-lg transition-colors shadow-md ${
              isButtonDisabled 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg'
            }`}
          >
              {buttonText} 
          </button>
      </div>
    </div>
  );
};

export default AvailableDonationCard;