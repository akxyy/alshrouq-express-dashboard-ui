import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OrderPanel from './OrderPanel';
// import MapView from './MapView';
import NewOrderModal from './NewOrderModal';
import CustomToast from './CustomToast';
import OrderDetailsView from './OrderDetailsView';

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

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastOrderId, setToastOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNewOrder = (orderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'Pending',
      timestamp: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    setIsNewOrderModalOpen(false);
    
    // Show custom toast
    setToastOrderId(newOrder.id);
    setShowToast(true);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleRemoveOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 flex">
        <OrderPanel 
          orders={orders}
          onNewOrder={() => setIsNewOrderModalOpen(true)}
          onOrderClick={handleOrderClick}
          onRemoveOrder={handleRemoveOrder}
        />
        
        <div className="flex-1 relative">
          {/* <MapView /> */}
          
          <NewOrderModal
            isOpen={isNewOrderModalOpen}
            onClose={() => setIsNewOrderModalOpen(false)}
            onSubmit={handleNewOrder}
          />

          <OrderDetailsView
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>

      <CustomToast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        orderId={toastOrderId}
      />
    </div>
  );
};

export default Dashboard;
