


import React from 'react';
import DonationCard from './DonationCard';

const DonationList = ({ donations, onUpdateQuantity, onRemoveItem }) => {
  return (
    <>
      {donations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donations.map(donation => (
            <DonationCard 
                key={donation.id} 
                donation={donation} 
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
          <h3 className="text-xl font-semibold text-neutral-700">Your Donation List is Empty</h3>
          <p className="text-neutral-500 mt-2">Use the "Quick Add" form or "Make a Full Donation" to add items you'd like to donate.</p>
        </div>
      )}
    </>
  );
};

export default DonationList;

