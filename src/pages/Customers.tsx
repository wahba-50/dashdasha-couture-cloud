
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, Eye, Edit, Phone, Mail, MapPin, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWorkshop, setFilterWorkshop] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  // Sample customers data
  const customers = [
    {
      id: 1,
      name: 'أحمد محمد الكندري',
      phone: '97712345678',
      email: 'ahmed.alkandari@email.com',
      gender: 'male',
      age: 35,
      address: 'الكويت، حولي، الجابرية، شارع السالم، منزل 15',
      workshop: 'ورشة الأناقة الكويتية',
      ordersCount: 5,
      lastOrder: '2024-07-04',
      totalSpent: 125.750,
      measurements: {
        chest: 95,
        waist: 85,
        shoulder: 45,
        neck: 40,
        length: 150,
        sleeve: 60
      }
    },
    {
      id: 2,
      name: 'فاطمة علي العتيبي',
      phone: '97712345679',
      email: 'fatima.otaibi@email.com',
      gender: 'female',
      age: 28,
      address: 'الكويت، الفروانية، جليب الشيوخ، شارع الخليج، منزل 8',
      workshop: 'تفصيل دشاديش العز',
      ordersCount: 3,
      lastOrder: '2024-07-02',
      totalSpent: 89.250,
      measurements: {
        chest: 88,
        waist: 75,
        shoulder: 40,
        neck: 35,
        length: 140,
        sleeve: 55
      }
    },
    {
      id: 3,
      name: 'خالد سعد المطيري',
      phone: '97712345680',
      email: 'khalid.mutairi@email.com',
      gender: 'male',
      age: 42,
      address: 'الكويت، الأحمدي، الفحيحيل، شارع الأمل، منزل 22',
      workshop: 'ورشة الأناقة الكويتية',
      ordersCount: 8,
      lastOrder: '2024-06-28',
      totalSpent: 234.500,
      measurements: {
        chest: 100,
        waist: 90,
        shoulder: 48,
        neck: 42,
        length: 155,
        sleeve: 62
      }
    }
  ];

  const workshops = ['ورشة الأناقة الكويتية', 'تفصيل دشاديش العز'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.includes(searchTerm) || 
                         customer.phone.includes(searchTerm) || 
                         customer.email.includes(searchTerm);
    const matchesWorkshop = filterWorkshop === 'all' || customer.workshop === filterWorkshop;
    const matchesGender = filterGender === 'all' || customer.gender === filterGender;
    
    return matchesSearch && matchesWorkshop && matchesGender;
  });

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
                  إدارة العملاء
                </h1>
                <p className="text-sm text-gray-600">قاعدة بيانات شاملة لجميع العملاء</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button variant="outline" className="flex items-center space-x-reverse space-x-2">
                <Download className="w-4 h-4" />
                <span>تصدير البيانات</span>
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
                  <p className="text-blue-100 text-sm">إجمالي العملاء</p>
                  <p className="text-3xl font-bold">{customers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">عملاء نشطين</p>
                  <p className="text-3xl font-bold">{customers.filter(c => c.ordersCount > 0).length}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">إجمالي الإيرادات</p>
                  <p className="text-xl font-bold">{customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(3)} د.ك</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">متوسط الإنفاق</p>
                  <p className="text-xl font-bold">{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(3)} د.ك</p>
                </div>
                <Users className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="البحث بالاسم، رقم الهاتف، أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterWorkshop} onValueChange={setFilterWorkshop}>
                  <SelectTrigger className="w-full sm:w-48 h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                    <SelectValue placeholder="تصفية بالورشة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الورش</SelectItem>
                    {workshops.map((workshop) => (
                      <SelectItem key={workshop} value={workshop}>{workshop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger className="w-full sm:w-48 h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                    <SelectValue placeholder="تصفية بالجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الجميع</SelectItem>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="grid gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                      <Badge variant={customer.gender === 'male' ? 'default' : 'secondary'} className="text-xs">
                        {customer.gender === 'male' ? 'ذكر' : 'أنثى'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-start space-x-reverse space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{customer.address}</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {customer.workshop}
                    </Badge>
                  </div>

                  {/* Order Statistics */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 border-b pb-2">إحصائيات الطلبات</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-600 font-bold text-lg">{customer.ordersCount}</p>
                        <p className="text-gray-600 text-xs">إجمالي الطلبات</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-green-600 font-bold text-lg">{customer.totalSpent.toFixed(3)}</p>
                        <p className="text-gray-600 text-xs">إجمالي الإنفاق (د.ك)</p>
                      </div>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                      آخر طلب: {customer.lastOrder}
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 border-b pb-2">القياسات (سم)</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.chest}</p>
                        <p className="text-gray-600">الصدر</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.waist}</p>
                        <p className="text-gray-600">الوسط</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.shoulder}</p>
                        <p className="text-gray-600">الكتف</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.neck}</p>
                        <p className="text-gray-600">الرقبة</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.length}</p>
                        <p className="text-gray-600">الطول</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-semibold">{customer.measurements.sleeve}</p>
                        <p className="text-gray-600">الكم</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-reverse space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 ml-1" />
                        عرض الطلبات
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 ml-1" />
                        تعديل البيانات
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على عملاء يطابقون معايير البحث</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Customers;
