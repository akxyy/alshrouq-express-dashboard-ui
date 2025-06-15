
import React from 'react';
import { User, Bell } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center py-6 space-y-6">
      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">AE</span>
      </div>
      
      <div className="flex flex-col space-y-4">
        <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors">
          <User className="w-5 h-5 text-gray-300" />
        </button>
        
        <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
