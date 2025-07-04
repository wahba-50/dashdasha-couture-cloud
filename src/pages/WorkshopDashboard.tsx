
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Users, Package, Plus, Search, Filter, Play, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import StatsCard from "@/components/StatsCard";

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('orders');
  const [statusFilter, setStatusFilter] = useState('all');

  const workshop = {
    id: workshopId,
    name: "ورشة الأناقة الكويتية",
    type: "حريمي ورجالي"
  };

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد الكندري',
      phone: '97712345678',
      items: 2,
      total: 45.500,
      status: 'جديد',
      deliveryDate: '2024-07-15',
      createdAt: '2024-07-04',
      qrCodes: ['QR001A', 'QR001B'],
      cutter: null
    },
    {
      id: 'ORD-002',
      customerName: 'فاطمة علي العتيبي',
      phone: '97712345679',
      items: 1,
      total: 28.750,
      status: 'جاري الإنتاج',
      deliveryDate: '2024-07-12',
      createdAt: '2024-07-02',
      qrCodes: ['QR002A'],
      cutter: 'محمد الخياط'
    },
    {
      id: 'ORD-003',
      customerName: 'خالد سعد المطيري',
      phone: '97712345680',
      items: 3,
      total: 67.250,
      status: 'مكتمل',
      deliveryDate: '2024-07-08',
      createdAt: '2024-06-28',
      qrCodes: ['QR003A', 'QR003B', 'QR003C'],
      cutter: 'أحمد القصاص'
    }
  ]);

  const customers = [
    {
      id: 1,
      name: 'أحمد محمد الكندري',
      phone: '97712345678',
      orders: 5,
      lastOrder: '2024-07-04',
      totalSpent: 234.750,
      measurements: { chest: 95, waist: 85, shoulder: 45 }
    },
    {
      id: 2,
      name: 'فاطمة علي العتيبي',
      phone: '97712345679',
      orders: 3,
      lastOrder: '2024-07-02',
      totalSpent: 156.250,
      measurements: { chest: 88, waist: 78, shoulder: 40 }
    }
  ];

  const products = [
    { id: 1, name: 'قماش قطني فاخر', type: 'fabric', price: 12.500, stock: 50, unit: 'متر' },
    { id: 2, name: 'قصة دشداشة كلاسيكية', type: 'cut', price: 15.750, stock: 100, unit: 'قطعة' },
    { id: 3, name: 'أزرار ذهبية', type: 'accessory', price: 2.250, stock: 200, unit: 'عدد' }
  ];

  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'جديد').length,
    inProgress: orders.filter(o => o.status === 'جاري الإنتاج').length,
    completed: orders.filter(o => o.status === 'مكتمل').length,
    totalCustomers: customers.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.customerName.includes(searchTerm) ||
                         order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.includes(searchTerm) || customer.phone.includes(searchTerm)
  );

  const filteredProducts = products.filter(product =>
    product.name.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800';
      case 'جاري الإنتاج': return 'bg-yellow-100 text-yellow-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartProduction = (orderId: string) => {
    const cutterName = prompt('أدخل اسم القصاص:');
    if (cutterName) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'جاري الإنتاج', cutter: cutterName }
          : order
      ));
    }
  };

  const handleCompleteProduction = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'مكتمل' }
        : order
    ));
    // Here would be the logic to send WhatsApp/email notifications
    alert('تم إرسال إشعار للعميل بإكتمال الطلب وخيارات الخدمات الإضافية');
  };

  const handlePrintQR = (qrCodes: string[], orderDetails: any) => {
    // Mock print functionality
    console.log('Printing QR codes:', qrCodes, 'for order:', orderDetails);
    alert(`تم طباعة ${qrCodes.length} كود QR للطلب ${orderDetails.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title={workshop.name}
        subtitle={`لوحة تحكم الورشة - ${workshop.type}`}
        showBackButton={true}
        actions={
          <Button 
            onClick={() => navigate('/new-order')}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('order.new')}
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 sm:mb-8">
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
            gradient="bg-gradient-to-r from-yellow-500 to-yellow-600"
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
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-teal-500 to-teal-600"
          />
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="orders" className="text-xs sm:text-sm py-2">
              {t('dashboard.orders')}
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm py-2">
              {t('dashboard.customers')}
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs sm:text-sm py-2">
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm py-2">
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`${t('common.search')}...`}
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

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات ({filteredOrders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">#{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-1">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.phone}</p>
                          {order.cutter && (
                            <p className="text-sm text-blue-600">القصاص: {order.cutter}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                            <span>{order.items} قطعة</span>
                            <span>{order.total.toFixed(3)} د.ك</span>
                            <span>التسليم: {order.deliveryDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePrintQR(order.qrCodes, order)}
                            className="w-full sm:w-auto"
                          >
                            طباعة QR
                          </Button>
                          
                          {order.status === 'جديد' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleStartProduction(order.id)}
                              className="w-full sm:w-auto"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              بدء الإنتاج
                            </Button>
                          )}
                          
                          {order.status === 'جاري الإنتاج' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleCompleteProduction(order.id)}
                              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              انتهاء الإنتاج
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>العملاء ({filteredCustomers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                            <span>الطلبات: {customer.orders}</span>
                            <span>آخر طلب: {customer.lastOrder}</span>
                            <span>إجمالي الإنفاق: {customer.totalSpent.toFixed(3)} د.ك</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            عرض القياسات
                          </Button>
                          <Button size="sm" variant="outline">
                            الطلبات السابقة
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span>إدارة المنتجات ({filteredProducts.length})</span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة منتج
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{product.name}</h4>
                        <Badge variant="secondary">{product.type}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>السعر: {product.price.toFixed(3)} د.ك/{product.unit}</p>
                        <p>المخزون: {product.stock} {product.unit}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          تعديل
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          إدارة المخزون
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>تقرير المبيعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>مبيعات اليوم:</span>
                      <span className="font-bold">45.750 د.ك</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مبيعات الأسبوع:</span>
                      <span className="font-bold">234.500 د.ك</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مبيعات الشهر:</span>
                      <span className="font-bold">1,245.750 د.ك</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تقرير الخامات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>الأكثر استخداماً:</span>
                      <span className="font-bold">قماش قطني</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تحتاج تجديد:</span>
                      <span className="font-bold text-red-600">5 عناصر</span>
                    </div>
                    <div className="flex justify-between">
                      <span>إجمالي القيمة:</span>
                      <span className="font-bold">2,890.250 د.ك</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
