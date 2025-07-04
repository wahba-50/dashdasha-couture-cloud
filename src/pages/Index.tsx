
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, ShoppingCart, Settings, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [workshops] = useState([
    {
      id: 1,
      name: "ورشة الأناقة الكويتية",
      type: "حريمي ورجالي",
      address: "الكويت، حولي، الجابرية",
      users: 3,
      customers: 125,
      orders: 45,
      status: "نشط"
    },
    {
      id: 2,
      name: "تفصيل دشاديش العز",
      type: "رجالي",
      address: "الكويت، الفروانية، جليب الشيوخ",
      users: 2,
      customers: 87,
      orders: 23,
      status: "نشط"
    }
  ]);

  const stats = {
    totalWorkshops: workshops.length,
    totalUsers: workshops.reduce((sum, w) => sum + w.users, 0),
    totalCustomers: workshops.reduce((sum, w) => sum + w.customers, 0),
    totalOrders: workshops.reduce((sum, w) => sum + w.orders, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-amber-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">نظام إدارة ورش الدشاديش</h1>
                <p className="text-sm text-gray-600">لوحة تحكم مالك النظام</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button onClick={() => navigate('/workshop/new')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 ml-2" />
                إضافة ورشة جديدة
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">إجمالي الورش</p>
                  <p className="text-3xl font-bold">{stats.totalWorkshops}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">إجمالي العملاء</p>
                  <p className="text-3xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workshops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workshops">الورش</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="services">الخدمات الخارجية</TabsTrigger>
          </TabsList>

          <TabsContent value="workshops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>إدارة الورش</span>
                  <Button onClick={() => navigate('/workshop/new')} size="sm">
                    إضافة ورشة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{workshop.name}</h3>
                          <p className="text-sm text-gray-600">{workshop.address}</p>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Badge variant="secondary">{workshop.type}</Badge>
                          <Badge variant={workshop.status === 'نشط' ? 'default' : 'destructive'}>
                            {workshop.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <span>المستخدمين: {workshop.users}</span>
                        <span>العملاء: {workshop.customers}</span>
                        <span>الطلبات: {workshop.orders}</span>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/workshop/${workshop.id}`)}
                        >
                          <Eye className="w-4 h-4 ml-1" />
                          عرض التفاصيل
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/workshop/${workshop.id}/dashboard`)}
                        >
                          دخول الورشة
                        </Button>
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
                <CardTitle>جميع العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">سيتم عرض قائمة شاملة بجميع العملاء من كافة الورش هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>جميع الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">سيتم عرض قائمة شاملة بجميع الطلبات من كافة الورش هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>الخدمات الخارجية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">إدارة خدمات التوصيل والمغسلة وغيرها</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
