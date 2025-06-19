import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



const uncookedItems = [
    { title: 'Tomatoes', category: 'Vegetables', imageUrl:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiPFjXUsK7ThB2h89CAFSOhGOLWDmz592hag&s'},
    { title: 'Potatoes', category: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2670' },
    { title: 'Onions', category: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b25pb258ZW58MHx8MHx8fDA%3D' },
    { title: 'Apples', category: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGV8ZW58MHx8MHx8fDA%3D' },
    { title: 'Bananas', category: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1640958900081-7b069dd23e9c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Rice', category: 'Grains', imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Wheat Flour', category: 'Grains', imageUrl: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D' },
    { title: 'Lentils (Dal)', category: 'Pulses', imageUrl: 'https://images.unsplash.com/photo-1552585960-0e1069ce7405?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Milk', category: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Eggs', category: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWdnfGVufDB8fDB8fHww' },
];

const commonUnits = ['kg', 'grams', 'litres', 'ml', 'items', 'pieces', 'crates', 'boxes', 'packets'];

const QuickAddForm = ({ onAddDonation }) => {
    const [selectedItem, setSelectedItem] = useState(uncookedItems[0].title);
    const [quantityValue, setQuantityValue] = useState('');
    const [quantityUnit, setQuantityUnit] = useState(commonUnits[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericValue = parseFloat(quantityValue);

        if (!selectedItem) {
            alert('Please select an item.');
            return;
        }
        if (isNaN(numericValue) || numericValue <= 0) {
            alert('Please enter a valid number greater than 0 for the quantity.');
            return;
        }

        const itemDetails = uncookedItems.find(item => item.title === selectedItem);
        const formattedQuantity = `${numericValue} ${quantityUnit}`;

      
        onAddDonation({
            type: 'Uncooked',
            title: itemDetails.title,
            category: itemDetails.category,
            quantity: formattedQuantity,
            imageUrl: itemDetails.imageUrl
        });

        setQuantityValue('');
    };

    return (
        <div className="mb-8 p-4 bg-white/60 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-neutral-700 mb-2">Quick Add Uncooked Item</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
               
                <div className="relative md:col-span-2">
                    <select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500"
                    >
                        {uncookedItems.map(item => (
                            <option key={item.title} value={item.title}>{item.title} ({item.category})</option>
                        ))}
                    </select>
                </div>
                
             
                <div className="relative">
                    <input
                        type="number"
                        placeholder="e.g., 10"
                        value={quantityValue}
                        onChange={(e) => setQuantityValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        min="0.1"
                        step="0.1"
                        required
                    />
                </div>

               
                <div className="relative">
                     <select
                        value={quantityUnit}
                        onChange={(e) => setQuantityUnit(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500"
                     >
                        {commonUnits.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                     </select>
                </div>

                
                <button
                    type="submit"
                    className="md:col-span-4 bg-orange-400 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default QuickAddForm;