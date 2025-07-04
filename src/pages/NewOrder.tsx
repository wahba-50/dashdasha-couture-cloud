import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, User, UserPlus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewOrder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');
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

  const kuwaitStates = [
    'الأحمدي',
    'الفروانية',
    'حولي',
    'الجهراء',
    'مبارك الكبير',
    'العاصمة'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-600">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-reverse space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">إنشاء طلب جديد</h1>
              <p className="text-sm text-gray-600">الخطوة {currentStep} من 3</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-reverse space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <div className={`mr-3 text-sm ${
                  step <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}>
                  {step === 1 && 'بيانات العميل'}
                  {step === 2 && 'تفاصيل الطلب'}
                  {step === 3 && 'ملخص وإنشاء'}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <User className="w-5 h-5" />
                <span>بيانات العميل</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">نوع العميل</Label>
                <RadioGroup
                  value={customerType}
                  onValueChange={(value) => setCustomerType(value as 'new' | 'existing')}
                  className="flex space-x-reverse space-x-6"
                >
                  <div className="flex items-center space-x-reverse space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                      <UserPlus className="w-4 h-4" />
                      <span>عميل جديد</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing" className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>عميل حالي</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Existing Customer Search */}
              {customerType === 'existing' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <Label>البحث عن العميل</Label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث بالاسم أو رقم الهاتف أو البريد الإلكتروني..."
                      className="pr-10"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    ابحث عن العميل لاستعراض الطلبات السابقة والقياسات المحفوظة
                  </p>
                </div>
              )}

              {/* New Customer Form */}
              {customerType === 'new' && (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">المعلومات الأساسية</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">اسم العميل *</Label>
                        <Input
                          id="name"
                          value={customerData.name}
                          onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                          placeholder="أدخل اسم العميل"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={customerData.phone}
                          onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                          placeholder="مثال: 97712345678"
                          required
                        />
                        {customerData.phone && !validateKuwaitiPhone(customerData.phone) && (
                          <p className="text-sm text-red-600">يرجى إدخال رقم هاتف كويتي صحيح</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">الجنس</Label>
                        <Select value={customerData.gender} onValueChange={(value) => setCustomerData({...customerData, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">أنثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age">العمر</Label>
                        <Input
                          id="age"
                          type="number"
                          value={customerData.age}
                          onChange={(e) => setCustomerData({...customerData, age: e.target.value})}
                          placeholder="العمر"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">العنوان</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">الدولة</Label>
                        <Input
                          id="country"
                          value={customerData.country}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">المحافظة</Label>
                        <Select value={customerData.state} onValueChange={(value) => setCustomerData({...customerData, state: value})}>
                          <SelectTrigger>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">المنطقة</Label>
                        <Input
                          id="area"
                          value={customerData.area}
                          onChange={(e) => setCustomerData({...customerData, area: e.target.value})}
                          placeholder="مثال: الجابرية"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="street">الشارع</Label>
                        <Input
                          id="street"
                          value={customerData.street}
                          onChange={(e) => setCustomerData({...customerData, street: e.target.value})}
                          placeholder="اسم الشارع"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="houseNumber">رقم المنزل</Label>
                        <Input
                          id="houseNumber"
                          value={customerData.houseNumber}
                          onChange={(e) => setCustomerData({...customerData, houseNumber: e.target.value})}
                          placeholder="رقم المنزل"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">القياسات</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="chest">الصدر (سم)</Label>
                        <Input
                          id="chest"
                          type="number"
                          value={measurements.chest}
                          onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                          placeholder="مثال: 95"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="waist">الوسط (سم)</Label>
                        <Input
                          id="waist"
                          type="number"
                          value={measurements.waist}
                          onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                          placeholder="مثال: 85"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="shoulder">الكتف (سم)</Label>
                        <Input
                          id="shoulder"
                          type="number"
                          value={measurements.shoulder}
                          onChange={(e) => setMeasurements({...measurements, shoulder: e.target.value})}
                          placeholder="مثال: 45"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="neck">الرقبة (سم)</Label>
                        <Input
                          id="neck"
                          type="number"
                          value={measurements.neck}
                          onChange={(e) => setMeasurements({...measurements, neck: e.target.value})}
                          placeholder="مثال: 40"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="length">الطول (سم)</Label>
                        <Input
                          id="length"
                          type="number"
                          value={measurements.length}
                          onChange={(e) => setMeasurements({...measurements, length: e.target.value})}
                          placeholder="مثال: 150"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sleeve">الكم (سم)</Label>
                        <Input
                          id="sleeve"
                          type="number"
                          value={measurements.sleeve}
                          onChange={(e) => setMeasurements({...measurements, sleeve: e.target.value})}
                          placeholder="مثال: 60"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Order Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  سيتم إنشاء واجهة تفاصيل الطلب هنا...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  إضافة القطع، الأقمشة، القصات، والإكسسوارات
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Summary */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  سيتم عرض ملخص الطلب والفاتورة هنا...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  المجموع النهائي، الخصومات، وموعد التسليم
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-reverse space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>السابق</span>
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === 3}
            className="flex items-center space-x-reverse space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>{currentStep === 3 ? 'إنشاء الطلب' : 'التالي'}</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
