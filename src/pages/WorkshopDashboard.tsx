import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Users, Package, Plus, Search, Play, CheckCircle, QrCode, Printer, Building2, BarChart3, CreditCard, Banknote } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import StatsCard from "@/components/StatsCard";
import ProductManagement from "@/components/ProductManagement";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import QRCodePrintModal from "@/components/QRCodePrintModal";

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('orders');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isProductManagementOpen, setIsProductManagementOpen] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<any>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<any>(null);

  const workshop = {
    id: workshopId,
    name: "ورشة الأناقة الكويتية",
    type: "حريمي ورجالي", 
    address: "حولي، شارع تونس، مجمع الأناقة التجاري",
    phone: "+965 2262 8945"
  };

  // Load orders from localStorage and merge with default orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد الكندري',
      phone: '+96597712345678',
      items: 2,
      total: 45.500,
      status: 'جديد',
      deliveryDate: '2024-07-15',
      createdAt: '2024-07-04',
      qrCodes: ['QR001A', 'QR001B'],
      cutter: null,
      payment: {
        type: 'cash',
        receivedAmount: 20.000,
        remainingAmount: 25.500
      },
      customerMeasurements: {
        chest: 95,
        waist: 85,
        shoulder: 45,
        neck: 38,
        length: 145,
        sleeve: 60,
        armhole: 42
      },
      itemDetails: [
        { qrCode: 'QR001A', fabric: 'قماش قطني فاخر', cut: 'قصة كلاسيكية' },
        { qrCode: 'QR001B', fabric: 'قماش حريري', cut: 'قصة عصرية' }
      ]
    },
    {
      id: 'ORD-002',
      customerName: 'فاطمة علي العتيبي',
      phone: '+96597712345679',
      items: 1,
      total: 28.750,
      status: 'جاري الإنتاج',
      deliveryDate: '2024-07-12',
      createdAt: '2024-07-02',
      qrCodes: ['QR002A'],
      cutter: 'محمد الخياط',
      payment: {
        type: 'online',
        receivedAmount: 28.750,
        remainingAmount: 0.000
      },
      customerMeasurements: {
        chest: 88,
        waist: 78,
        shoulder: 40,
        neck: 35,
        length: 140,
        sleeve: 55,
        armhole: 38
      },
      itemDetails: [
        { qrCode: 'QR002A', fabric: 'قماش كتان', cut: 'قصة فاخرة' }
      ]
    },
    {
      id: 'ORD-003',
      customerName: 'خالد سعد المطيري',
      phone: '+96597712345680',
      items: 3,
      total: 67.250,
      status: 'مكتمل',
      deliveryDate: '2024-07-08',
      createdAt: '2024-06-28',
      qrCodes: ['QR003A', 'QR003B', 'QR003C'],
      cutter: 'أحمد القصاص',
      payment: {
        type: 'cash',
        receivedAmount: 50.000,
        remainingAmount: 17.250
      },
      customerMeasurements: {
        chest: 98,
        waist: 88,
        shoulder: 47,
        neck: 40,
        length: 148,
        sleeve: 62,
        armhole: 44
      },
      itemDetails: [
        { qrCode: 'QR003A', fabric: 'قماش قطني', cut: 'قصة كلاسيكية' },
        { qrCode: 'QR003B', fabric: 'قماش حريري', cut: 'قصة عصرية' },
        { qrCode: 'QR003C', fabric: 'قماش كتان', cut: 'قصة فاخرة' }
      ]
    }
  ]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('workshopOrders') || '[]');
    // Filter orders for this specific workshop
    const workshopOrders = savedOrders.filter((order: any) => 
      order.workshopId === workshopId || !order.workshopId // Include orders without workshopId for backward compatibility
    );
    
    if (workshopOrders.length > 0) {
      // Merge with existing default orders, avoiding duplicates
      setOrders(prevOrders => {
        const existingIds = prevOrders.map(order => order.id);
        const newOrders = workshopOrders.filter((order: any) => !existingIds.includes(order.id));
        return [...prevOrders, ...newOrders];
      });
    }
  }, [workshopId]);

  // Generate customers from orders and sync with global customers
  const customers = React.useMemo(() => {
    const customerMap = new Map();
    
    // Process all orders to extract unique customers
    orders.forEach(order => {
      const customerKey = `${order.customerName}-${order.phone}`;
      
      if (!customerMap.has(customerKey)) {
        // Extract customer data from fullOrderData if available, otherwise use basic order data
        const orderWithFullData = order as any;
        const customerData = orderWithFullData.fullOrderData?.customer || {};
        
        customerMap.set(customerKey, {
          id: customerMap.size + 1,
          name: order.customerName,
          phone: order.phone,
          email: customerData.email || '',
          gender: customerData.gender || '',
          age: customerData.age || '',
          workshop: workshop.name,
          orders: 0,
          lastOrder: order.createdAt,
          totalSpent: 0,
          measurements: order.customerMeasurements || customerData.measurements || {},
          address: customerData.address || {
            country: 'الكويت',
            governorate: '',
            area: '',
            block: '',
            street: '',
            houseNumber: ''
          }
        });
      }
      
      const customer = customerMap.get(customerKey);
      customer.orders += 1;
      customer.totalSpent += order.total;
      
      // Update last order date if this order is more recent
      if (new Date(order.createdAt) > new Date(customer.lastOrder)) {
        customer.lastOrder = order.createdAt;
      }
      
      // Update measurements if available
      if (order.customerMeasurements) {
        customer.measurements = { ...customer.measurements, ...order.customerMeasurements };
      }
      
      // Update customer data from fullOrderData if available
      const orderWithFullData = order as any;
      if (orderWithFullData.fullOrderData?.customer) {
        const orderCustomer = orderWithFullData.fullOrderData.customer;
        if (orderCustomer.email) customer.email = orderCustomer.email;
        if (orderCustomer.gender) customer.gender = orderCustomer.gender;
        if (orderCustomer.age) customer.age = orderCustomer.age;
        if (orderCustomer.address) customer.address = { ...customer.address, ...orderCustomer.address };
      }
    });
    
    const currentCustomers = Array.from(customerMap.values());

    // Sync customers to global storage for SaaS dashboard
    const existingGlobalCustomers = JSON.parse(localStorage.getItem('allCustomers') || '[]');
    const globalCustomerMap = new Map();
    
    // Add existing global customers
    existingGlobalCustomers.forEach(customer => {
      const key = `${customer.name}-${customer.phone}`;
      globalCustomerMap.set(key, customer);
    });
    
    // Add/update customers from current workshop
    currentCustomers.forEach(customer => {
      const key = `${customer.name}-${customer.phone}`;
      globalCustomerMap.set(key, customer);
    });
    
    // Save updated global customers
    localStorage.setItem('allCustomers', JSON.stringify(Array.from(globalCustomerMap.values())));
    
    return currentCustomers;
  }, [orders, workshop.name]);

  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'جديد').length,
    inProgress: orders.filter(o => o.status === 'جاري الإنتاج').length,
    completed: orders.filter(o => o.status === 'مكتمل').length,
    totalCustomers: customers.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
    completionRate: orders.length > 0 ? (orders.filter(o => o.status === 'مكتمل').length / orders.length) * 100 : 0
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.customerName.includes(searchTerm) ||
                         order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredCustomers = customers.filter(customer =>
    customer.name.includes(searchTerm) || 
    customer.phone.includes(searchTerm) ||
    (customer.email && customer.email.includes(searchTerm))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'جاري الإنتاج': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'مكتمل': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartProduction = (orderId: string) => {
    const cutterName = prompt('أدخل اسم القصاص المسؤول عن هذا الطلب:');
    if (cutterName?.trim()) {
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'جاري الإنتاج', cutter: cutterName.trim() }
          : order
      );
      setOrders(updatedOrders);
      
      // Update localStorage
      const savedOrders = JSON.parse(localStorage.getItem('workshopOrders') || '[]');
      const updatedSavedOrders = savedOrders.map((order: any) => 
        order.id === orderId 
          ? { ...order, status: 'جاري الإنتاج', cutter: cutterName.trim() }
          : order
      );
      localStorage.setItem('workshopOrders', JSON.stringify(updatedSavedOrders));
      
      alert(`تم بدء الإنتاج للطلب ${orderId} مع القصاص: ${cutterName}`);
    }
  };

  const handleCompleteProduction = (orderId: string) => {
    if (confirm('هل أنت متأكد من إكتمال إنتاج هذا الطلب؟')) {
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'مكتمل' }
          : order
      );
      setOrders(updatedOrders);
      
      // Update localStorage
      const savedOrders = JSON.parse(localStorage.getItem('workshopOrders') || '[]');
      const updatedSavedOrders = savedOrders.map((order: any) => 
        order.id === orderId 
          ? { ...order, status: 'مكتمل' }
          : order
      );
      localStorage.setItem('workshopOrders', JSON.stringify(updatedSavedOrders));
      
      alert(`تم إكتمال الطلب ${orderId}!\n\nسيتم إرسال إشعار للعميل يتضمن:\n- خيارات التوصيل\n- خيارات المغسلة\n- خدمات إضافية أخرى`);
    }
  };

  const handlePrintQR = (order: any) => {
    setSelectedOrderForPrint(order);
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrderForDetails(order);
  };

  const handleViewCustomerDetails = (customer: any) => {
    // Create a dialog or modal to show customer measurements and details
    const measurementsText = `
قياسات العميل: ${customer.name}

الصدر: ${customer.measurements.chest} سم
الخصر: ${customer.measurements.waist} سم
الكتف: ${customer.measurements.shoulder} سم
الرقبة: ${customer.measurements.neck} سم
الطول: ${customer.measurements.length} سم

العنوان الكامل:
${customer.address.country} - ${customer.address.state}
${customer.address.area} - ${customer.address.street}
منزل رقم: ${customer.address.house}
    `;
    
    alert(measurementsText);
  };

  const handleViewCustomerOrders = (customer: any) => {
    // Show customer's previous orders
    const customerOrders = orders.filter(order => order.customerName === customer.name);
    const ordersText = customerOrders.length > 0 
      ? customerOrders.map(order => `
الطلب: ${order.id}
التاريخ: ${order.createdAt}
القيمة: ${order.total.toFixed(3)} د.ك
الحالة: ${order.status}
      `).join('\n---\n')
      : 'لا توجد طلبات سابقة لهذا العميل';
    
    alert(`الطلبات السابقة للعميل: ${customer.name}\n\n${ordersText}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title={workshop.name}
        subtitle={`لوحة تحكم الورشة - ${workshop.type}`}
        showSignOutButton={true}
        hideSettingsButton={true}
        actions={
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate(`/new-order?workshopId=${workshopId}`)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              طلب جديد
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6 sm:mb-8">
          <StatsCard
            title="إجمالي الطلبات"
            value={stats.totalOrders}
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="طلبات جديدة"
            value={stats.newOrders}
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-amber-500 to-amber-600"
          />
          <StatsCard
            title="جاري الإنتاج"
            value={stats.inProgress}
            icon={Package}
            gradient="bg-gradient-to-r from-orange-500 to-orange-600"
          />
          <StatsCard
            title="مكتملة"
            value={stats.completed}
            icon={CheckCircle}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard
            title="العملاء"
            value={stats.totalCustomers}
            icon={Users}
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatsCard
            title="الإيرادات"
            value={`${stats.totalRevenue.toFixed(3)} د.ك`}
            icon={BarChart3}
            gradient="bg-gradient-to-r from-teal-500 to-teal-600"
          />
          <StatsCard
            title="معدل الإنجاز"
            value={`${stats.completionRate.toFixed(1)}%`}
            icon={CheckCircle}
            gradient="bg-gradient-to-r from-emerald-500 to-emerald-600"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="orders" className="text-xs sm:text-sm py-2">
              الطلبات ({stats.totalOrders})
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm py-2">
              العملاء ({stats.totalCustomers})
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs sm:text-sm py-2">
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm py-2">
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter Bar - Only for orders and customers */}
          {(selectedTab === 'orders' || selectedTab === 'customers') && (
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={`البحث في ${selectedTab === 'orders' ? 'الطلبات' : 'العملاء'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              
              {selectedTab === 'orders' && (
                <div className="flex flex-wrap gap-2">
                  {['all', 'جديد', 'جاري الإنتاج', 'مكتمل'].map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className="text-xs"
                    >
                      {status === 'all' ? 'الكل' : status}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>الطلبات ({filteredOrders.length})</span>
                  <Badge variant="secondary" className="text-xs">
                    إجمالي القيمة: {filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(3)} د.ك
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="border hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            {/* Order Header */}
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-lg text-primary">#{order.id}</h3>
                              <Badge className={`${getStatusColor(order.status)} border`}>
                                {order.status}
                              </Badge>
                              {order.cutter && (
                                <Badge variant="outline" className="text-xs">
                                  القصاص: {order.cutter}
                                </Badge>
                              )}
                            </div>
                            
                            {/* Customer Info */}
                            <div className="space-y-1">
                              <p className="font-medium text-gray-800">{order.customerName}</p>
                              <p className="text-sm text-gray-600">{order.phone}</p>
                            </div>
                            
                            {/* Order Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">القطع:</span>
                                <p className="font-semibold">{order.items}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المجموع:</span>
                                <p className="font-semibold text-primary">{order.total.toFixed(3)} د.ك</p>
                              </div>
                              <div>
                                <span className="text-gray-500">التسليم:</span>
                                <p className="font-semibold">{order.deliveryDate}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">التاريخ:</span>
                                <p className="font-semibold">{order.createdAt}</p>
                              </div>
                            </div>

                            {/* Payment Information */}
                            {order.payment && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                  <div>
                                    <span className="text-gray-500">طريقة الدفع:</span>
                                    <p className="font-semibold flex items-center">
                                      {order.payment.type === 'cash' ? (
                                        <>
                                          <Banknote className="w-3 h-3 mr-1" />
                                          نقدي
                                        </>
                                      ) : (
                                        <>
                                          <CreditCard className="w-3 h-3 mr-1" />
                                          إلكتروني
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">المبلغ المستلم:</span>
                                    <p className="font-semibold text-green-600">{order.payment.receivedAmount?.toFixed(3)} د.ك</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">المبلغ المتبقي:</span>
                                    <p className="font-semibold text-red-600">{order.payment.remainingAmount?.toFixed(3)} د.ك</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* QR Codes */}
                            <div className="flex flex-wrap gap-1">
                              {order.qrCodes.map(qr => (
                                <Badge key={qr} variant="outline" className="text-xs font-mono">
                                  {qr}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handlePrintQR(order)}
                              className="w-full"
                            >
                              <QrCode className="w-3 h-3 mr-1" />
                              طباعة الأكواد
                            </Button>
                            
                            {order.status === 'جديد' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleStartProduction(order.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                بدء الإنتاج
                              </Button>
                            )}
                            
                            {order.status === 'جاري الإنتاج' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleCompleteProduction(order.id)}
                                className="w-full bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                إنتهاء الإنتاج
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewOrderDetails(order)}
                              className="w-full"
                            >
                              عرض التفاصيل
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد طلبات {statusFilter !== 'all' ? `بحالة "${statusFilter}"` : ''}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>العملاء ({filteredCustomers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="border hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">{customer.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {customer.gender}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">الهاتف:</span>
                                <p className="font-medium">{customer.phone}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">البريد:</span>
                                <p className="font-medium">{customer.email || 'غير محدد'}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الجنس:</span>
                                <p className="font-medium">{customer.gender || 'غير محدد'}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المحافظة:</span>
                                <p className="font-medium">{customer.address.governorate || 'غير محدد'}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المنطقة:</span>
                                <p className="font-medium">{customer.address.area || 'غير محدد'}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">آخر طلب:</span>
                                <p className="font-medium">{customer.lastOrder}</p>
                              </div>
                            </div>
                            
                            {/* Detailed Address */}
                            {(customer.address.block || customer.address.street || customer.address.houseNumber) && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded-lg">
                                <div>
                                  <span className="text-gray-500">القطعة:</span>
                                  <p className="font-medium">{customer.address.block || 'غير محدد'}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">الشارع:</span>
                                  <p className="font-medium">{customer.address.street || 'غير محدد'}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">رقم المنزل:</span>
                                  <p className="font-medium">{customer.address.houseNumber || 'غير محدد'}</p>
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                              <div className="text-center">
                                <p className="text-gray-500">الطلبات</p>
                                <p className="font-bold text-primary">{customer.orders}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-500">إجمالي الإنفاق</p>
                                <p className="font-bold text-green-600">{customer.totalSpent.toFixed(3)} د.ك</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-500">متوسط الطلب</p>
                                <p className="font-bold">{(customer.totalSpent / customer.orders).toFixed(3)} د.ك</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 w-full lg:w-48">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleViewCustomerDetails(customer)}
                              className="w-full"
                            >
                              عرض القياسات
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewCustomerOrders(customer)}
                              className="w-full"
                            >
                              الطلبات السابقة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredCustomers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد عملاء</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    تقرير المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>مبيعات اليوم:</span>
                      <span className="font-bold text-primary">45.750 د.ك</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مبيعات الأسبوع:</span>
                      <span className="font-bold text-primary">234.500 د.ك</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مبيعات الشهر:</span>
                      <span className="font-bold text-primary">1,245.750 د.ك</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>النمو الشهري:</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    تقرير المخزون
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>الأقمشة المتوفرة:</span>
                      <span className="font-bold">120 متر</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الإكسسوارات:</span>
                      <span className="font-bold">85 قطعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تحتاج تجديد:</span>
                      <span className="font-bold text-red-600">5 عناصر</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>قيمة المخزون:</span>
                      <span className="font-bold text-primary">2,890.250 د.ك</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    تقرير العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>عملاء جدد (هذا الشهر):</span>
                      <span className="font-bold text-green-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عملاء متكررون:</span>
                      <span className="font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط الطلبات للعميل:</span>
                      <span className="font-bold">3.2</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>معدل الاحتفاظ:</span>
                      <span className="font-bold text-primary">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrderForDetails}
        isOpen={!!selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
      />

      {/* QR Code Print Modal */}
      <QRCodePrintModal
        order={selectedOrderForPrint}
        isOpen={!!selectedOrderForPrint}
        onClose={() => setSelectedOrderForPrint(null)}
      />
    </div>
  );
};

export default WorkshopDashboard;
