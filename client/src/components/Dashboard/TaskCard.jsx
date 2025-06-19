


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBoxOpen, faClock, faRoute } from '@fortawesome/free-solid-svg-icons';


const TaskCard = ({ task, onTaskAction }) => {
  const statusStyles = {
    Urgent: 'bg-red-100 text-red-800 border-red-300',
    Today: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Flexible: 'bg-blue-100 text-blue-800 border-blue-200',
    Assigned: 'bg-purple-100 text-purple-800 border-purple-300',
    Completed: 'bg-gray-200 text-gray-700 border-gray-300'
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">{task.title}</h3>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[task.urgency] || statusStyles[task.status]}`}>
            {task.urgency}
          </span>
        </div>

    
        <div className="mt-2 text-sm text-neutral-600 space-y-2">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1" />
            <div><span className="font-semibold">From:</span> {task.from}</div>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mt-1" />
            <div><span className="font-semibold">To:</span> {task.to}</div>
          </div>
        </div>
        
       
        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-neutral-600 space-y-2 flex-grow">
           <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faRoute} className="text-gray-400 w-5 text-center" />
            <span>Total Distance: <span className="font-bold">{task.distance}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 w-5 text-center" />
            <span>Items: <span className="font-bold">{task.items}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faClock} className="text-gray-400 w-5 text-center" />
            <span>Time Window: <span className="font-bold">{task.timeWindow}</span></span>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5 mt-auto">
        
          <button 
            onClick={() => onTaskAction(task.id, task.status)}
            disabled={task.status === 'Completed'}
            className={`w-full font-semibold py-2 rounded-full transition-colors shadow-md hover:shadow-lg ${
                task.status === 'Assigned' ? 'bg-green-500 hover:bg-green-600 text-white' :
                task.status === 'Completed' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                'bg-orange-400 hover:bg-orange-600 text-white'
            }`}
          >
              {task.status === 'Assigned' ? 'Mark as Complete' : 
               task.status === 'Completed' ? 'Completed' : 
               'Accept Task'}
          </button>
      </div>
    </div>
  );
};

export default TaskCard;