import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Package, 
  Settings,
  Search,
  Filter,
  Plus,
  Eye,
  LogIn,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SystemHeader from '@/components/SystemHeader';
import WorkshopDetailsModal from '@/components/WorkshopDetailsModal';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const workshops = [
    {
      id: '1',
      name: 'ورشة الثقافة الكويتية',
      type: 'men',
      location: 'الكويت، حولي، الجابرية',
      status: 'نشط',
      customers: 3,
      orders: 125,
      revenue: 15420.75,
      hasExternalServices: true
    },
    {
      id: '2', 
      name: 'تفصيل دشداش العز',
      type: 'men',
      location: 'الكويت، الفروانية، جليب الشيوخ',
      status: 'نشط',
      customers: 2,
      orders: 87,
      revenue: 8935.25,
      hasExternalServices: false
    },
    {
      id: '3',
      name: 'ورشة الخياطة النسائية',
      type: 'women',
      location: 'الكويت، الأحمدي، الفحيحيل',
      status: 'نشط',
      customers: 4,
      orders: 156, 
      revenue: 22840.50,
      hasExternalServices: true
    }
  ];

  const customers = [
    { id: 1, name: 'أحمد محمد الكندري', phone: '+965 9999 8888', orders: 5, totalSpent: 450.25 },
    { id: 2, name: 'فاطمة علي السالم', phone: '+965 9888 7777', orders: 3, totalSpent: 320.50 },
    { id: 3, name: 'محمد سعد العتيبي', phone: '+965 9777 6666', orders: 8, totalSpent: 650.75 }
  ];

  const orders = [
    { id: 1, customer: 'أحمد الكندري', item: 'دشداشة رجالي', status: 'قيد التنفيذ', amount: 75.00 },
    { id: 2, customer: 'فاطمة السالم', item: 'فستان سهرة', status: 'مكتمل', amount: 150.25 },
    { id: 3, customer: 'محمد العتيبي', item: 'بدلة رسمية', status: 'جديد', amount: 200.50 }
  ];

  const externalServices = [
    { id: 1, name: 'خدمة التوصيل السريع', price: '2.500 د.ك', status: 'نشط' },
    { id: 2, name: 'مغسلة الثقافة', price: '1.750 د.ك', status: 'نشط' },
    { id: 3, name: 'الكي المتخصص', price: '0.750 د.ك', status: 'نشط' }
  ];

  const handleViewDetails = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsDetailsModalOpen(true);
  };

  const handleEnterWorkshop = (workshopId: string) => {
    navigate(`/workshop/${workshopId}/dashboard`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير مفعل': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'men': return 'رجالي';
      case 'women': return 'حريمي'; 
      case 'both': return 'رجالي وحريمي';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader 
        title="لوحة تحكم مالك النظام"
        subtitle="إدارة شاملة لجميع الورش والخدمات"
        actions={
          <Button onClick={() => navigate('/workshop/new')}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة ورشة جديدة
          </Button>
        }
      />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            تصفية
          </Button>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="workshops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workshops">الورش</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="external-services">الخدمات الخارجية</TabsTrigger>
          </TabsList>

          {/* Workshops Tab */}
          <TabsContent value="workshops">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة الورش ({workshops.length})</h2>
                <Button onClick={() => navigate('/workshop/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة ورشة جديدة
                </Button>
              </div>
              
              <div className="grid gap-6">
                {workshops.map((workshop) => (
                  <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          {workshop.name}
                        </CardTitle>
                        <Badge className={getStatusColor(workshop.status)}>
                          {workshop.status}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        {getTypeLabel(workshop.type)} • {workshop.location}
                        {workshop.hasExternalServices && (
                          <Badge variant="secondary" className="mr-2">
                            خدمات خارجية
                          </Badge>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">المستخدمين</p>
                          <p className="text-xl font-bold text-blue-600">{workshop.customers}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">العملاء</p>
                          <p className="text-xl font-bold text-green-600">{workshop.orders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">الإيرادات</p>
                          <p className="text-xl font-bold text-amber-600">{workshop.revenue.toLocaleString()} د.ك</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewDetails(workshop)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          عرض التفاصيل
                        </Button>
                        <Button 
                          className="flex-1"
                          onClick={() => handleEnterWorkshop(workshop.id)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          دخول الورشة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">إدارة العملاء ({customers.length})</h2>
              <div className="grid gap-4">
                {customers.map((customer) => (
                  <Card key={customer.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">الطلبات: {customer.orders}</p>
                          <p className="font-semibold">{customer.totalSpent} د.ك</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">إدارة الطلبات ({orders.length})</h2>
              <div className="grid gap-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{order.customer}</h3>
                          <p className="text-sm text-gray-600">{order.item}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="font-semibold mt-2">{order.amount} د.ك</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* External Services Tab */}
          <TabsContent value="external-services">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الخدمات الخارجية ({externalServices.length})</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة خدمة
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {externalServices.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                        </div>
                        <Badge className={getStatusColor(service.status)} >
                          {service.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            إيقاف
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Workshop Details Modal */}
      <WorkshopDetailsModal
        workshop={selectedWorkshop}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEnterWorkshop={handleEnterWorkshop}
      />
    </div>
  );
};

export default Index;
