import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Search, User, History, Eye, Copy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerData {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  gender?: 'ذكر' | 'أنثى';
  age?: number;
  address?: {
    country: string;
    state: string;
    area: string;
    street: string;
    house: string;
  };
  measurements?: Record<string, number>;
  isNew: boolean;
}

interface CustomerFormProps {
  onNext: (customerData: CustomerData) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const { t, language } = useLanguage();
  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderData, setReorderData] = useState<{
    pieces: number;
    deliveryDate: string;
  }>({
    pieces: 1,
    deliveryDate: ''
  });
  
  // Form data for new customer
  const [formData, setFormData] = useState<Partial<CustomerData>>({
    name: '',
    phone: '',
    email: '',
    gender: undefined,
    age: undefined,
    address: {
      country: 'الكويت',
      state: '',
      area: '',
      street: '',
      house: ''
    },
    measurements: {},
    isNew: true
  });

  // Mock existing customers
  const existingCustomers: CustomerData[] = [
    {
      id: '1',
      name: 'أحمد محمد الكندري',
      phone: '+96597712345678',
      email: 'ahmed.k@example.com',
      gender: 'ذكر',
      age: 35,
      address: {
        country: 'الكويت',
        state: 'حولي',
        area: 'السالمية',
        street: 'شارع المطاعم',
        house: '123'
      },
      measurements: {
        chest: 95,
        waist: 85,
        shoulder: 45,
        neck: 38,
        length: 145,
        sleeve: 60
      },
      isNew: false
    },
    {
      id: '2',
      name: 'فاطمة علي العتيبي',
      phone: '+96597712345679',
      email: 'fatma.ali@example.com',
      gender: 'أنثى',
      age: 28,
      address: {
        country: 'الكويت',
        state: 'العاصمة',
        area: 'قرطبة',
        street: 'شارع الخليج',
        house: '456'
      },
      measurements: {
        chest: 88,
        waist: 78,
        shoulder: 40,
        neck: 35,
        length: 140,
        sleeve: 55
      },
      isNew: false
    }
  ];

  // Mock previous orders for demonstration
  const mockPreviousOrders = [
    {
      id: 'ORD-001',
      date: '2024-06-15',
      items: 2,
      total: 45.500,
      status: 'مكتمل',
      measurements: { chest: 95, waist: 85, shoulder: 45, neck: 38, length: 145 }
    },
    {
      id: 'ORD-002',
      date: '2024-05-10',
      items: 1,
      total: 28.750,
      status: 'مكتمل',
      measurements: { chest: 94, waist: 84, shoulder: 45, neck: 38, length: 145 }
    }
  ];

  // Available measurements based on workshop type
  const measurementFields = {
    male: [
      { key: 'chest', label: 'الصدر (سم)', labelEn: 'Chest (cm)' },
      { key: 'waist', label: 'الوسط (سم)', labelEn: 'Waist (cm)' },
      { key: 'shoulder', label: 'الكتف (سم)', labelEn: 'Shoulder (cm)' },
      { key: 'neck', label: 'الرقبة (سم)', labelEn: 'Neck (cm)' },
      { key: 'length', label: 'الطول (سم)', labelEn: 'Length (cm)' },
      { key: 'sleeve', label: 'الكم (سم)', labelEn: 'Sleeve (cm)' }
    ],
    female: [
      { key: 'chest', label: 'الصدر (سم)', labelEn: 'Chest (cm)' },
      { key: 'waist', label: 'الوسط (سم)', labelEn: 'Waist (cm)' },
      { key: 'shoulder', label: 'الكتف (سم)', labelEn: 'Shoulder (cm)' },
      { key: 'neck', label: 'الرقبة (سم)', labelEn: 'Neck (cm)' },
      { key: 'length', label: 'الطول (سم)', labelEn: 'Length (cm)' },
      { key: 'sleeve', label: 'الكم (سم)', labelEn: 'Sleeve (cm)' }
    ]
  };

  const kuwaitGovernments = [
    'العاصمة', 'حولي', 'الأحمدي', 'الجهراء', 'الفروانية', 'مبارك الكبير'
  ];

  const validateKuwaitiPhone = (phone: string) => {
    // Kuwaiti mobile numbers format: +965 followed by 8 digits starting with 5, 6, 7, or 9
    const kuwaitiMobileRegex = /^(\+965)?[5679]\d{7}$/;
    const cleanPhone = phone.replace(/\s+/g, '').replace('+965', '');
    return kuwaitiMobileRegex.test(cleanPhone);
  };

  const formatKuwaitiPhone = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace('+965', '');
    if (cleanPhone.length === 8) {
      return `+965${cleanPhone}`;
    }
    return phone;
  };

  const filteredCustomers = existingCustomers.filter(customer =>
    customer.name.includes(searchTerm) ||
    customer.phone.includes(searchTerm) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleExistingCustomerSelect = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setSearchTerm('');
  };

  const handleCopyPreviousOrder = (order: any) => {
    if (selectedCustomer) {
      const updatedCustomer = {
        ...selectedCustomer,
        measurements: order.measurements
      };
      setSelectedCustomer(updatedCustomer);
      alert(`تم نسخ القياسات من الطلب ${order.id}`);
    }
  };

  const handleNext = () => {
    if (customerType === 'new') {
      // Validate required fields for new customer
      if (!formData.name?.trim() || !formData.phone?.trim()) {
        alert('الرجاء إدخال الاسم ورقم الهاتف');
        return;
      }
      
      if (!validateKuwaitiPhone(formData.phone)) {
        alert('الرجاء إدخال رقم هاتف كويتي صحيح (يبدأ بـ 5، 6، 7، أو 9)');
        return;
      }

      const customerData: CustomerData = {
        ...formData as CustomerData,
        phone: formatKuwaitiPhone(formData.phone!),
        isNew: true
      };
      
      onNext(customerData);
    } else {
      // Use existing customer
      if (!selectedCustomer) {
        alert('الرجاء اختيار عميل');
        return;
      }
      
      onNext({ ...selectedCustomer, isNew: false });
    }
  };

  const handleViewCustomerDetails = () => {
    setShowCustomerDetails(true);
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleReorder = (order: any) => {
    setSelectedOrder(order);
    setReorderData({
      pieces: 1,
      deliveryDate: ''
    });
    setShowReorderModal(true);
  };

  const handleConfirmReorder = () => {
    if (!reorderData.deliveryDate) {
      alert('الرجاء تحديد موعد التسليم');
      return;
    }
    
    const newOrder = {
      ...selectedOrder,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      pieces: reorderData.pieces,
      deliveryDate: reorderData.deliveryDate,
      status: 'جديد'
    };
    
    console.log('Reorder created:', newOrder);
    alert(`تم إنشاء الطلب الجديد بنجاح!\nرقم الطلب: ${newOrder.id}\nعدد القطع: ${reorderData.pieces}\nموعد التسليم: ${reorderData.deliveryDate}`);
    
    setShowReorderModal(false);
    setShowPreviousOrders(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          بيانات العميل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Type Selection */}
        <Tabs value={customerType} onValueChange={(value) => setCustomerType(value as 'new' | 'existing')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              عميل جديد
            </TabsTrigger>
            <TabsTrigger value="existing" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              عميل حالي
            </TabsTrigger>
          </TabsList>

          {/* New Customer Form */}
          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Required Fields */}
              <div>
                <Label htmlFor="name">
                  اسم العميل <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">
                  رقم الهاتف <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+965 5xxxxxxx"
                  required
                />
                {formData.phone && !validateKuwaitiPhone(formData.phone) && (
                  <p className="text-red-500 text-xs mt-1">رقم الهاتف غير صحيح</p>
                )}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">معلومات إضافية (اختيارية)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">الجنس</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value as 'ذكر' | 'أنثى' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجنس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ذكر">ذكر</SelectItem>
                      <SelectItem value="أنثى">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="age">العمر</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
                    placeholder="العمر"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="space-y-4">
                <h4 className="font-medium">العنوان</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="country">الدولة</Label>
                    <Input
                      id="country"
                      value={formData.address?.country || 'الكويت'}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, country: e.target.value }
                      })}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">المحافظة</Label>
                    <Select 
                      value={formData.address?.state} 
                      onValueChange={(value) => setFormData({
                        ...formData,
                        address: { ...formData.address!, state: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {kuwaitGovernments.map(gov => (
                          <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="area">المنطقة</Label>
                    <Input
                      id="area"
                      value={formData.address?.area || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, area: e.target.value }
                      })}
                      placeholder="المنطقة"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="street">الشارع</Label>
                    <Input
                      id="street"
                      value={formData.address?.street || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, street: e.target.value }
                      })}
                      placeholder="اسم الشارع"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="house">رقم المنزل</Label>
                    <Input
                      id="house"
                      value={formData.address?.house || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, house: e.target.value }
                      })}
                      placeholder="رقم المنزل"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Measurements Section */}
            {formData.gender && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-4">القياسات ({formData.gender})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {measurementFields[formData.gender === 'ذكر' ? 'male' : 'female'].map(field => (
                    <div key={field.key}>
                      <Label htmlFor={field.key}>{field.label}</Label>
                      <Input
                        id={field.key}
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.measurements?.[field.key] || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          measurements: {
                            ...formData.measurements,
                            [field.key]: parseFloat(e.target.value) || 0
                          }
                        })}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Existing Customer Search */}
          <TabsContent value="existing" className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث بالاسم أو رقم الهاتف أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Search Results */}
              {searchTerm && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map(customer => (
                      <Card 
                        key={customer.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedCustomer?.id === customer.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleExistingCustomerSelect(customer)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{customer.name}</h4>
                              <p className="text-sm text-gray-600">{customer.phone}</p>
                              {customer.email && (
                                <p className="text-xs text-gray-500">{customer.email}</p>
                              )}
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <Badge variant="outline" className="mb-1">
                                {customer.gender}
                              </Badge>
                              <p>{customer.address?.area}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">لا توجد نتائج</p>
                  )}
                </div>
              )}

              {/* Selected Customer Details */}
              {selectedCustomer && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{selectedCustomer.name}</h3>
                        <p className="text-gray-600">{selectedCustomer.phone}</p>
                        {selectedCustomer.email && (
                          <p className="text-gray-600">{selectedCustomer.email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className="mb-2">{selectedCustomer.gender}</Badge>
                        <p className="text-sm text-gray-600">
                          {selectedCustomer.address?.area}، {selectedCustomer.address?.state}
                        </p>
                      </div>
                    </div>

                    {/* Current Measurements */}
                    {selectedCustomer.measurements && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">القياسات الحالية:</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-sm">
                          {Object.entries(selectedCustomer.measurements).map(([key, value]) => {
                            const field = measurementFields[selectedCustomer.gender === 'ذكر' ? 'male' : 'female']
                              .find(f => f.key === key);
                            return field ? (
                              <div key={key} className="bg-white p-2 rounded text-center">
                                <p className="text-xs text-gray-500">{field.label}</p>
                                <p className="font-semibold">{value}</p>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Dialog open={showPreviousOrders} onOpenChange={setShowPreviousOrders}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <History className="w-4 h-4 mr-2" />
                            الطلبات السابقة
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>الطلبات السابقة - {selectedCustomer.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {mockPreviousOrders.map(order => (
                              <Card key={order.id}>
                                <CardContent className="p-4">
                                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">طلب #{order.id}</h4>
                                        <Badge className={order.status === 'مكتمل' ? 'bg-green-100 text-green-800' : ''}>
                                          {order.status}
                                        </Badge>
                                      </div>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                        <div>
                                          <span className="text-gray-500">التاريخ:</span>
                                          <p className="font-medium">{order.date}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">القطع:</span>
                                          <p className="font-medium">{order.items}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">المجموع:</span>
                                          <p className="font-medium text-primary">{order.total.toFixed(3)} د.ك</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">الحالة:</span>
                                          <p className="font-medium">{order.status}</p>
                                        </div>
                                      </div>
                                      
                                      {/* Order Measurements */}
                                      <div className="mt-3">
                                        <h5 className="text-sm font-medium mb-2">قياسات هذا الطلب:</h5>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                                          {Object.entries(order.measurements).map(([key, value]) => {
                                            const field = measurementFields[selectedCustomer.gender === 'ذكر' ? 'male' : 'female']
                                              .find(f => f.key === key);
                                            return field ? (
                                              <div key={key} className="bg-gray-50 p-1 rounded text-center">
                                                <p className="text-gray-500">{field.label.split(' ')[0]}</p>
                                                <p className="font-semibold">{value}</p>
                                              </div>
                                            ) : null;
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 lg:w-48">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleCopyPreviousOrder(order)}
                                        className="w-full"
                                      >
                                        <Copy className="w-3 h-3 mr-1" />
                                        نسخ القياسات
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleViewOrderDetails(order)}
                                        className="w-full"
                                      >
                                        <Eye className="w-3 h-3 mr-1" />
                                        تفاصيل الطلب
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="default"
                                        onClick={() => handleReorder(order)}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                      >
                                        <Copy className="w-3 h-3 mr-1" />
                                        اعادة الطلب
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm" onClick={handleViewCustomerDetails}>
                        <Eye className="w-4 h-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Customer Details Modal */}
        <Dialog open={showCustomerDetails} onOpenChange={setShowCustomerDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل العميل - {selectedCustomer?.name}</DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">المعلومات الشخصية</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">الاسم:</span> {selectedCustomer.name}</p>
                      <p><span className="text-gray-600">الهاتف:</span> {selectedCustomer.phone}</p>
                      {selectedCustomer.email && <p><span className="text-gray-600">البريد:</span> {selectedCustomer.email}</p>}
                      <p><span className="text-gray-600">الجنس:</span> {selectedCustomer.gender}</p>
                      {selectedCustomer.age && <p><span className="text-gray-600">العمر:</span> {selectedCustomer.age}</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">العنوان</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">الدولة:</span> {selectedCustomer.address?.country}</p>
                      <p><span className="text-gray-600">المحافظة:</span> {selectedCustomer.address?.state}</p>
                      <p><span className="text-gray-600">المنطقة:</span> {selectedCustomer.address?.area}</p>
                      <p><span className="text-gray-600">الشارع:</span> {selectedCustomer.address?.street}</p>
                      <p><span className="text-gray-600">رقم المنزل:</span> {selectedCustomer.address?.house}</p>
                    </div>
                  </div>
                </div>
                
                {selectedCustomer.measurements && (
                  <div>
                    <h4 className="font-semibold mb-2">القياسات</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {Object.entries(selectedCustomer.measurements).map(([key, value]) => {
                        const field = measurementFields[selectedCustomer.gender === 'ذكر' ? 'male' : 'female']
                          .find(f => f.key === key);
                        return field ? (
                          <div key={key} className="bg-gray-50 p-3 rounded text-center">
                            <p className="text-xs text-gray-600">{field.label}</p>
                            <p className="font-semibold text-lg">{value}</p>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Order Details Modal */}
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الطلب - {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">رقم الطلب</p>
                    <p className="font-semibold">{selectedOrder.id}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">التاريخ</p>
                    <p className="font-semibold">{selectedOrder.date}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">عدد القطع</p>
                    <p className="font-semibold">{selectedOrder.items}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">المجموع</p>
                    <p className="font-semibold text-primary">{selectedOrder.total.toFixed(3)} د.ك</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">قياسات هذا الطلب</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {Object.entries(selectedOrder.measurements).map(([key, value]) => {
                      const field = measurementFields[selectedCustomer?.gender === 'ذكر' ? 'male' : 'female']
                        .find(f => f.key === key);
                      return field ? (
                        <div key={key} className="bg-white p-2 rounded text-center">
                          <p className="text-xs text-gray-600">{field.label}</p>
                          <p className="font-semibold">{value}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">حالة الطلب</h4>
                  <Badge className={selectedOrder.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reorder Modal */}
        <Dialog open={showReorderModal} onOpenChange={setShowReorderModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>اعادة الطلب - {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pieces">عدد القطع</Label>
                <Input
                  id="pieces"
                  type="number"
                  min="1"
                  value={reorderData.pieces}
                  onChange={(e) => setReorderData({
                    ...reorderData,
                    pieces: parseInt(e.target.value) || 1
                  })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="deliveryDate">موعد التسليم المطلوب</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={reorderData.deliveryDate}
                  onChange={(e) => setReorderData({
                    ...reorderData,
                    deliveryDate: e.target.value
                  })}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium mb-2">ملخص الطلب الجديد</h4>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-600">عدد القطع:</span> {reorderData.pieces}</p>
                  <p><span className="text-gray-600">التكلفة المتوقعة:</span> {(selectedOrder?.total * reorderData.pieces || 0).toFixed(3)} د.ك</p>
                  {reorderData.deliveryDate && (
                    <p><span className="text-gray-600">موعد التسليم:</span> {new Date(reorderData.deliveryDate).toLocaleDateString('ar-KW')}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleConfirmReorder} className="flex-1">
                  تأكيد اعادة الطلب
                </Button>
                <Button variant="outline" onClick={() => setShowReorderModal(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleNext} size="lg" className="min-w-[120px]">
            التالي - تفاصيل الطلب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
