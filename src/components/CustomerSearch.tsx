import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, User, Phone, MapPin, History, Ruler, RotateCcw } from "lucide-react";
import CustomerMeasurements from './CustomerMeasurements';

// Mock customer data - in real app this would come from Supabase
const mockCustomers = [
  {
    id: '1',
    name: 'أحمد محمد العلي',
    phone: '12345678',
    email: 'ahmed@example.com',
    gender: 'ذكر',
    age: 35,
    address: {
      country: 'الكويت',
      governorate: 'الأحمدي',
      block: '1',
      street: '10',
      houseNumber: '15'
    },
    measurements: {
      chest: '110',
      waist: '95',
      shoulder: '45',
      length: '150',
      armLength: '60',
      neckCircumference: '42',
      armOpening: '25',
      bottomWidth: '65',
      notes: 'العميل يفضل القصة الواسعة قليلاً'
    },
    orderHistory: [
      { id: 'ORD-001', date: '2024-01-15', total: 45.750, status: 'مكتمل' },
      { id: 'ORD-002', date: '2024-02-20', total: 32.500, status: 'جاري التنفيذ' }
    ]
  },
  {
    id: '2', 
    name: 'محمد سالم الرشيد',
    phone: '87654321',
    email: 'mohammed@example.com',
    gender: 'ذكر',
    age: 28,
    address: {
      country: 'الكويت',
      governorate: 'حولي',
      block: '3',
      street: '25',
      houseNumber: '8'
    },
    measurements: {
      chest: '105',
      waist: '90',
      shoulder: '44',
      length: '148',
      armLength: '58',
      neckCircumference: '40',
      armOpening: '24',
      bottomWidth: '62',
      notes: ''
    },
    orderHistory: [
      { id: 'ORD-003', date: '2024-03-10', total: 28.750, status: 'مكتمل' }
    ]
  },
  {
    id: '3',
    name: 'خالد عبدالله المطيري',
    phone: '55667788',
    email: '',
    gender: 'ذكر',
    age: 42,
    address: {
      country: 'الكويت',
      governorate: 'الجهراء',
      block: '2',
      street: '15',
      houseNumber: '22'
    },
    measurements: {
      chest: '115',
      waist: '100',
      shoulder: '46',
      length: '152',
      armLength: '62',
      neckCircumference: '44',
      armOpening: '26',
      bottomWidth: '68',
      notes: 'العميل طويل القامة'
    },
    orderHistory: [
      { id: 'ORD-004', date: '2024-01-25', total: 55.250, status: 'مكتمل' },
      { id: 'ORD-005', date: '2024-03-15', total: 41.500, status: 'مكتمل' }
    ]
  }
];

interface CustomerSearchProps {
  onCustomerSelect: (customer: any) => void;
}

const CustomerSearch = ({ onCustomerSelect }: CustomerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [selectedOrderForReorder, setSelectedOrderForReorder] = useState<any>(null);
  const [reorderQuantity, setReorderQuantity] = useState('');
  const [reorderDeliveryDate, setReorderDeliveryDate] = useState('');

  // Simulate elastic search
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = mockCustomers.filter(customer =>
        customer.name.includes(searchTerm) ||
        customer.phone.includes(searchTerm) ||
        customer.email?.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleConfirmSelection = () => {
    if (selectedCustomer) {
      onCustomerSelect(selectedCustomer);
      setShowDetails(false);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleReorder = (order: any) => {
    setSelectedOrderForReorder(order);
    setReorderQuantity('');
    setReorderDeliveryDate('');
    setShowReorderDialog(true);
  };

  const handleConfirmReorder = () => {
    if (!selectedOrderForReorder || !reorderQuantity || !reorderDeliveryDate) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newOrder = {
      ...selectedOrderForReorder,
      id: `ORD-${Date.now()}`, // Generate new order ID
      items: parseInt(reorderQuantity),
      deliveryDate: reorderDeliveryDate,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'جديد',
      total: selectedOrderForReorder.total * (parseInt(reorderQuantity) / selectedOrderForReorder.items) // Adjust total based on quantity
    };

    console.log('New reorder created:', newOrder);
    alert(`تم إنشاء طلب جديد برقم ${newOrder.id}\nالكمية: ${reorderQuantity}\nتاريخ التسليم: ${reorderDeliveryDate}`);
    
    setShowReorderDialog(false);
    setShowDetails(false);
    setSearchTerm('');
    setSearchResults([]);
    
    // Pass the reordered data to parent component
    onCustomerSelect({
      ...selectedCustomer,
      newOrder: newOrder
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            البحث في قاعدة بيانات العملاء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالاسم أو رقم الهاتف أو البريد الإلكتروني..."
                className="pr-10"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map(customer => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{customer.name}</span>
                        <Badge variant="outline">{customer.gender}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{customer.address.governorate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <History className="w-3 h-3" />
                          <span>{customer.orderHistory.length} طلب</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      عرض التفاصيل
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchTerm.length >= 2 && searchResults.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                لم يتم العثور على عملاء مطابقين للبحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل العميل</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    البيانات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">الاسم:</span>
                      <p className="font-medium">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الهاتف:</span>
                      <p className="font-medium">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">البريد الإلكتروني:</span>
                      <p className="font-medium">{selectedCustomer.email || 'غير محدد'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الجنس:</span>
                      <p className="font-medium">{selectedCustomer.gender}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">العمر:</span>
                      <p className="font-medium">{selectedCustomer.age} سنة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    العنوان
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">الدولة:</span>
                      <p className="font-medium">{selectedCustomer.address.country}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">المحافظة:</span>
                      <p className="font-medium">{selectedCustomer.address.governorate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">القطعة:</span>
                      <p className="font-medium">{selectedCustomer.address.block}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الشارع:</span>
                      <p className="font-medium">{selectedCustomer.address.street}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">رقم المنزل:</span>
                      <p className="font-medium">{selectedCustomer.address.houseNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Measurements */}
              <CustomerMeasurements
                measurements={selectedCustomer.measurements}
                onMeasurementsChange={() => {}} // Read-only in search
                readOnly={true}
              />

              {/* Order History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    تاريخ الطلبات ({selectedCustomer.orderHistory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCustomer.orderHistory.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">{order.total.toFixed(3)} د.ك</p>
                          <Badge variant={order.status === 'مكتمل' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReorder(order)}
                            className="flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            إعادة طلب
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={handleConfirmSelection} className="flex-1">
                  اختيار هذا العميل
                </Button>
                <Button variant="outline" onClick={() => setShowDetails(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reorder Dialog */}
      <Dialog open={showReorderDialog} onOpenChange={setShowReorderDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              إعادة طلب
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrderForReorder && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">الطلب الأصلي: {selectedOrderForReorder.id}</p>
                <p className="text-sm text-gray-600">التاريخ: {selectedOrderForReorder.date}</p>
                <p className="text-sm text-gray-600">القيمة: {selectedOrderForReorder.total.toFixed(3)} د.ك</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="reorder-quantity">عدد القطع *</Label>
                  <Input
                    id="reorder-quantity"
                    type="number"
                    min="1"
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(e.target.value)}
                    placeholder="أدخل عدد القطع"
                  />
                </div>

                <div>
                  <Label htmlFor="reorder-delivery">تاريخ التسليم المتوقع *</Label>
                  <Input
                    id="reorder-delivery"
                    type="date"
                    value={reorderDeliveryDate}
                    onChange={(e) => setReorderDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleConfirmReorder} className="flex-1">
                  تأكيد إعادة الطلب
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowReorderDialog(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerSearch;
