
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
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-40 rounded-lg shadow-xl border w-[520px] max-h-[60vh] flex flex-col"
      ref={modalRef}
    >
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">John</p>
            </div>
          </div>

          {/* Status Steps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="relative">
              {/* Connecting Line Background */}
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-300"></div>

              <div className="flex justify-between items-start relative">
                {statusSteps.map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center relative">
                    {/* Circle */}
                    <div className={`w-6 h-6 rounded-full border-2 relative z-10 bg-white ${step.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                      }`} />

                    {/* Step Name */}
                    <span className={`text-xs mt-2 text-center leading-tight ${step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`} style={{ maxWidth: '70px' }}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="font-medium text-gray-900 text-sm">Unaizah 23</p>
                  <p className="text-sm text-gray-600">{order.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                  Pending Driver Acceptance
                </span>
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                  Pending Driver Acceptance
                </span>
              </div>
            </div>
          </div>

          {/* See More */}
          {/* <div className="flex justify-center">
            <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
              See more
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;
