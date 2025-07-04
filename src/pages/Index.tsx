
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Building2, Users, ShoppingCart, Plus, Eye, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('workshops');

  const [workshops] = useState([
    {
      id: 1,
      name: "ورشة الأناقة الكويتية",
      type: "حريمي ورجالي",
      address: "الكويت، حولي، الجابرية",
      users: 3,
      customers: 125,
      orders: 45,
      status: "نشط",
      revenue: 15420.750
    },
    {
      id: 2,
      name: "تفصيل دشاديش العز",
      type: "رجالي",
      address: "الكويت، الفروانية، جليب الشيوخ",
      users: 2,
      customers: 87,
      orders: 23,
      status: "نشط",
      revenue: 8935.250
    },
    {
      id: 3,
      name: "ورشة الفخامة النسائية",
      type: "حريمي",
      address: "الكويت، الأحمدي، الفحيحيل",
      users: 4,
      customers: 156,
      orders: 67,
      status: "نشط",
      revenue: 22840.500
    }
  ]);

  const allCustomers = [
    { id: 1, name: 'أحمد محمد الكندري', phone: '97712345678', workshop: 'ورشة الأناقة الكويتية', orders: 5, lastOrder: '2024-07-04', totalSpent: 234.750 },
    { id: 2, name: 'فاطمة علي العتيبي', phone: '97712345679', workshop: 'ورشة الأناقة الكويتية', orders: 3, lastOrder: '2024-07-02', totalSpent: 156.250 },
    { id: 3, name: 'خالد سعد المطيري', phone: '97712345680', workshop: 'تفصيل دشاديش العز', orders: 2, lastOrder: '2024-06-28', totalSpent: 89.500 },
    { id: 4, name: 'مريم حسن الرشيد', phone: '97712345681', workshop: 'ورشة الفخامة النسائية', orders: 8, lastOrder: '2024-07-05', totalSpent: 445.250 }
  ];

  const allOrders = [
    { id: 'ORD-001', customer: 'أحمد محمد الكندري', workshop: 'ورشة الأناقة الكويتية', items: 2, total: 45.500, status: 'جديد', date: '2024-07-04' },
    { id: 'ORD-002', customer: 'فاطمة علي العتيبي', workshop: 'ورشة الأناقة الكويتية', items: 1, total: 28.750, status: 'جاري الإنتاج', date: '2024-07-02' },
    { id: 'ORD-003', customer: 'خالد سعد المطيري', workshop: 'تفصيل دشاديش العز', items: 3, total: 67.250, status: 'مكتمل', date: '2024-06-28' },
    { id: 'ORD-004', customer: 'مريم حسن الرشيد', workshop: 'ورشة الفخامة النسائية', items: 2, total: 89.750, status: 'جاري الإنتاج', date: '2024-07-03' }
  ];

  const externalServices = [
    { id: 1, name: 'خدمة التوصيل السريع', price: 2.500, type: 'delivery', active: true },
    { id: 2, name: 'مغسلة الأناقة', price: 1.750, type: 'laundry', active: true },
    { id: 3, name: 'الكي المتخصص', price: 0.750, type: 'ironing', active: true }
  ];

  const stats = {
    totalWorkshops: workshops.length,
    totalUsers: workshops.reduce((sum, w) => sum + w.users, 0),
    totalCustomers: workshops.reduce((sum, w) => sum + w.customers, 0),
    totalOrders: workshops.reduce((sum, w) => sum + w.orders, 0),
    totalRevenue: workshops.reduce((sum, w) => sum + w.revenue, 0)
  };

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.name.includes(searchTerm) || workshop.address.includes(searchTerm)
  );

  const filteredCustomers = allCustomers.filter(customer =>
    customer.name.includes(searchTerm) || customer.phone.includes(searchTerm) || customer.workshop.includes(searchTerm)
  );

  const filteredOrders = allOrders.filter(order =>
    order.id.includes(searchTerm) || order.customer.includes(searchTerm) || order.workshop.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'جديد': 'bg-blue-100 text-blue-800',
      'جاري الإنتاج': 'bg-yellow-100 text-yellow-800',
      'مكتمل': 'bg-green-100 text-green-800',
      'نشط': 'bg-green-100 text-green-800'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title={t('system.title')}
        subtitle={t('system.subtitle')}
        actions={
          <Button 
            onClick={() => navigate('/workshop/new')} 
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('workshop.add')}
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title="إجمالي الورش"
            value={stats.totalWorkshops}
            icon={Building2}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="إجمالي المستخدمين"
            value={stats.totalUsers}
            icon={Users}
            gradient="bg-gradient-to-r from-amber-500 to-amber-600"
          />
          <StatsCard
            title="إجمالي العملاء"
            value={stats.totalCustomers}
            icon={Users}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard
            title="إجمالي الطلبات"
            value={stats.totalOrders}
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatsCard
            title="إجمالي الإيرادات"
            value={`${stats.totalRevenue.toFixed(3)} د.ك`}
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-teal-500 to-teal-600"
          />
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="workshops" className="text-xs sm:text-sm py-2">
              {t('dashboard.workshops')}
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm py-2">
              {t('dashboard.customers')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm py-2">
              {t('dashboard.orders')}
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs sm:text-sm py-2">
              {t('dashboard.externalServices')}
            </TabsTrigger>
          </TabsList>

          {/* Search Bar */}
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
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              تصفية
            </Button>
          </div>

          <TabsContent value="workshops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span>إدارة الورش ({filteredWorkshops.length})</span>
                  <Button onClick={() => navigate('/workshop/new')} size="sm">
                    {t('workshop.add')}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredWorkshops.map((workshop) => (
                    <div key={workshop.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{workshop.name}</h3>
                            <Badge variant="secondary">{workshop.type}</Badge>
                            <Badge className={getStatusBadge(workshop.status)}>
                              {workshop.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{workshop.address}</p>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                            <span>المستخدمين: {workshop.users}</span>
                            <span>العملاء: {workshop.customers}</span>
                            <span>الطلبات: {workshop.orders}</span>
                            <span>الإيرادات: {workshop.revenue.toFixed(3)} د.ك</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/workshop/${workshop.id}`)}
                            className="w-full sm:w-auto"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {t('workshop.details')}
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => navigate(`/workshop/${workshop.id}/dashboard`)}
                            className="w-full sm:w-auto"
                          >
                            {t('workshop.enter')}
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
                <CardTitle>جميع العملاء ({filteredCustomers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{customer.name}</h4>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                          <p className="text-sm text-gray-500">{customer.workshop}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">الطلبات: </span>
                            <span className="font-medium">{customer.orders}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">آخر طلب: </span>
                            <span className="font-medium">{customer.lastOrder}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">إجمالي الإنفاق: </span>
                            <span className="font-medium">{customer.totalSpent.toFixed(3)} د.ك</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>جميع الطلبات ({filteredOrders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold">#{order.id}</h4>
                            <Badge className={getStatusBadge(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.workshop}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">القطع: </span>
                            <span className="font-medium">{order.items}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">المجموع: </span>
                            <span className="font-medium">{order.total.toFixed(3)} د.ك</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span>الخدمات الخارجية ({externalServices.length})</span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة خدمة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {externalServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant={service.active ? "default" : "secondary"}>
                          {service.active ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {service.price.toFixed(3)} د.ك
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          تعديل
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {service.active ? 'إيقاف' : 'تفعيل'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
