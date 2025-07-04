import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, User, UserPlus, Search, Plus, Minus, QrCode, Package, Scissors, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewOrder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    country: 'الكويت',
    state: '',
    area: '',
    street: '',
    houseNumber: ''
  });

  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    shoulder: '',
    neck: '',
    length: '',
    sleeve: ''
  });

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState({
    fabricType: 'customer', // customer or workshop
    fabricDescription: '',
    selectedFabric: null,
    meters: 1,
    cut: null,
    accessories: [],
    services: []
  });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    discountType: 'amount', // amount or percentage
    deliveryDate: '',
    total: 0
  });

  const kuwaitStates = [
    'الأحمدي', 'الفروانية', 'حولي', 'الجهراء', 'مبارك الكبير', 'العاصمة'
  ];

  // Sample data for cuts, fabrics, accessories
  const cuts = [
    { id: 1, name: 'قصة كلاسيكية', price: 15.000, image: '/placeholder.svg' },
    { id: 2, name: 'قصة عصرية', price: 20.000, image: '/placeholder.svg' },
    { id: 3, name: 'قصة رسمية', price: 25.000, image: '/placeholder.svg' }
  ];

  const workshopFabrics = [
    { id: 1, name: 'قماش قطني فاخر', pricePerMeter: 8.500, image: '/placeholder.svg' },
    { id: 2, name: 'حرير طبيعي', pricePerMeter: 15.000, image: '/placeholder.svg' },
    { id: 3, name: 'كتان مخلوط', pricePerMeter: 12.000, image: '/placeholder.svg' }
  ];

  const accessories = [
    { id: 1, name: 'أزرار ذهبية', price: 5.000, image: '/placeholder.svg' },
    { id: 2, name: 'تطريز يدوي', price: 12.000, image: '/placeholder.svg' },
    { id: 3, name: 'كم مطرز', price: 8.000, image: '/placeholder.svg' }
  ];

  const services = [
    { id: 1, name: 'مصنعية القص', price: 3.000 },
    { id: 2, name: 'مصنعية التفصيل', price: 8.000 },
    { id: 3, name: 'تركيب الإكسسوارات', price: 2.000 },
    { id: 4, name: 'مصنعية الكي', price: 1.500 }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateKuwaitiPhone = (phone: string) => {
    const kuwaitiPhoneRegex = /^965[569]\d{7}$|^[569]\d{7}$/;
    return kuwaitiPhoneRegex.test(phone.replace(/\s/g, ''));
  };

  const addItemToOrder = () => {
    const newItem = {
      ...currentItem,
      id: Date.now(),
      qrCode: `QR-${Date.now()}`
    };
    setOrderItems([...orderItems, newItem]);
    setCurrentItem({
      fabricType: 'customer',
      fabricDescription: '',
      selectedFabric: null,
      meters: 1,
      cut: null,
      accessories: [],
      services: []
    });
  };

  const calculateItemTotal = (item: any) => {
    let total = 0;
    if (item.cut) total += item.cut.price;
    if (item.selectedFabric && item.fabricType === 'workshop') {
      total += item.selectedFabric.pricePerMeter * item.meters;
    }
    item.accessories.forEach((acc: any) => total += acc.price);
    item.services.forEach((service: any) => total += service.price);
    return total;
  };

  const calculateOrderTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    let discount = 0;
    if (orderSummary.discountType === 'percentage') {
      discount = (subtotal * orderSummary.discount) / 100;
    } else {
      discount = orderSummary.discount;
    }
    return subtotal - discount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-blue-600 to-amber-500 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  إنشاء طلب جديد
                </h1>
                <p className="text-sm text-gray-600">الخطوة {currentStep} من 3</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button variant="outline" size="sm">العربية</Button>
              <Button variant="outline" size="sm">English</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-reverse space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg transform scale-110' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step === 1 && <User className="w-5 h-5" />}
                  {step === 2 && <Package className="w-5 h-5" />}
                  {step === 3 && <Scissors className="w-5 h-5" />}
                </div>
                <div className={`mr-3 text-sm font-medium transition-all duration-300 ${
                  step <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step === 1 && 'بيانات العميل'}
                  {step === 2 && 'تفاصيل الطلب'}
                  {step === 3 && 'ملخص وإنشاء'}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-4 transition-all duration-300 ${
                    step < currentStep ? 'bg-gradient-to-r from-blue-600 to-amber-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-reverse space-x-3 text-xl">
                <User className="w-6 h-6 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  بيانات العميل
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {/* Customer Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800">نوع العميل</Label>
                <RadioGroup
                  value={customerType}
                  onValueChange={(value) => setCustomerType(value as 'new' | 'existing')}
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-reverse sm:space-x-8"
                >
                  <div className="flex items-center space-x-reverse space-x-3 p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all duration-200">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="flex items-center space-x-reverse space-x-2 cursor-pointer font-medium">
                      <UserPlus className="w-5 h-5 text-blue-600" />
                      <span>عميل جديد</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-3 p-4 border-2 border-amber-200 rounded-xl hover:border-amber-400 transition-all duration-200">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing" className="flex items-center space-x-reverse space-x-2 cursor-pointer font-medium">
                      <User className="w-5 h-5 text-amber-600" />
                      <span>عميل حالي</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Existing Customer Search */}
              {customerType === 'existing' && (
                <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <Label className="text-lg font-semibold text-gray-800">البحث عن العميل</Label>
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="البحث بالاسم أو رقم الهاتف أو البريد الإلكتروني..."
                      className="pr-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                  </div>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    💡 ابحث عن العميل لاستعراض الطلبات السابقة والقياسات المحفوظة
                  </p>
                </div>
              )}

              {/* New Customer Form */}
              {customerType === 'new' && (
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-reverse space-x-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-amber-500 rounded-full"></div>
                      <span>المعلومات الأساسية</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                          اسم العميل <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={customerData.name}
                          onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                          placeholder="أدخل اسم العميل"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-base font-semibold text-gray-700">
                          رقم الهاتف <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          value={customerData.phone}
                          onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                          placeholder="مثال: 97712345678"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                          required
                        />
                        {customerData.phone && !validateKuwaitiPhone(customerData.phone) && (
                          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                            ⚠️ يرجى إدخال رقم هاتف كويتي صحيح
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="gender" className="text-base font-semibold text-gray-700">الجنس</Label>
                        <Select value={customerData.gender} onValueChange={(value) => setCustomerData({...customerData, gender: value})}>
                          <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">أنثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="age" className="text-base font-semibold text-gray-700">العمر</Label>
                        <Input
                          id="age"
                          type="number"
                          value={customerData.age}
                          onChange={(e) => setCustomerData({...customerData, age: e.target.value})}
                          placeholder="العمر"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-base font-semibold text-gray-700">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                          placeholder="example@email.com"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-reverse space-x-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-amber-500 to-blue-600 rounded-full"></div>
                      <span>العنوان</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="country" className="text-base font-semibold text-gray-700">الدولة</Label>
                        <Input
                          id="country"
                          value={customerData.country}
                          disabled
                          className="h-12 text-lg bg-gray-100 border-2 border-gray-200 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="state" className="text-base font-semibold text-gray-700">المحافظة</Label>
                        <Select value={customerData.state} onValueChange={(value) => setCustomerData({...customerData, state: value})}>
                          <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                            <SelectValue placeholder="اختر المحافظة" />
                          </SelectTrigger>
                          <SelectContent>
                            {kuwaitStates.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="area" className="text-base font-semibold text-gray-700">المنطقة</Label>
                        <Input
                          id="area"
                          value={customerData.area}
                          onChange={(e) => setCustomerData({...customerData, area: e.target.value})}
                          placeholder="مثال: الجابرية"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="street" className="text-base font-semibold text-gray-700">الشارع</Label>
                        <Input
                          id="street"
                          value={customerData.street}
                          onChange={(e) => setCustomerData({...customerData, street: e.target.value})}
                          placeholder="اسم الشارع"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="houseNumber" className="text-base font-semibold text-gray-700">رقم المنزل</Label>
                        <Input
                          id="houseNumber"
                          value={customerData.houseNumber}
                          onChange={(e) => setCustomerData({...customerData, houseNumber: e.target.value})}
                          placeholder="رقم المنزل"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-reverse space-x-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-amber-500 rounded-full"></div>
                      <span>القياسات</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.entries(measurements).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            {key === 'chest' && 'الصدر (سم)'}
                            {key === 'waist' && 'الوسط (سم)'}
                            {key === 'shoulder' && 'الكتف (سم)'}
                            {key === 'neck' && 'الرقبة (سم)'}
                            {key === 'length' && 'الطول (سم)'}
                            {key === 'sleeve' && 'الكم (سم)'}
                          </Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => setMeasurements({...measurements, [key]: e.target.value})}
                            placeholder="0"
                            className="h-10 text-center border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Order Details */}
        {currentStep === 2 && (
          <div className="space-y-8">
            {/* Add New Item Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-reverse space-x-3 text-xl">
                  <Package className="w-6 h-6 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                    إضافة قطعة جديدة
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* Fabric Type Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-800">نوع القماش</Label>
                  <RadioGroup
                    value={currentItem.fabricType}
                    onValueChange={(value) => setCurrentItem({...currentItem, fabricType: value})}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-reverse sm:space-x-8"
                  >
                    <div className="flex items-center space-x-reverse space-x-3 p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all duration-200">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer" className="cursor-pointer font-medium">قماش العميل</Label>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-3 p-4 border-2 border-amber-200 rounded-xl hover:border-amber-400 transition-all duration-200">
                      <RadioGroupItem value="workshop" id="workshop" />
                      <Label htmlFor="workshop" className="cursor-pointer font-medium">قماش الورشة</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Customer Fabric */}
                {currentItem.fabricType === 'customer' && (
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-700">وصف القماش</Label>
                    <Textarea
                      value={currentItem.fabricDescription}
                      onChange={(e) => setCurrentItem({...currentItem, fabricDescription: e.target.value})}
                      placeholder="أدخل وصف مفصل للقماش..."
                      className="min-h-[100px] border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                  </div>
                )}

                {/* Workshop Fabric */}
                {currentItem.fabricType === 'workshop' && (
                  <div className="space-y-6">
                    <Label className="text-base font-semibold text-gray-700">اختر القماش</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {workshopFabrics.map((fabric) => (
                        <div 
                          key={fabric.id}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            currentItem.selectedFabric?.id === fabric.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => setCurrentItem({...currentItem, selectedFabric: fabric})}
                        >
                          <img src={fabric.image} alt={fabric.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                          <h4 className="font-semibold text-gray-800">{fabric.name}</h4>
                          <p className="text-blue-600 font-bold">{fabric.pricePerMeter.toFixed(3)} د.ك/متر</p>
                        </div>
                      ))}
                    </div>
                    
                    {currentItem.selectedFabric && (
                      <div className="flex items-center space-x-reverse space-x-4 p-4 bg-blue-50 rounded-xl">
                        <Label className="font-semibold">عدد الأمتار:</Label>
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setCurrentItem({...currentItem, meters: Math.max(0.5, currentItem.meters - 0.5)})}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input 
                            type="number" 
                            value={currentItem.meters}
                            onChange={(e) => setCurrentItem({...currentItem, meters: parseFloat(e.target.value) || 1})}
                            className="w-20 text-center"
                            step="0.5"
                            min="0.5"
                          />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setCurrentItem({...currentItem, meters: currentItem.meters + 0.5})}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-blue-600">
                          المجموع: {(currentItem.selectedFabric.pricePerMeter * currentItem.meters).toFixed(3)} د.ك
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Cut Selection */}
                <div className="space-y-6">
                  <Label className="text-base font-semibold text-gray-700">اختر القصة</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cuts.map((cut) => (
                      <div 
                        key={cut.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          currentItem.cut?.id === cut.id 
                            ? 'border-amber-500 bg-amber-50' 
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setCurrentItem({...currentItem, cut: cut})}
                      >
                        <img src={cut.image} alt={cut.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                        <h4 className="font-semibold text-gray-800">{cut.name}</h4>
                        <p className="text-amber-600 font-bold">{cut.price.toFixed(3)} د.ك</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessories Selection */}
                <div className="space-y-6">
                  <Label className="text-base font-semibold text-gray-700">الإكسسوارات</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accessories.map((accessory) => (
                      <div 
                        key={accessory.id}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all duration-200"
                      >
                        <img src={accessory.image} alt={accessory.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{accessory.name}</h4>
                            <p className="text-blue-600 font-bold">{accessory.price.toFixed(3)} د.ك</p>
                          </div>
                          <Checkbox 
                            checked={currentItem.accessories.some((acc: any) => acc.id === accessory.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setCurrentItem({...currentItem, accessories: [...currentItem.accessories, accessory]});
                              } else {
                                setCurrentItem({...currentItem, accessories: currentItem.accessories.filter((acc: any) => acc.id !== accessory.id)});
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Selection */}
                <div className="space-y-6">
                  <Label className="text-base font-semibold text-gray-700">المصنعيات</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-800">{service.name}</h4>
                          <p className="text-blue-600 font-bold">{service.price.toFixed(3)} د.ك</p>
                        </div>
                        <Checkbox 
                          checked={currentItem.services.some((serv: any) => serv.id === service.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCurrentItem({...currentItem, services: [...currentItem.services, service]});
                            } else {
                              setCurrentItem({...currentItem, services: currentItem.services.filter((serv: any) => serv.id !== service.id)});
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={addItemToOrder}
                    className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة القطعة للطلب
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Items List */}
            {orderItems.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-reverse space-x-3 text-xl">
                    <Shirt className="w-6 h-6 text-green-600" />
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      قطع الطلب ({orderItems.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {orderItems.map((item, index) => (
                      <div key={item.id} className="p-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-gray-800">القطعة #{index + 1}</h4>
                          <div className="flex items-center space-x-reverse space-x-2">
                            <QrCode className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">{item.qrCode}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-semibold">القماش: </span>
                            {item.fabricType === 'customer' ? item.fabricDescription : item.selectedFabric?.name}
                          </div>
                          <div>
                            <span className="font-semibold">القصة: </span>
                            {item.cut?.name}
                          </div>
                          <div>
                            <span className="font-semibold">المجموع: </span>
                            <span className="font-bold text-green-600">{calculateItemTotal(item).toFixed(3)} د.ك</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Summary */}
        {currentStep === 3 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-amber-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-reverse space-x-3 text-xl">
                <Scissors className="w-6 h-6 text-green-600" />
                <span className="bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                  ملخص الطلب
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {/* Customer Summary */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl">
                <h3 className="font-bold text-lg mb-4 text-gray-800">بيانات العميل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold">الاسم:</span> {customerData.name}</div>
                  <div><span className="font-semibold">الهاتف:</span> {customerData.phone}</div>
                  <div><span className="font-semibold">الجنس:</span> {customerData.gender === 'male' ? 'ذكر' : 'أنثى'}</div>
                  <div><span className="font-semibold">العمر:</span> {customerData.age}</div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800">تفاصيل الطلب</h3>
                {orderItems.map((item, index) => (
                  <div key={item.id} className="p-4 border-2 border-gray-200 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">القطعة #{index + 1}</h4>
                      <span className="font-bold text-green-600">{calculateItemTotal(item).toFixed(3)} د.ك</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.fabricType === 'customer' ? `قماش العميل: ${item.fabricDescription}` : `${item.selectedFabric?.name} (${item.meters} متر)`}
                      {item.cut && ` • ${item.cut.name}`}
                      {item.accessories.length > 0 && ` • إكسسوارات: ${item.accessories.map((acc: any) => acc.name).join(', ')}`}
                      {item.services.length > 0 && ` • مصنعيات: ${item.services.map((serv: any) => serv.name).join(', ')}`}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-6 p-6 bg-gradient-to-r from-amber-50 to-green-50 rounded-xl">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">المجموع الفرعي:</span>
                  <span className="font-bold">{orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0).toFixed(3)} د.ك</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>نوع الخصم</Label>
                    <Select value={orderSummary.discountType} onValueChange={(value) => setOrderSummary({...orderSummary, discountType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amount">مبلغ ثابت</SelectItem>
                        <SelectItem value="percentage">نسبة مئوية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>قيمة الخصم</Label>
                    <Input
                      type="number"
                      value={orderSummary.discount}
                      onChange={(e) => setOrderSummary({...orderSummary, discount: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>موعد التسليم المتوقع</Label>
                  <Input
                    type="date"
                    value={orderSummary.deliveryDate}
                    onChange={(e) => setOrderSummary({...orderSummary, deliveryDate: e.target.value})}
                  />
                </div>

                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center text-2xl font-bold text-green-600">
                    <span>المجموع النهائي:</span>
                    <span>{calculateOrderTotal().toFixed(3)} د.ك</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-lg rounded-xl shadow-lg transition-all duration-200"
                  onClick={() => {
                    // Create order logic here
                    console.log('Creating order...', {customerData, orderItems, orderSummary});
                    navigate('/workshop/1/dashboard');
                  }}
                >
                  🎉 إنشاء الطلب وطباعة الفاتورة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="w-full sm:w-auto flex items-center space-x-reverse space-x-2 h-12 px-8 border-2 border-gray-300 hover:border-blue-400 transition-all duration-200"
          >
            <ArrowRight className="w-5 h-5" />
            <span>السابق</span>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentStep === 1 && 'أدخل بيانات العميل للمتابعة'}
              {currentStep === 2 && 'أضف قطع الطلب'}
              {currentStep === 3 && 'راجع التفاصيل وأنشئ الطلب'}
            </p>
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === 3}
            className="w-full sm:w-auto flex items-center space-x-reverse space-x-2 h-12 px-8 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg transition-all duration-200"
          >
            <span>{currentStep === 3 ? 'إنشاء الطلب' : 'التالي'}</span>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
