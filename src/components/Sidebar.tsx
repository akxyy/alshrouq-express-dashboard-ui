import React, { useState } from 'react';
import { User, Bell, ChevronRight, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const isAnyDropdownOpen = showUserDropdown || showNotificationDropdown;

  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {/* Overlay when dropdowns are open */}
      {isAnyDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => {
            setShowUserDropdown(false);
            setShowNotificationDropdown(false);
          }}
        />
      )}

      <div className="w-16 bg-gradient-to-b from-red-600 to-blue-800 rounded-lg m-2 flex flex-col items-center py-6 relative z-50">
        {/* Logo or initials */}
        <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center mb-6">
          <span className="text-white font-bold text-sm">AE</span>
        </div>

        {/* Notification Icon (TOP) */}
        <div className="mb-6">
          <button 
            className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110 relative"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowUserDropdown(false);
            }}
          >
            <Bell className="w-5 h-5 text-gray-300" />
            <ChevronRight className="w-3 h-3 text-gray-300 absolute right-0" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User and Logout Icons (BOTTOM) */}
        <div className="flex flex-col space-y-4">
          <button 
            className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110 relative"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotificationDropdown(false);
            }}
          >
            <User className="w-5 h-5 text-gray-300" />
            <ChevronRight className="w-3 h-3 text-gray-300 absolute right-0" />
          </button>

          <button 
            className="w-10 h-10 flex items-center justify-center transition-colors hover:scale-110 hover:bg-red-700/20 rounded-lg"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* User Dropdown */}
        {showUserDropdown && (
          <div className="absolute bottom-32 left-16 ml-2 w-40 bg-white rounded-lg shadow-lg border z-50">
            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Settings
              </button>
              <hr className="my-1" />
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Notification Dropdown */}
        {showNotificationDropdown && (
          <div className="absolute top-20 left-16 ml-2 w-64 bg-white rounded-lg shadow-lg border z-50">
            <div className="py-2">
              <div className="px-4 py-2 border-b">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b">
                  <p className="text-sm text-gray-900">New order received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b">
                  <p className="text-sm text-gray-900">Driver arrived at pickup</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50">
                  <p className="text-sm text-gray-900">Order completed</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              {/* <div className="px-4 py-2 border-t">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;