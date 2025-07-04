import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, User, UserPlus, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerFormProps {
  onNext: (customerData: any) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const { t } = useLanguage();
  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  
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
    'الأحمدي', 'الفروانية', 'حولي', 'الجهراء', 'مبارك الكبير', 'العاصمة'
  ];

  // Mock existing customers data
  const existingCustomers = [
    {
      id: 1,
      name: 'أحمد محمد الكندري',
      phone: '97712345678',
      email: 'ahmad@example.com',
      orders: [
        { id: 'ORD-001', date: '2024-01-15', items: 2, total: 45.500 },
        { id: 'ORD-003', date: '2024-02-20', items: 1, total: 25.750 }
      ]
    },
    {
      id: 2,
      name: 'فاطمة علي العتيبي',
      phone: '97712345679',
      email: 'fatima@example.com',
      orders: [
        { id: 'ORD-002', date: '2024-01-20', items: 3, total: 67.250 }
      ]
    }
  ];

  const filteredCustomers = existingCustomers.filter(customer =>
    customer.name.includes(searchTerm) ||
    customer.phone.includes(searchTerm) ||
    customer.email.includes(searchTerm)
  );

  const validateKuwaitiPhone = (phone: string) => {
    const kuwaitiPhoneRegex = /^965[569]\d{7}$|^[569]\d{7}$/;
    return kuwaitiPhoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleNext = () => {
    if (customerType === 'existing' && selectedCustomer) {
      onNext({ type: 'existing', data: selectedCustomer });
    } else if (customerType === 'new') {
      onNext({ type: 'new', data: { ...customerData, measurements } });
    }
  };

  const canProceed = customerType === 'existing' ? 
    selectedCustomer : 
    customerData.name && customerData.phone && validateKuwaitiPhone(customerData.phone);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>{t('customer.name')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Type Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">{t('customer.new')}</Label>
          <RadioGroup
            value={customerType}
            onValueChange={(value) => setCustomerType(value as 'new' | 'existing')}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new" className="flex items-center gap-2 cursor-pointer">
                <UserPlus className="w-4 h-4" />
                <span>{t('customer.new')}</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="existing" id="existing" />
              <Label htmlFor="existing" className="flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span>{t('customer.existing')}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Existing Customer Search */}
        {customerType === 'existing' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t('customer.search')}</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={`${t('common.search')}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCustomer?.id === customer.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{customer.name}</h4>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.orders.length} {t('order.number')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedCustomer && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-green-800">{selectedCustomer.name}</h4>
                    <p className="text-sm text-green-600">{t('customer.existing')}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreviousOrders(!showPreviousOrders)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('customer.orders.previous')}
                  </Button>
                </div>

                {showPreviousOrders && (
                  <div className="mt-4 space-y-2">
                    {selectedCustomer.orders.map((order: any) => (
                      <div key={order.id} className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="font-medium">#{order.id}</span>
                        <span className="text-sm text-gray-600">{order.date}</span>
                        <span className="text-sm">{order.items} {t('order.items')}</span>
                        <span className="font-medium">{order.total.toFixed(3)} {t('common.currency')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
                  <Label htmlFor="name">{t('customer.name')} *</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    placeholder={t('customer.name')}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('customer.phone')} *</Label>
                  <Input
                    id="phone"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    placeholder="97712345678"
                    required
                    className="w-full"
                  />
                  {customerData.phone && !validateKuwaitiPhone(customerData.phone) && (
                    <p className="text-sm text-red-600">يرجى إدخال رقم هاتف كويتي صحيح</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">{t('customer.gender')}</Label>
                  <Select value={customerData.gender} onValueChange={(value) => setCustomerData({...customerData, gender: value})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('customer.gender')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('common.male')}</SelectItem>
                      <SelectItem value="female">{t('common.female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">{t('customer.age')}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={customerData.age}
                    onChange={(e) => setCustomerData({...customerData, age: e.target.value})}
                    placeholder={t('customer.age')}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('customer.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    placeholder="example@email.com"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('customer.address')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">{t('customer.country')}</Label>
                  <Input
                    id="country"
                    value={customerData.country}
                    disabled
                    className="bg-gray-100 w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">{t('customer.state')}</Label>
                  <Select value={customerData.state} onValueChange={(value) => setCustomerData({...customerData, state: value})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('customer.state')} />
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
                  <Label htmlFor="area">{t('customer.area')}</Label>
                  <Input
                    id="area"
                    value={customerData.area}
                    onChange={(e) => setCustomerData({...customerData, area: e.target.value})}
                    placeholder="الجابرية"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">{t('customer.street')}</Label>
                  <Input
                    id="street"
                    value={customerData.street}
                    onChange={(e) => setCustomerData({...customerData, street: e.target.value})}
                    placeholder={t('customer.street')}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="houseNumber">{t('customer.house')}</Label>
                  <Input
                    id="houseNumber"
                    value={customerData.houseNumber}
                    onChange={(e) => setCustomerData({...customerData, houseNumber: e.target.value})}
                    placeholder={t('customer.house')}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('customer.measurements')}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">{t('measurement.chest')} (سم)</Label>
                  <Input
                    id="chest"
                    type="number"
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                    placeholder="95"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="waist">{t('measurement.waist')} (سم)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                    placeholder="85"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shoulder">{t('measurement.shoulder')} (سم)</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    value={measurements.shoulder}
                    onChange={(e) => setMeasurements({...measurements, shoulder: e.target.value})}
                    placeholder="45"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="neck">{t('measurement.neck')} (سم)</Label>
                  <Input
                    id="neck"
                    type="number"
                    value={measurements.neck}
                    onChange={(e) => setMeasurements({...measurements, neck: e.target.value})}
                    placeholder="40"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="length">{t('measurement.length')} (سم)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={measurements.length}
                    onChange={(e) => setMeasurements({...measurements, length: e.target.value})}
                    placeholder="150"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sleeve">{t('measurement.sleeve')} (سم)</Label>
                  <Input
                    id="sleeve"
                    type="number"
                    value={measurements.sleeve}
                    onChange={(e) => setMeasurements({...measurements, sleeve: e.target.value})}
                    placeholder="60"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full sm:w-auto min-w-[120px]"
          >
            {t('common.next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
