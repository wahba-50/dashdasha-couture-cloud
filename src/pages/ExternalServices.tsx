
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Truck, Shirt, Phone, Plus, Edit, Trash2, ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExternalServices = () => {
  const navigate = useNavigate();
  
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'خدمة التوصيل السريع',
      type: 'delivery',
      price: 2.500,
      description: 'توصيل الطلبات للعملاء في جميع أنحاء الكويت',
      isActive: true,
      provider: 'شركة التوصيل الكويتية',
      phone: '94512345',
      estimatedTime: '24 ساعة'
    },
    {
      id: 2,
      name: 'خدمة المغسلة المتخصصة',
      type: 'laundry',
      price: 3.000,
      description: 'غسيل وتنظيف الدشاديش بأحدث التقنيات',
      isActive: true,
      provider: 'مغسلة الأناقة',
      phone: '94598765',
      estimatedTime: '48 ساعة'
    },
    {
      id: 3,
      name: 'خدمة الكي الاحترافي',
      type: 'ironing',
      price: 1.500,
      description: 'كي احترافي للدشاديش والملابس التقليدية',
      isActive: false,
      provider: 'مركز الكي المتخصص',
      phone: '94587654',
      estimatedTime: '12 ساعة'
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    type: 'delivery',
    price: 0,
    description: '',
    provider: '',
    phone: '',
    estimatedTime: ''
  });

  const [isAddingService, setIsAddingService] = useState(false);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'delivery': return <Truck className="w-5 h-5" />;
      case 'laundry': return <Shirt className="w-5 h-5" />;
      case 'ironing': return <Settings className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'delivery': return 'from-blue-500 to-blue-600';
      case 'laundry': return 'from-green-500 to-green-600';
      case 'ironing': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'delivery': return 'توصيل';
      case 'laundry': return 'مغسلة';
      case 'ironing': return 'كي';
      default: return 'خدمة';
    }
  };

  const addService = () => {
    if (newService.name && newService.price > 0 && newService.provider) {
      setServices([...services, { 
        id: Date.now(), 
        ...newService, 
        isActive: true 
      }]);
      setNewService({
        name: '',
        type: 'delivery',
        price: 0,
        description: '',
        provider: '',
        phone: '',
        estimatedTime: ''
      });
      setIsAddingService(false);
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-blue-600 to-amber-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  إدارة الخدمات الخارجية
                </h1>
                <p className="text-sm text-gray-600">إدارة خدمات التوصيل والمغسلة والخدمات الإضافية</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button 
                onClick={() => setIsAddingService(true)}
                className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة خدمة جديدة
              </Button>
              <Button variant="outline" size="sm">العربية</Button>
              <Button variant="outline" size="sm">English</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي الخدمات</p>
                  <p className="text-3xl font-bold">{services.length}</p>
                </div>
                <Settings className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">خدمات نشطة</p>
                  <p className="text-3xl font-bold">{services.filter(s => s.isActive).length}</p>
                </div>
                <Truck className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">متوسط السعر</p>
                  <p className="text-2xl font-bold">{services.length > 0 ? (services.reduce((sum, s) => sum + s.price, 0) / services.length).toFixed(3) : '0.000'} د.ك</p>
                </div>
                <Settings className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">طلبات هذا الشهر</p>
                  <p className="text-2xl font-bold">147</p>
                </div>
                <Shirt className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Service Form */}
        {isAddingService && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-reverse space-x-3">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>إضافة خدمة خارجية جديدة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="service-name">اسم الخدمة</Label>
                  <Input
                    id="service-name"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="أدخل اسم الخدمة"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-type">نوع الخدمة</Label>
                  <select 
                    id="service-type"
                    value={newService.type}
                    onChange={(e) => setNewService({...newService, type: e.target.value})}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-blue-400"
                  >
                    <option value="delivery">توصيل</option>
                    <option value="laundry">مغسلة</option>
                    <option value="ironing">كي</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-price">السعر (د.ك)</Label>
                  <Input
                    id="service-price"
                    type="number"
                    step="0.001"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-provider">مزود الخدمة</Label>
                  <Input
                    id="service-provider"
                    value={newService.provider}
                    onChange={(e) => setNewService({...newService, provider: e.target.value})}
                    placeholder="اسم الشركة أو المزود"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-phone">رقم الهاتف</Label>
                  <Input
                    id="service-phone"
                    value={newService.phone}
                    onChange={(e) => setNewService({...newService, phone: e.target.value})}
                    placeholder="رقم هاتف مزود الخدمة"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-time">الوقت المتوقع</Label>
                  <Input
                    id="service-time"
                    value={newService.estimatedTime}
                    onChange={(e) => setNewService({...newService, estimatedTime: e.target.value})}
                    placeholder="مثال: 24 ساعة"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="service-description">وصف الخدمة</Label>
                  <Textarea
                    id="service-description"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    placeholder="أدخل وصف مفصل للخدمة..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-reverse space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingService(false)}
                >
                  إلغاء
                </Button>
                <Button 
                  onClick={addService}
                  className="bg-gradient-to-r from-blue-600 to-amber-500"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة الخدمة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className={`bg-gradient-to-r ${getServiceColor(service.type)} text-white rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-reverse space-x-3">
                    {getServiceIcon(service.type)}
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1 bg-white/20 text-white">
                        {getServiceTypeLabel(service.type)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => toggleServiceStatus(service.id)}
                    />
                    <Badge variant={service.isActive ? 'default' : 'destructive'} className="bg-white/20 text-white">
                      {service.isActive ? 'نشط' : 'متوقف'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">مزود الخدمة:</span>
                        <span className="font-semibold">{service.provider}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">السعر:</span>
                        <span className="font-bold text-green-600">{service.price.toFixed(3)} د.ك</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">الهاتف:</span>
                        <div className="flex items-center space-x-reverse space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="font-mono">{service.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">الوقت المتوقع:</span>
                        <span className="font-semibold">{service.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 ml-1" />
                      تعديل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteService(service.id)}
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد خدمات خارجية</h3>
              <p className="text-gray-500 mb-6">ابدأ بإضافة خدمات خارجية مثل التوصيل والمغسلة</p>
              <Button 
                onClick={() => setIsAddingService(true)}
                className="bg-gradient-to-r from-blue-600 to-amber-500"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة خدمة جديدة
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExternalServices;
