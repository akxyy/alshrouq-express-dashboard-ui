
import React, { useEffect, useRef } from 'react';
import { User, Car } from 'lucide-react';
import { Order } from './Dashboard';

interface OrderDetailsViewProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsView = ({ order, onClose }: OrderDetailsViewProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (order) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [order, onClose]);

  if (!order) return null;

  const statusSteps = [
    { name: 'Order Accepted', completed: true },
    { name: 'Assigned', completed: false },
    { name: 'Accepted', completed: false },
    { name: 'Operation at Pickup', completed: false },
    { name: 'Picked', completed: false },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white z-40 rounded-lg shadow-xl border w-[520px] max-h-[60vh] flex flex-col" ref={modalRef}>
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Status Steps - moved to the very top */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="relative">
              {/* Connecting Line Background */}
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-300"></div>
              
              <div className="flex justify-between items-start relative">
                {statusSteps.map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center relative">
                    {/* Circle */}
                    <div className={`w-6 h-6 rounded-full border-2 relative z-10 bg-white ${
                      step.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`} />
                    
                    {/* Step Name */}
                    <span className={`text-xs mt-2 text-center leading-tight ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`} style={{ maxWidth: '70px' }}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Header */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">{order.name}</h3>
              <p className="text-sm text-gray-500">{order.id}</p>
              <div className="mt-1">
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                  Pending Driver Acceptance
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Car className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Delivery Status</p>
                </div>
              </div>
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                Pending Driver Acceptance
              </span>
            </div>
          </div>

          {/* See More */}
          <div className="flex justify-center">
            <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;
