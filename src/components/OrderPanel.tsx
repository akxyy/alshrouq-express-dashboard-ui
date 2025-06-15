
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order } from './Dashboard';
import { Plus, Search, ChevronUp } from 'lucide-react';

interface OrderPanelProps {
  orders: Order[];
  onNewOrder: () => void;
  onOrderClick: (order: Order) => void;
}

const OrderPanel = ({ orders, onNewOrder, onOrderClick }: OrderPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'All': true,
    'Pending': true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getOrdersByStatus = (status?: string) => {
    if (!status || status === 'All') return orders;
    return orders.filter(order => order.status === status);
  };

  const statusSections = [
    { name: 'All', count: orders.length },
    { name: 'Pending', count: getOrdersByStatus('Pending').length },
    { name: 'Auto Dispatch Failed', count: getOrdersByStatus('Auto Dispatch Failed').length },
    { name: 'Accepted', count: getOrdersByStatus('Accepted').length },
    { name: 'Driver at Pickup', count: getOrdersByStatus('Driver at Pickup').length },
    { name: 'Picked', count: getOrdersByStatus('Picked').length },
    { name: 'Driver at Dropoff', count: getOrdersByStatus('Driver at Dropoff').length },
    { name: 'Completed', count: getOrdersByStatus('Completed').length },
  ];

  const getOrderColor = (index: number) => {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            KFC-1210 malaz (sittin) RDHC.
          </h2>
          <Button 
            onClick={onNewOrder}
            size="sm" 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* On Demand Section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">On Demand ({orders.length})</h3>
      </div>

      {/* Status Sections */}
      <div className="flex-1 overflow-y-auto">
        {statusSections.map((section) => (
          <div key={section.name} className="border-b border-gray-100">
            <button
              onClick={() => toggleSection(section.name)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">
                {section.name} ({section.count})
              </span>
              <ChevronUp className={`w-4 h-4 transform transition-transform ${
                expandedSections[section.name] ? 'rotate-0' : 'rotate-180'
              }`} />
            </button>
            
            {expandedSections[section.name] && (
              <div className="px-4 pb-4 space-y-3">
                {getOrdersByStatus(section.name === 'All' ? undefined : section.name)
                  .filter(order => 
                    searchTerm === '' || 
                    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order, index) => (
                    <div
                      key={order.id}
                      onClick={() => onOrderClick(order)}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
                    >
                      {/* Colored left border */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getOrderColor(index)}`}></div>
                      
                      <div className="p-3 pl-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Driver at Pickup' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'Picked' ? 'bg-orange-100 text-orange-800' :
                            order.status === 'Driver at Dropoff' ? 'bg-indigo-100 text-indigo-800' :
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.name}</p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                        <p className="text-xs text-gray-500">Value: {order.orderValue}</p>
                      </div>
                    </div>
                  ))}
                
                {getOrdersByStatus(section.name === 'All' ? undefined : section.name).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No orders found</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPanel;
