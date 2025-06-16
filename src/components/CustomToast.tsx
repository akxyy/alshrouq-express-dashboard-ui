
import React, { useEffect, useState } from 'react';

interface CustomToastProps {
  isVisible: boolean;
  onClose: () => void;
  orderId: string;
}

const CustomToast = ({ isVisible, onClose, orderId }: CustomToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="text-sm font-medium mb-1">New Order</div>
        <div className="text-xs text-gray-300">
          New order created with id: {orderId}
        </div>
        {/* <div className="text-xs text-gray-400 mt-1">
          via alshrouqdelivery.com
        </div> */}
      </div>
    </div>
  );
};

export default CustomToast;
