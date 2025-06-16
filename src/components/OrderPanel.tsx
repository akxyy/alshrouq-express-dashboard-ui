
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order } from './Dashboard';
import { Plus, Search, ChevronDown, User, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface OrderPanelProps {
  orders: Order[];
  onNewOrder: () => void;
  onOrderClick: (order: Order) => void;
  onRemoveOrder: (orderId: string) => void;
}

const OrderPanel = ({ orders, onNewOrder, onOrderClick, onRemoveOrder }: OrderPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'All': true,
    'Pending': true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

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

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setIsDialogOpen(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      console.log('Order cancelled:', orderToCancel);
      onRemoveOrder(orderToCancel);
      setIsDialogOpen(false);
      setOrderToCancel(null);
    }
  };

  const handleLogOrder = (orderId: string) => {
    console.log('View log for order:', orderId);
    // Add your log viewing logic here
  };

  const getOrderColor = (index: number) => {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'];
    return colors[index % colors.length];
  };

  const statusSections = [
    { name: 'All', count: orders.length, color: 'bg-gray-500' },
    { name: 'Pending', count: getOrdersByStatus('Pending').length, color: 'bg-yellow-500' },
    { name: 'Auto Dispatch Failed', count: getOrdersByStatus('Auto Dispatch Failed').length, color: 'bg-red-500' },
    { name: 'Accepted', count: getOrdersByStatus('Accepted').length, color: 'bg-blue-500' },
    { name: 'Driver at Pickup', count: getOrdersByStatus('Driver at Pickup').length, color: 'bg-purple-500' },
    { name: 'Picked', count: getOrdersByStatus('Picked').length, color: 'bg-orange-500' },
    { name: 'Driver at Dropoff', count: getOrdersByStatus('Driver at Dropoff').length, color: 'bg-indigo-500' },
    { name: 'Completed', count: getOrdersByStatus('Completed').length, color: 'bg-green-500' },
  ];

  return (
    <div className="w-96 bg-white flex flex-col">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-gray-900">Alshrouq TEST-02 -Unizah Test</h3>
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

        {/* On Demand Title */}
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">On Demand ({orders.length})</h4>
        </div>
      </div>

      {/* Status Sections */}
      <div className="flex-1 overflow-y-auto space-y-2 px-4">
        {statusSections.map((section) => (
          <div key={section.name} className="bg-white rounded-lg shadow-sm border border-gray-100 relative">
            {/* Colored vertical line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${section.color} rounded-l-lg`}></div>
            
            <button
              onClick={() => toggleSection(section.name)}
              className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg pl-4"
            >
              <span className="font-medium text-gray-900">
                {section.name} ({section.count})
              </span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${
                expandedSections[section.name] ? 'rotate-180' : 'rotate-0'
              }`} />
            </button>
            
            {expandedSections[section.name] && (
              <div className="px-4 pb-3 space-y-2 pl-5">
                {getOrdersByStatus(section.name === 'All' ? undefined : section.name)
                  .filter(order => 
                    searchTerm === '' || 
                    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order, index) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
                    >
                      {/* Colored left border */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getOrderColor(index)}`}></div>
                      
                      <div className="p-3 pl-5">
                        {(section.name === 'Pending' || section.name === 'All') ? (
                          // Simplified layout for Pending and All orders
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1" onClick={() => onOrderClick(order)}>
                              <p className="text-sm font-medium text-orange-500 mb-1">Eissa Hamood</p>
                              <p className="text-xs text-gray-600 mb-1">Alshrouq test 02</p>
                              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-red-500 text-white">
                                Pending Driver Acceptance
                              </span>
                            </div>
                            <div className="flex-shrink-0">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-orange-100"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white">
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelOrder(order.id);
                                    }}
                                    className="hover:bg-orange-100"
                                  >
                                    Cancel
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleLogOrder(order.id);
                                    }}
                                    className="hover:bg-orange-100"
                                  >
                                    Log
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ) : (
                          // Default layout for other sections
                          <div onClick={() => onOrderClick(order)}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm text-gray-900">{order.id}</span>
                              <div className="flex items-center gap-2">
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
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-orange-100"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-white">
                                    <DropdownMenuItem 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancelOrder(order.id);
                                      }}
                                      className="hover:bg-orange-100"
                                    >
                                      Cancel
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogOrder(order.id);
                                      }}
                                      className="hover:bg-orange-100"
                                    >
                                      Log
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-sm text-orange-500 mb-1">Eissa Hamood</p>
                            <p className="text-xs text-gray-500">{order.phone}</p>
                            <p className="text-xs text-gray-500">Value: {order.orderValue}</p>
                          </div>
                        )}
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

      {/* Alert Dialog for Cancel Confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelOrder}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderPanel;
