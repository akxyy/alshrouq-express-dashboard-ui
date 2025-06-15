
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OrderPanel from './OrderPanel';
import MapView from './MapView';
import NewOrderModal from './NewOrderModal';
import { useToast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  name: string;
  phone: string;
  clientOrderId: string;
  orderValue: string;
  paymentMethod: 'Cash' | 'Span Machine' | 'Paid';
  customerAddress?: string;
  status: 'Pending' | 'Auto Dispatch Failed' | 'Accepted' | 'Driver at Pickup' | 'Picked' | 'Driver at Dropoff' | 'Completed';
  timestamp: Date;
}

const Dashboard = () => {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const handleNewOrder = (orderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'Pending',
      timestamp: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    setIsNewOrderModalOpen(false);
    
    toast({
      title: "Order Created Successfully",
      description: `New order created with ID: ${newOrder.id}`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex">
        <OrderPanel 
          orders={orders}
          onNewOrder={() => setIsNewOrderModalOpen(true)}
        />
        
        <div className="flex-1 relative">
          <MapView />
          
          <NewOrderModal
            isOpen={isNewOrderModalOpen}
            onClose={() => setIsNewOrderModalOpen(false)}
            onSubmit={handleNewOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
