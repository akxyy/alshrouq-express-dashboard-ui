
import React from 'react';
import { X, User, Car } from 'lucide-react';
import { Order } from './Dashboard';

interface OrderDetailsViewProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsView = ({ order, onClose }: OrderDetailsViewProps) => {
  if (!order) return null;

  const statusSteps = [
    { name: 'Pending', completed: true },
    { name: 'Picked Up', completed: false },
    { name: 'In Transit', completed: false },
    { name: 'Delivered', completed: false },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white z-40 rounded-lg shadow-xl border w-96 max-h-[60vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-end p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Order Header */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">{order.name}</h3>
              <p className="text-sm text-gray-500">{order.id}</p>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Delivery Status</p>
                <p className="text-xs text-gray-500">Pending Driver Acceptance</p>
              </div>
            </div>

            {/* Horizontal Status Steps */}
            <div className="flex items-center justify-between relative">
              {statusSteps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center relative flex-1">
                  {/* Connecting Line */}
                  {index < statusSteps.length - 1 && (
                    <div 
                      className={`absolute top-3 left-1/2 w-full h-0.5 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      style={{ 
                        left: '50%',
                        right: '-50%',
                        width: 'calc(100% - 12px)',
                        marginLeft: '6px'
                      }}
                    />
                  )}
                  
                  {/* Circle */}
                  <div className={`w-6 h-6 rounded-full border-2 relative z-10 bg-white ${
                    step.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`} />
                  
                  {/* Step Name */}
                  <span className={`text-xs mt-2 text-center ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`} style={{ maxWidth: '60px', lineHeight: '1.2' }}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900 text-sm">{order.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-xs text-gray-500">Pending Driver Acceptance</span>
              </div>
            </div>
            
            <div className="space-y-1 text-xs text-gray-600">
              {order.customerAddress && (
                <p><span className="font-medium">Address:</span> {order.customerAddress}</p>
              )}
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
