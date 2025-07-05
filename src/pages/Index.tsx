import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Building2, Users, ShoppingCart, Plus, Eye, Search, Filter, Phone, Mail, MapPin, Ruler, Calendar, User, Power, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import StatsCard from "@/components/StatsCard";
import WorkshopDetailsModal from "@/components/WorkshopDetailsModal";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('workshops');
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<any>(null);
  const [selectedWorkshopForDetails, setSelectedWorkshopForDetails] = useState<any>(null);

  const [workshops, setWorkshops] = useState([
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

  // Enhanced customer data with detailed information from all workshops
  const allCustomers = [
    { 
      id: 1, 
      name: 'أحمد محمد الكندري', 
      phone: '97712345678', 
      email: 'ahmed.kندري@gmail.com',
      age: 35,
      gender: 'ذكر',
      workshop: 'ورشة الأناقة الكويتية', 
      orders: 5, 
      lastOrder: '2024-07-04', 
      totalSpent: 234.750,
      address: {
        country: 'الكويت',
        governorate: 'حولي',
        area: 'الجابرية',
        block: '1',
        street: '10',
        house: '15'
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
      }
    },
    { 
      id: 2, 
      name: 'فاطمة علي العتيبي', 
      phone: '97712345679', 
      email: 'fatma.ali@hotmail.com',
      age: 28,
      gender: 'أنثى',
      workshop: 'ورشة الأناقة الكويتية', 
      orders: 3, 
      lastOrder: '2024-07-02', 
      totalSpent: 156.250,
      address: {
        country: 'الكويت',
        governorate: 'العاصمة',
        area: 'قرطبة',
        block: '2',
        street: '15',
        house: '22'
      },
      measurements: {
        chest: '95',
        waist: '80',
        shoulder: '40',
        length: '145',
        armLength: '55',
        neckCircumference: '38',
        armOpening: '22',
        bottomWidth: '60',
        notes: 'تفضل القصات العصرية'
      }
    },
    { 
      id: 3, 
      name: 'خالد سعد المطيري', 
      phone: '97712345680', 
      email: 'khalid.mutairi@outlook.com',
      age: 42,
      gender: 'ذكر',
      workshop: 'تفصيل دشاديش العز', 
      orders: 2, 
      lastOrder: '2024-06-28', 
      totalSpent: 89.500,
      address: {
        country: 'الكويت',
        governorate: 'الجهراء',
        area: 'النسيم',
        block: '3',
        street: '8',
        house: '45'
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
        notes: 'العميل طويل القامة، يحتاج قصة طويلة'
      }
    },
    { 
      id: 4, 
      name: 'مريم حسن الرشيد', 
      phone: '97712345681', 
      email: 'mariam.rashid@gmail.com',
      age: 31,
      gender: 'أنثى',
      workshop: 'ورشة الفخامة النسائية', 
      orders: 8, 
      lastOrder: '2024-07-05', 
      totalSpent: 445.250,
      address: {
        country: 'الكويت',
        governorate: 'الأحمدي',
        area: 'الفحيحيل',
        block: '4',
        street: '20',
        house: '12'
      },
      measurements: {
        chest: '90',
        waist: '75',
        shoulder: '38',
        length: '140',
        armLength: '53',
        neckCircumference: '36',
        armOpening: '20',
        bottomWidth: '58',
        notes: 'تفضل الألوان الفاتحة والقصات الأنيقة'
      }
    }
  ];

  const allOrders = [
    { id: 'ORD-001', customer: 'أحمد محمد الكندري', workshop: 'ورشة الأناقة الكويتية', items: 2, total: 45.500, status: 'جديد', date: '2024-07-04' },
    { id: 'ORD-002', customer: 'فاطمة علي العتيبي', workshop: 'ورشة الأناقة الكويتية', items: 1, total: 28.750, status: 'جاري الإنتاج', date: '2024-07-02' },
    { id: 'ORD-003', customer: 'خالد سعد المطيري', workshop: 'تفصيل دشاديش العز', items: 3, total: 67.250, status: 'مكتمل', date: '2024-06-28' },
    { id: 'ORD-004', customer: 'مريم حسن الرشيد', workshop: 'ورشة الفخامة النسائية', items: 2, total: 89.750, status: 'جاري الإنتاج', date: '2024-07-03' }
  ];

  const [externalServices, setExternalServices] = useState([
    { id: 1, name: 'خدمة التوصيل السريع', price: 2.500, type: 'delivery', active: true },
    { id: 2, name: 'مغسلة الأناقة', price: 1.750, type: 'laundry', active: true },
    { id: 3, name: 'الكي المتخصص', price: 0.750, type: 'ironing', active: true }
  ]);

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
    customer.name.includes(searchTerm) || 
    customer.phone.includes(searchTerm) || 
    customer.email.includes(searchTerm) ||
    customer.workshop.includes(searchTerm)
  );

  const filteredOrders = allOrders.filter(order =>
    order.id.includes(searchTerm) || order.customer.includes(searchTerm) || order.workshop.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'جديد': 'bg-blue-100 text-blue-800',
      'جاري الإنتاج': 'bg-yellow-100 text-yellow-800',
      'مكتمل': 'bg-green-100 text-green-800',
      'نشط': 'bg-green-100 text-green-800',
      'غير نشط': 'bg-red-100 text-red-800'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const handleWorkshopAction = (action: string, workshopId?: number) => {
    console.log(`Workshop action: ${action}, ID: ${workshopId}`);
    switch (action) {
      case 'add':
        navigate('/workshop/new');
        break;
      case 'view':
        if (workshopId) {
          const workshop = workshops.find(w => w.id === workshopId);
          setSelectedWorkshopForDetails(workshop);
        }
        break;
      case 'enter':
        if (workshopId) {
          navigate(`/workshop/${workshopId}/dashboard`);
        }
        break;
      case 'toggle':
        if (workshopId) {
          setWorkshops(prevWorkshops => 
            prevWorkshops.map(workshop => 
              workshop.id === workshopId 
                ? { ...workshop, status: workshop.status === 'نشط' ? 'غير نشط' : 'نشط' }
                : workshop
            )
          );
        }
        break;
      default:
        console.log(`Action ${action} executed`);
    }
  };

  const handleServiceAction = (action: string, serviceId?: number) => {
    switch (action) {
      case 'add':
        setShowServiceDialog(true);
        break;
      case 'edit':
        alert(`تعديل الخدمة رقم ${serviceId}`);
        break;
      case 'toggle':
        setExternalServices(services => 
          services.map(service => 
            service.id === serviceId 
              ? { ...service, active: !service.active }
              : service
          )
        );
        break;
      default:
        console.log(`Service action ${action} executed`);
    }
  };

  const handleViewCustomerDetails = (customer: any) => {
    setSelectedCustomerForDetails(customer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title={t('system.title')}
        subtitle={t('system.subtitle')}
        actions={
          <Button 
            onClick={() => handleWorkshopAction('add')} 
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
                  <Button onClick={() => handleWorkshopAction('add')} size="sm">
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
                            onClick={() => handleWorkshopAction('view', workshop.id)}
                            className="w-full sm:w-auto"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {t('workshop.details')}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleWorkshopAction('toggle', workshop.id)}
                            className={`w-full sm:w-auto ${workshop.status === 'نشط' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                          >
                            {workshop.status === 'نشط' ? (
                              <>
                                <PowerOff className="w-4 h-4 mr-1" />
                                إيقاف
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4 mr-1" />
                                تفعيل
                              </>
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleWorkshopAction('enter', workshop.id)}
                            disabled={workshop.status !== 'نشط'}
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
                    <Card key={customer.id} className="border hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            {/* Customer Header */}
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-bold text-lg text-primary">{customer.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {customer.gender}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {customer.age} سنة
                              </Badge>
                            </div>
                            
                            {/* Contact Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{customer.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{customer.address.area}، {customer.address.governorate}</span>
                              </div>
                            </div>

                            {/* Workshop Information */}
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">الورشة المسجل بها:</p>
                              <p className="font-semibold text-primary">{customer.workshop}</p>
                            </div>
                            
                            {/* Order Statistics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-blue-50 p-3 rounded-lg">
                              <div className="text-center">
                                <p className="text-gray-600">الطلبات</p>
                                <p className="font-bold text-blue-600">{customer.orders}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600">آخر طلب</p>
                                <p className="font-bold">{customer.lastOrder}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600">إجمالي الإنفاق</p>
                                <p className="font-bold text-green-600">{customer.totalSpent.toFixed(3)} د.ك</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600">متوسط الطلب</p>
                                <p className="font-bold">{(customer.totalSpent / customer.orders).toFixed(3)} د.ك</p>
                              </div>
                            </div>

                            {/* Address Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs bg-gray-50 p-3 rounded-lg">
                              <div>
                                <span className="text-gray-500">المحافظة:</span>
                                <p className="font-medium">{customer.address.governorate}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المنطقة:</span>
                                <p className="font-medium">{customer.address.area}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">القطعة:</span>
                                <p className="font-medium">{customer.address.block}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الشارع:</span>
                                <p className="font-medium">{customer.address.street}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المنزل:</span>
                                <p className="font-medium">{customer.address.house}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 w-full lg:w-48">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleViewCustomerDetails(customer)}
                              className="w-full flex items-center gap-2"
                            >
                              <Ruler className="w-4 h-4" />
                              عرض القياسات
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="w-full flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              عرض التفاصيل
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredCustomers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد عملاء مطابقين للبحث</p>
                    </div>
                  )}
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
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد طلبات مطابقة للبحث</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span>الخدمات الخارجية ({externalServices.length})</span>
                  <Button size="sm" onClick={() => handleServiceAction('add')}>
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
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleServiceAction('edit', service.id)}
                        >
                          تعديل
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleServiceAction('toggle', service.id)}
                        >
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

      {/* Workshop Details Modal */}
      <WorkshopDetailsModal
        workshop={selectedWorkshopForDetails}
        isOpen={!!selectedWorkshopForDetails}
        onClose={() => setSelectedWorkshopForDetails(null)}
      />

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomerForDetails} onOpenChange={() => setSelectedCustomerForDetails(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              قياسات العميل - {selectedCustomerForDetails?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCustomerForDetails && (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">الاسم:</span>
                      <p className="font-medium">{selectedCustomerForDetails.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الهاتف:</span>
                      <p className="font-medium">{selectedCustomerForDetails.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">البريد الإلكتروني:</span>
                      <p className="font-medium">{selectedCustomerForDetails.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الجنس:</span>
                      <p className="font-medium">{selectedCustomerForDetails.gender}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">العمر:</span>
                      <p className="font-medium">{selectedCustomerForDetails.age} سنة</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الورشة:</span>
                      <p className="font-medium">{selectedCustomerForDetails.workshop}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Measurements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    القياسات التفصيلية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-600 text-sm">الصدر</p>
                      <p className="font-bold text-lg text-blue-600">{selectedCustomerForDetails.measurements.chest} سم</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-gray-600 text-sm">الخصر</p>
                      <p className="font-bold text-lg text-green-600">{selectedCustomerForDetails.measurements.waist} سم</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-gray-600 text-sm">الكتف</p>
                      <p className="font-bold text-lg text-purple-600">{selectedCustomerForDetails.measurements.shoulder} سم</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-gray-600 text-sm">الطول</p>
                      <p className="font-bold text-lg text-orange-600">{selectedCustomerForDetails.measurements.length} سم</p>
                    </div>
                    <div className="text-center p-3 bg-teal-50 rounded-lg">
                      <p className="text-gray-600 text-sm">طول الذراع</p>
                      <p className="font-bold text-lg text-teal-600">{selectedCustomerForDetails.measurements.armLength} سم</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-gray-600 text-sm">محيط الرقبة</p>
                      <p className="font-bold text-lg text-red-600">{selectedCustomerForDetails.measurements.neckCircumference} سم</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-gray-600 text-sm">فتحة الذراع</p>
                      <p className="font-bold text-lg text-yellow-600">{selectedCustomerForDetails.measurements.armOpening} سم</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <p className="text-gray-600 text-sm">عرض القاع</p>
                      <p className="font-bold text-lg text-indigo-600">{selectedCustomerForDetails.measurements.bottomWidth} سم</p>
                    </div>
                  </div>
                  
                  {selectedCustomerForDetails.measurements.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-sm font-medium mb-1">ملاحظات:</p>
                      <p className="text-gray-800">{selectedCustomerForDetails.measurements.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    العنوان الكامل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">الدولة:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.country}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">المحافظة:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.governorate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">المنطقة:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">القطعة:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.block}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">الشارع:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.street}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">رقم المنزل:</span>
                      <p className="font-medium">{selectedCustomerForDetails.address.house}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة خدمة خارجية جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="service-name">اسم الخدمة</Label>
              <Input id="service-name" placeholder="أدخل اسم الخدمة" />
            </div>
            <div>
              <Label htmlFor="service-price">السعر (د.ك)</Label>
              <Input id="service-price" type="number" step="0.001" placeholder="0.000" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">إضافة الخدمة</Button>
              <Button variant="outline" onClick={() => setShowServiceDialog(false)} className="flex-1">
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
