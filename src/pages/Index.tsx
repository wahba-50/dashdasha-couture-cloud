
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, ShoppingCart, Settings, Eye, Plus, Package, BarChart3, Truck, Globe } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-blue-600 to-amber-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  نظام إدارة ورش الدشاديش
                </h1>
                <p className="text-gray-600 text-sm mt-1">نظام سحابي متكامل لإدارة ورش تفصيل الدشاديش في الكويت</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-3">
              <Button 
                onClick={() => navigate('/workshop/new')} 
                className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg px-6 py-3"
              >
                <Plus className="w-5 h-5 ml-2" />
                إضافة ورشة جديدة
              </Button>
              <div className="flex items-center space-x-reverse space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Globe className="w-3 h-3 ml-1" />
                  العربية
                </Button>
                <Button variant="outline" size="sm" className="text-xs">English</Button>
              </div>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Access Menu */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Button 
            onClick={() => navigate('/customers')}
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium">العملاء</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/products')}
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
          >
            <Package className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium">المنتجات</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/reports')}
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
          >
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium">التقارير</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/external-services')}
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200"
          >
            <Truck className="w-6 h-6 text-amber-600" />
            <span className="text-sm font-medium">الخدمات الخارجية</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/new-order')}
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium">طلب جديد</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <Settings className="w-6 h-6 text-gray-600" />
            <span className="text-sm font-medium">الإعدادات</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي الورش</p>
                  <p className="text-3xl font-bold">{stats.totalWorkshops}</p>
                  <p className="text-blue-200 text-xs mt-1">ورش نشطة</p>
                </div>
                <Building2 className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <p className="text-amber-200 text-xs mt-1">مستخدم نشط</p>
                </div>
                <Users className="w-10 h-10 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">إجمالي العملاء</p>
                  <p className="text-3xl font-bold">{stats.totalCustomers}</p>
                  <p className="text-green-200 text-xs mt-1">عميل مسجل</p>
                </div>
                <Users className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                  <p className="text-purple-200 text-xs mt-1">طلب مكتمل</p>
                </div>
                <ShoppingCart className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workshops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="workshops" className="text-base">الورش</TabsTrigger>
            <TabsTrigger value="customers" className="text-base">العملاء</TabsTrigger>
            <TabsTrigger value="orders" className="text-base">الطلبات</TabsTrigger>
            <TabsTrigger value="services" className="text-base">الخدمات الخارجية</TabsTrigger>
          </TabsList>

          <TabsContent value="workshops" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-t-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-xl">إدارة الورش</CardTitle>
                  <Button 
                    onClick={() => navigate('/workshop/new')} 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-amber-500"
                  >
                    إضافة ورشة
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center space-x-reverse space-x-3 mb-2">
                            <h3 className="font-bold text-xl text-gray-800">{workshop.name}</h3>
                            <Badge variant="secondary" className="text-xs">{workshop.type}</Badge>
                            <Badge variant={workshop.status === 'نشط' ? 'default' : 'destructive'} className="text-xs">
                              {workshop.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Building2 className="w-4 h-4 ml-1" />
                            {workshop.address}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-reverse space-x-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/workshop/${workshop.id}`)}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => navigate(`/workshop/${workshop.id}/dashboard`)}
                            className="bg-gradient-to-r from-blue-600 to-amber-500"
                          >
                            دخول الورشة
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{workshop.users}</p>
                          <p className="text-sm text-gray-600">المستخدمين</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{workshop.customers}</p>
                          <p className="text-sm text-gray-600">العملاء</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{workshop.orders}</p>
                          <p className="text-sm text-gray-600">الطلبات</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">جميع العملاء</CardTitle>
                  <Button onClick={() => navigate('/customers')} size="sm">
                    عرض التفاصيل
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">سيتم عرض قائمة شاملة بجميع العملاء من كافة الورش هنا</p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">💡 يمكنك الوصول إلى قاعدة بيانات العملاء الكاملة مع إمكانيات البحث والتصفية المتقدمة</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">جميع الطلبات</CardTitle>
                  <Button onClick={() => navigate('/reports')} size="sm">
                    عرض التقارير
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">سيتم عرض قائمة شاملة بجميع الطلبات من كافة الورش هنا</p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">📊 تقارير مفصلة عن أداء الطلبات والإيرادات متاحة في قسم التقارير</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">الخدمات الخارجية</CardTitle>
                  <Button onClick={() => navigate('/external-services')} size="sm">
                    إدارة الخدمات
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">إدارة خدمات التوصيل والمغسلة وغيرها من الخدمات الإضافية</p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-700">🚚 يمكن إضافة وإدارة خدمات التوصيل والمغسلة والخدمات الأخرى التي ستظهر للعملاء عند إكتمال طلباتهم</p>
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
