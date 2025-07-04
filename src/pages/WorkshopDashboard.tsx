
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Users, Package, Clock, Search, Plus, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in real app, this would come from API
  const workshop = {
    id: workshopId,
    name: "ورشة الأناقة الكويتية",
    type: "حريمي ورجالي"
  };

  const orders = [
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد الكندري',
      phone: '97712345678',
      items: 2,
      total: 45.500,
      status: 'جديد',
      deliveryDate: '2024-07-15',
      createdAt: '2024-07-04'
    },
    {
      id: 'ORD-002',
      customerName: 'فاطمة علي العتيبي',
      phone: '97712345679',
      items: 1,
      total: 28.750,
      status: 'جاري الإنتاج',
      deliveryDate: '2024-07-12',
      createdAt: '2024-07-02'
    },
    {
      id: 'ORD-003',
      customerName: 'خالد سعد المطيري',
      phone: '97712345680',
      items: 3,
      total: 67.250,
      status: 'مكتمل',
      deliveryDate: '2024-07-08',
      createdAt: '2024-06-28'
    }
  ];

  const customers = [
    {
      name: 'أحمد محمد الكندري',
      phone: '97712345678',
      orders: 5,
      lastOrder: '2024-07-04'
    },
    {
      name: 'فاطمة علي العتيبي',
      phone: '97712345679',
      orders: 3,
      lastOrder: '2024-07-02'
    }
  ];

  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'جديد').length,
    inProgress: orders.filter(o => o.status === 'جاري الإنتاج').length,
    completed: orders.filter(o => o.status === 'مكتمل').length,
    totalCustomers: customers.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800';
      case 'جاري الإنتاج': return 'bg-yellow-100 text-yellow-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-reverse space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{workshop.name}</h1>
                <p className="text-sm text-gray-600">لوحة تحكم الورشة - {workshop.type}</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/new-order')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              طلب جديد
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-blue-100 text-sm">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-yellow-100 text-sm">طلبات جديدة</p>
                <p className="text-2xl font-bold">{stats.newOrders}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-orange-100 text-sm">جاري الإنتاج</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-green-100 text-sm">مكتملة</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-purple-100 text-sm">العملاء</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-teal-100 text-sm">الإيرادات</p>
                <p className="text-lg font-bold">{stats.totalRevenue.toFixed(3)} د.ك</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>الطلبات</CardTitle>
                  <div className="flex items-center space-x-reverse space-x-2 w-full max-w-sm">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث برقم الطلب أو اسم العميل..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-reverse space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">#{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-1">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.phone}</p>
                          <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-600 mt-2">
                            <span>{order.items} قطعة</span>
                            <span>{order.total.toFixed(3)} د.ك</span>
                            <span>التسليم: {order.deliveryDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-reverse space-x-2">
                          {order.status === 'جديد' && (
                            <Button size="sm" variant="outline">
                              بدء الإنتاج
                            </Button>
                          )}
                          {order.status === 'جاري الإنتاج' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              إنتهاء الإنتاج
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
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
                <CardTitle>العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-600">عدد الطلبات: {customer.orders}</p>
                          <p className="text-sm text-gray-500">آخر طلب: {customer.lastOrder}</p>
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
                <CardTitle>إدارة المنتجات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">إدارة الأقمشة والقصات والإكسسوارات</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">تقارير مفصلة عن الأداء والمبيعات</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
