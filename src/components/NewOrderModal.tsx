import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Order } from './Dashboard';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
}

const NewOrderModal = ({ isOpen, onClose, onSubmit }: NewOrderModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    clientOrderId: '',
    orderValue: '',
    paymentMethod: '' as 'Cash' | 'Span Machine' | 'Paid' | '',
    customerAddress: '',
  });

  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current || !(window as any).google) return;

    const google = (window as any).google;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 24.774265, lng: 46.738586 }, // Riyadh default
      zoom: 10,
    });

    map.addListener('click', async (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position: { lat, lng },
        map,
      });

      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      const address = response.results?.[0]?.formatted_address || '';

      setFormData(prev => ({
        ...prev,
        customerAddress: address,
      }));
    });
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.paymentMethod) return;

    onSubmit({
      name: formData.name,
      phone: formData.phone,
      clientOrderId: formData.clientOrderId,
      orderValue: formData.orderValue,
      paymentMethod: formData.paymentMethod,
      customerAddress: formData.paymentMethod === 'Cash' ? formData.customerAddress : undefined,
    });

    setFormData({
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
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">On Demand Delivery</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Noon Minutes</h3>
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name *</Label>
              <Input
                id="name"
                placeholder='Name'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                placeholder='Phone'
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Google Map Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Select Location</Label>
            <div ref={mapRef} className="h-48 rounded-lg border border-gray-300" />
            {formData.customerAddress && (
              <div className="text-sm text-gray-600 mt-2">Selected Address: {formData.customerAddress}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientOrderId">Client Order ID</Label>
              <Input
                id="clientOrderId"
                placeholder='Order id'
                value={formData.clientOrderId}
                onChange={(e) => handleInputChange('clientOrderId', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Method *</Label>
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
              <Label htmlFor="orderValue">Order Value</Label>
              <Input
                id="orderValue"
                placeholder='Order value'
                value={formData.orderValue}
                onChange={(e) => handleInputChange('orderValue', e.target.value)}
              />
            </div>
          </div>

          {formData.paymentMethod === 'Cash' && (
            <div className="space-y-2">
              <Label htmlFor="customerAddress">Customer Address *</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Close
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;