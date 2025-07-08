import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, User, Phone, MapPin, History, Ruler, RotateCcw } from "lucide-react";
import CustomerMeasurements from './CustomerMeasurements';

// Get customers from actual workshop data
const getWorkshopCustomers = (workshopId?: string) => {
  // Get saved orders from localStorage
  const savedOrders = JSON.parse(localStorage.getItem('workshopOrders') || '[]');
  
  // Filter orders for this specific workshop
  const workshopOrders = savedOrders.filter((order: any) => 
    order.workshopId === workshopId || !order.workshopId
  );

  // Default orders if no saved orders exist
  const defaultOrders = [
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد الكندري',
      phone: '+96597712345678',
      total: 45.500,
      status: 'جديد',
      deliveryDate: '2024-07-15',
      createdAt: '2024-07-04',
      customerMeasurements: {
        chest: '95',
        waist: '85',
        shoulder: '45',
        neck: '38',
        length: '145',
        sleeve: '60',
        armhole: '42'
      },
      fullOrderData: {
        customer: {
          name: 'أحمد محمد الكندري',
          phone: '+96597712345678',
          email: 'ahmed@example.com',
          gender: 'ذكر',
          age: 35,
          address: {
            country: 'الكويت',
            governorate: 'الأحمدي',
            block: '1',
            street: '10',
            houseNumber: '15'
          }
        }
      }
    }
  ];

  const allOrders = workshopOrders.length > 0 ? [...defaultOrders, ...workshopOrders] : defaultOrders;
  
  // Generate customers from orders
  const customerMap = new Map();
  
  allOrders.forEach(order => {
    const customerKey = `${order.customerName}-${order.phone}`;
    
    if (!customerMap.has(customerKey)) {
      const orderWithFullData = order as any;
      const customerData = orderWithFullData.fullOrderData?.customer || {};
      
      customerMap.set(customerKey, {
        id: customerKey,
        name: order.customerName,
        phone: order.phone,
        email: customerData.email || '',
        gender: customerData.gender || 'ذكر',
        age: customerData.age || 30,
        address: customerData.address || {
          country: 'الكويت',
          governorate: '',
          block: '',
          street: '',
          houseNumber: ''
        },
        measurements: order.customerMeasurements || {},
        orderHistory: []
      });
    }
    
    const customer = customerMap.get(customerKey);
    customer.orderHistory.push({
      id: order.id,
      date: order.createdAt,
      total: order.total,
      status: order.status
    });
  });
  
  return Array.from(customerMap.values());
};

interface CustomerSearchProps {
  onCustomerSelect: (customer: any) => void;
  workshopId?: string;
}

const CustomerSearch = ({ onCustomerSelect, workshopId }: CustomerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [selectedOrderForReorder, setSelectedOrderForReorder] = useState<any>(null);
  const [reorderQuantity, setReorderQuantity] = useState('');
  const [reorderDeliveryDate, setReorderDeliveryDate] = useState('');
  
  // Get actual customers from workshop data
  const customers = React.useMemo(() => getWorkshopCustomers(workshopId), [workshopId]);

  // Simulate elastic search with actual customer data
  useEffect(() => {
    if (searchTerm.length >= 1) {
      const results = customers.filter(customer =>
        customer.name.includes(searchTerm) ||
        customer.phone.includes(searchTerm) ||
        customer.email?.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, customers]);

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

            {searchTerm.length >= 1 && searchResults.length === 0 && (
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
