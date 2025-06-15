
import React from 'react';
import { User, Bell, CircleDot, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 bg-gradient-to-b from-red-600 to-blue-800 rounded-lg m-2 flex flex-col items-center py-6 space-y-6">
      <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">AE</span>
      </div>
      
      {/* Applications icon at the top */}
      <div className="flex flex-col space-y-6">
        <button className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110">
          <CircleDot className="w-8 h-8 text-gray-300" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110">
          <Settings className="w-8 h-8 text-gray-300" />
        </button>
      </div>

      {/* Spacer to push icons to bottom */}
      <div className="flex-1"></div>

      {/* User and notification icons at the bottom */}
      <div className="flex flex-col space-y-4">
        <button className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110">
          <User className="w-8 h-8 text-gray-300" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110 relative">
          <Bell className="w-8 h-8 text-gray-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
