
import React from 'react';
import { User, Bell, CircleDot, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 bg-gradient-to-b from-red-600 to-red-900 rounded-lg m-2 flex flex-col items-center py-6 space-y-6">
      <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">AE</span>
      </div>
      
      {/* Applications icon at the top */}
      <div className="flex flex-col space-y-6">
        <button className="w-10 h-10 bg-red-700 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
          <CircleDot className="w-5 h-5 text-gray-300" />
        </button>
        
        {/* Moved existing icons down */}
        <button className="w-10 h-10 bg-red-700 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
          <User className="w-5 h-5 text-gray-300" />
        </button>
        
        <button className="w-10 h-10 bg-red-700 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
        
        {/* Additional icon below */}
        <button className="w-10 h-10 bg-red-700 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
          <Settings className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
