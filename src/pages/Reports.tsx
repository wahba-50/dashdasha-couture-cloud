
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieIcon, LineChart as LineIcon, ArrowLeft, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedWorkshop, setSelectedWorkshop] = useState('all');

  // Sample data for charts
  const revenueData = [
    { month: 'يناير', revenue: 1250.500, orders: 45 },
    { month: 'فبراير', revenue: 1890.750, orders: 67 },
    { month: 'مارس', revenue: 2100.250, orders: 78 },
    { month: 'أبريل', revenue: 1750.000, orders: 62 },
    { month: 'مايو', revenue: 2450.500, orders: 89 },
    { month: 'يونيو', revenue: 2890.750, orders: 102 },
    { month: 'يوليو', revenue: 3200.250, orders: 115 }
  ];

  const fabricUsageData = [
    { name: 'قماش قطني', value: 35, color: '#3B82F6' },
    { name: 'حرير طبيعي', value: 25, color: '#F59E0B' },
    { name: 'كتان مخلوط', value: 20, color: '#10B981' },
    { name: 'قماش العميل', value: 20, color: '#8B5CF6' }
  ];

  const popularCutsData = [
    { name: 'قصة كلاسيكية', orders: 45, revenue: 675.000 },
    { name: 'قصة عصرية', orders: 38, revenue: 760.000 },
    { name: 'قصة رسمية', orders: 32, revenue: 800.000 },
    { name: 'قصة كاجوال', orders: 25, revenue: 375.000 }
  ];

  const workshopPerformance = [
    { name: 'ورشة الأناقة الكويتية', orders: 78, revenue: 2145.750, customers: 45 },
    { name: 'تفصيل دشاديش العز', orders: 62, revenue: 1890.500, customers: 38 }
  ];

  const topCustomers = [
    { name: 'أحمد الكندري', orders: 8, totalSpent: 234.500 },
    { name: 'فاطمة العتيبي', orders: 6, totalSpent: 189.750 },
    { name: 'خالد المطيري', orders: 5, totalSpent: 156.250 },
    { name: 'نورا الصباح', orders: 4, totalSpent: 142.000 },
    { name: 'محمد الرشيد', orders: 4, totalSpent: 128.500 }
  ];

  const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'];

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
                  التقارير والإحصائيات
                </h1>
                <p className="text-sm text-gray-600">تقارير مفصلة عن الأداء والمبيعات</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button variant="outline" className="flex items-center space-x-reverse space-x-2">
                <Download className="w-4 h-4" />
                <span>تصدير التقرير</span>
              </Button>
              <Button variant="outline" size="sm">العربية</Button>
              <Button variant="outline" size="sm">English</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center space-x-reverse space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-700">الفترة الزمنية:</span>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="quarter">هذا الربع</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-reverse space-x-2 mr-8">
                <span className="font-semibold text-gray-700">الورشة:</span>
              </div>
              <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الورش</SelectItem>
                  <SelectItem value="workshop1">ورشة الأناقة الكويتية</SelectItem>
                  <SelectItem value="workshop2">تفصيل دشاديش العز</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold">15,327.750 د.ك</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-300 ml-1" />
                    <span className="text-sm text-green-300">+12.5%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold">558</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-300 ml-1" />
                    <span className="text-sm text-green-300">+8.2%</span>
                  </div>
                </div>
                <PieIcon className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">متوسط قيمة الطلب</p>
                  <p className="text-2xl font-bold">27.475 د.ك</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-red-300 ml-1" />
                    <span className="text-sm text-red-300">-2.1%</span>
                  </div>
                </div>
                <LineIcon className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">عملاء جدد</p>
                  <p className="text-2xl font-bold">47</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-300 ml-1" />
                    <span className="text-sm text-green-300">+15.3%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>الإيرادات الشهرية</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `${value} د.ك` : value,
                      name === 'revenue' ? 'الإيرادات' : 'عدد الطلبات'
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fabric Usage Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <PieIcon className="w-5 h-5 text-amber-600" />
                <span>استهلاك الأقمشة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fabricUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {fabricUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Popular Cuts and Workshop Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Cuts */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>أكثر القصات طلباً</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularCutsData.map((cut, index) => (
                  <div key={cut.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{cut.name}</p>
                        <p className="text-sm text-gray-600">{cut.orders} طلب</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-green-600">{cut.revenue.toFixed(3)} د.ك</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workshop Performance */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span>أداء الورش</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workshopPerformance.map((workshop, index) => (
                  <div key={workshop.name} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-3">{workshop.name}</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-blue-600 text-lg">{workshop.orders}</p>
                        <p className="text-gray-600">طلب</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-green-600 text-lg">{workshop.revenue.toFixed(3)}</p>
                        <p className="text-gray-600">د.ك</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-purple-600 text-lg">{workshop.customers}</p>
                        <p className="text-gray-600">عميل</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Customers */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-reverse space-x-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <span>أفضل العملاء</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{customer.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-blue-600 font-bold">{customer.orders} طلبات</p>
                    <p className="text-green-600 font-bold">{customer.totalSpent.toFixed(3)} د.ك</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
