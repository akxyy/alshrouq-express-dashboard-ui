import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OrderPanel from './OrderPanel';
import MapView from './MapView';
import OrderDetailsView from './OrderDetailsView';

export interface Order {
  id: string;
  name: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  time: string;
  location: string;
  driver?: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', name: 'Order 1', status: 'pending', time: '10:00 AM', location: 'Riyadh' },
    { id: '2', name: 'Order 2', status: 'accepted', time: '11:00 AM', location: 'Jeddah' },
    { id: '3', name: 'Order 3', status: 'in_progress', time: '12:00 PM', location: 'Dammam' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNewOrder = (newOrder: Order) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 flex">
        <OrderPanel 
          orders={orders}
          selectedOrder={selectedOrder}
          onOrderSelect={setSelectedOrder}
          onNewOrder={handleNewOrder}
        />
        
        <div className="flex-1 p-4 relative">
          <MapView />
          <OrderDetailsView 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
