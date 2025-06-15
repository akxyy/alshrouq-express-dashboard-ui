

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, MapPin } from 'lucide-react';
import { Order } from './Dashboard';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
}

const NewOrderModal = ({ isOpen, onClose, onSubmit }: NewOrderModalProps) => {
  const [formData, setFormData] = useState({
    id: '', // New id field for manual entry
    name: '',
    phone: '',
    clientOrderId: '',
    orderValue: '',
    paymentMethod: '' as 'Cash' | 'Span Machine' | 'Paid' | '',
    customerAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.paymentMethod) return;

    onSubmit({
      // Only pass the custom id if needed, otherwise just use the dashboard's generator logic
      name: formData.name,
      phone: formData.phone,
      clientOrderId: formData.clientOrderId,
      orderValue: formData.orderValue,
      paymentMethod: formData.paymentMethod as 'Cash' | 'Span Machine' | 'Paid',
      customerAddress: formData.paymentMethod === 'Cash' ? formData.customerAddress : undefined,
    });

    setFormData({
      id: '',
      name: '',
      phone: '',
      clientOrderId: '',
      orderValue: '',
      paymentMethod: '',
      customerAddress: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">On Demand Delivery</h2>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Name and Phone in same row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Customer Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter customer name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Click to select location</p>
              </div>
            </div>
          </div>

          {/* Client Order ID and id in same row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientOrderId" className="text-sm font-medium text-gray-700">
                Client Order ID
              </Label>
              <Input
                id="clientOrderId"
                placeholder="Enter client order ID"
                value={formData.clientOrderId}
                onChange={(e) => handleInputChange('clientOrderId', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id" className="text-sm font-medium text-gray-700">
                ID
              </Label>
              <Input
                id="id"
                placeholder="Enter order ID"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
              />
            </div>
          </div>
          
          {/* Payment Method and Order Value in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Payment Method *
              </Label>
              <Select onValueChange={(value) => handleInputChange('paymentMethod', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Span Machine">Span Machine</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderValue" className="text-sm font-medium text-gray-700">
                Order Value
              </Label>
              <Input
                id="orderValue"
                placeholder="Enter order value"
                value={formData.orderValue}
                onChange={(e) => handleInputChange('orderValue', e.target.value)}
              />
            </div>
          </div>

          {/* Conditional Customer Address Field */}
          {formData.paymentMethod === 'Cash' && (
            <div className="space-y-2">
              <Label htmlFor="customerAddress" className="text-sm font-medium text-gray-700">
                Customer Address *
              </Label>
              <Textarea
                id="customerAddress"
                placeholder="Enter customer address"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                rows={3}
                required
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Close
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;

