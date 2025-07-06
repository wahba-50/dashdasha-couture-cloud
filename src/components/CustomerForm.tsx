import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, Users, MapPin, Home, UserPlus, Search } from "lucide-react";
import CustomerSearch from './CustomerSearch';
import CustomerMeasurements from './CustomerMeasurements';
import { useParams } from 'react-router-dom';

interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  age?: number;
  address: {
    country: string;
    governorate: string;
    block: string;
    street: string;
    houseNumber: string;
  };
  measurements: {
    chest: string;
    waist: string;
    shoulder: string;
    length: string;
    armLength: string;
    neckCircumference: string;
    armOpening: string;
    bottomWidth: string;
    notes: string;
  };
}

interface CustomerFormProps {
  onNext: (customerData: CustomerData) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const { workshopId } = useParams();
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    gender: '',
    age: undefined,
    address: {
      country: 'الكويت',
      governorate: '',
      block: '',
      street: '',
      houseNumber: ''
    },
    measurements: {
      chest: '',
      waist: '',
      shoulder: '',
      length: '',
      armLength: '',
      neckCircumference: '',
      armOpening: '',
      bottomWidth: '',
      notes: ''
    }
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!customerData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\d{8}$/.test(customerData.phone.trim())) {
      newErrors.phone = 'رقم الهاتف يجب أن يكون 8 أرقام';
    }
    
    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (customerData.age && (customerData.age < 1 || customerData.age > 120)) {
      newErrors.age = 'العمر يجب أن يكون بين 1 و 120';
    }

    // Address validation
    if (!customerData.address.governorate.trim()) {
      newErrors.governorate = 'المحافظة مطلوبة';
    }
    
    if (!customerData.address.block.trim()) {
      newErrors.block = 'رقم القطعة مطلوب';
    }
    
    if (!customerData.address.street.trim()) {
      newErrors.street = 'الشارع مطلوب';
    }
    
    if (!customerData.address.houseNumber.trim()) {
      newErrors.houseNumber = 'رقم المنزل مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveCustomerToStorage = (customer: CustomerData) => {
    console.log('Starting to save customer:', customer.name, 'for workshop:', workshopId);
    
    // Get workshop info for customer record
    const workshopData = JSON.parse(localStorage.getItem('workshops') || '[]');
    const currentWorkshop = workshopData.find((w: any) => w.id === workshopId);
    
    const customerRecord = {
      id: Date.now().toString(), // Convert to string for consistency
      name: customer.name,
      phone: customer.phone,
      email: customer.email || '',
      gender: customer.gender || '',
      age: customer.age,
      address: customer.address,
      measurements: customer.measurements,
      workshopId: workshopId,
      workshopName: currentWorkshop?.name || 'ورشة غير محددة',
      createdAt: new Date().toISOString().split('T')[0],
      orders: 0,
      totalSpent: 0,
      lastOrder: new Date().toISOString().split('T')[0]
    };

    console.log('Customer record to save:', customerRecord);

    // Save to workshop customers
    const workshopCustomers = JSON.parse(localStorage.getItem(`workshopCustomers_${workshopId}`) || '[]');
    console.log('Current workshop customers before save:', workshopCustomers);
    
    // Check if customer already exists (by phone number)
    const existingCustomerIndex = workshopCustomers.findIndex((c: any) => c.phone === customer.phone);
    
    if (existingCustomerIndex === -1) {
      // New customer - add to workshop customers
      workshopCustomers.push(customerRecord);
      localStorage.setItem(`workshopCustomers_${workshopId}`, JSON.stringify(workshopCustomers));
      console.log('Customer added to workshop customers. New list:', workshopCustomers);
      
      // Also save to system-wide customers for system owner dashboard
      const systemCustomers = JSON.parse(localStorage.getItem('systemCustomers') || '[]');
      console.log('Current system customers before save:', systemCustomers);
      
      const existingSystemCustomerIndex = systemCustomers.findIndex((c: any) => c.phone === customer.phone);
      
      if (existingSystemCustomerIndex === -1) {
        // New customer in the entire system
        systemCustomers.push(customerRecord);
        console.log('Customer added to system customers as new customer');
      } else {
        // Customer exists in system but from different workshop
        const existingCustomer = systemCustomers[existingSystemCustomerIndex];
        if (!existingCustomer.workshops) {
          existingCustomer.workshops = [existingCustomer.workshopName];
        }
        if (!existingCustomer.workshops.includes(currentWorkshop?.name)) {
          existingCustomer.workshops.push(currentWorkshop?.name || 'ورشة غير محددة');
        }
        systemCustomers[existingSystemCustomerIndex] = existingCustomer;
        console.log('Customer updated in system customers with multiple workshops');
      }
      
      localStorage.setItem('systemCustomers', JSON.stringify(systemCustomers));
      console.log('System customers after save:', systemCustomers);
      
      // Force refresh of customers in dashboard by dispatching multiple events
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('customerAdded', { 
          detail: { customer: customerRecord, workshopId } 
        }));
        // Also dispatch a storage event to ensure all components refresh
        window.dispatchEvent(new CustomEvent('storage', {
          detail: { key: `workshopCustomers_${workshopId}`, newValue: JSON.stringify(workshopCustomers) }
        }));
        console.log('Events dispatched for customer refresh');
      }, 100);
      
      console.log('تم حفظ العميل الجديد:', customerRecord.name);
    } else {
      // Update existing customer
      workshopCustomers[existingCustomerIndex] = { ...workshopCustomers[existingCustomerIndex], ...customerRecord };
      localStorage.setItem(`workshopCustomers_${workshopId}`, JSON.stringify(workshopCustomers));
      console.log('تم تحديث بيانات العميل:', customerRecord.name);
      
      // Also dispatch events for updates
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('customerAdded', { 
          detail: { customer: customerRecord, workshopId } 
        }));
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Always save customer data when creating new order (regardless of isNewCustomer flag)
      // This ensures that any customer data entered during order creation is saved
      saveCustomerToStorage(customerData);
      
      // Pass customer data to next step
      onNext(customerData);
    }
  };

  const updateField = (field: string, value: string | number) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setCustomerData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setCustomerData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCustomerSelect = (selectedCustomer: any) => {
    setCustomerData({
      name: selectedCustomer.name,
      phone: selectedCustomer.phone,
      email: selectedCustomer.email || '',
      gender: selectedCustomer.gender || '',
      age: selectedCustomer.age,
      address: selectedCustomer.address,
      measurements: selectedCustomer.measurements
    });
  };

  const kuwaitGovernorates = [
    'العاصمة',
    'حولي',
    'الفروانية',
    'الأحمدي',
    'الجهراء',
    'مبارك الكبير'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          بيانات العميل
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Customer Type Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            type="button"
            variant={isNewCustomer ? "default" : "outline"}
            onClick={() => setIsNewCustomer(true)}
            className="flex-1"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            عميل جديد
          </Button>
          <Button
            type="button"
            variant={!isNewCustomer ? "default" : "outline"}
            onClick={() => setIsNewCustomer(false)}
            className="flex-1"
          >
            <Search className="w-4 h-4 mr-2" />
            عميل موجود
          </Button>
        </div>

        {/* Existing Customer Search */}
        {!isNewCustomer && (
          <CustomerSearch onCustomerSelect={handleCustomerSelect} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                اسم العميل *
              </Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="أدخل اسم العميل"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                رقم الهاتف *
              </Label>
              <Input
                id="phone"
                value={customerData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="12345678"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني (اختياري)
              </Label>
              <Input
                id="email"
                type="email"
                value={customerData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="example@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="age" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                العمر (اختياري)
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={customerData.age || ''}
                onChange={(e) => updateField('age', parseInt(e.target.value) || undefined)}
                placeholder="العمر"
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <Label htmlFor="gender" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                الجنس (اختياري)
              </Label>
              <Select value={customerData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ذكر">ذكر</SelectItem>
                  <SelectItem value="أنثى">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-semibold">العنوان</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="country" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  الدولة
                </Label>
                <Input
                  id="country"
                  value={customerData.address.country}
                  onChange={(e) => updateField('address.country', e.target.value)}
                  placeholder="الكويت"
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="governorate" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  المحافظة *
                </Label>
                <Select 
                  value={customerData.address.governorate} 
                  onValueChange={(value) => updateField('address.governorate', value)}
                >
                  <SelectTrigger className={errors.governorate ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    {kuwaitGovernorates.map(gov => (
                      <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>}
              </div>

              <div>
                <Label htmlFor="block">رقم القطعة *</Label>
                <Input
                  id="block"
                  value={customerData.address.block}
                  onChange={(e) => updateField('address.block', e.target.value)}
                  placeholder="رقم القطعة"
                  className={errors.block ? 'border-red-500' : ''}
                />
                {errors.block && <p className="text-red-500 text-sm mt-1">{errors.block}</p>}
              </div>

              <div>
                <Label htmlFor="street">الشارع *</Label>
                <Input
                  id="street"
                  value={customerData.address.street}
                  onChange={(e) => updateField('address.street', e.target.value)}
                  placeholder="رقم الشارع"
                  className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>

              <div>
                <Label htmlFor="houseNumber">رقم المنزل *</Label>
                <Input
                  id="houseNumber"
                  value={customerData.address.houseNumber}
                  onChange={(e) => updateField('address.houseNumber', e.target.value)}
                  placeholder="رقم المنزل"
                  className={errors.houseNumber ? 'border-red-500' : ''}
                />
                {errors.houseNumber && <p className="text-red-500 text-sm mt-1">{errors.houseNumber}</p>}
              </div>
            </div>
          </div>

          {/* Customer Measurements */}
          <div className="border-t pt-6">
            <CustomerMeasurements
              measurements={customerData.measurements}
              onMeasurementsChange={(measurements) => setCustomerData(prev => ({ ...prev, measurements }))}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              التالي - تفاصيل الطلب
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
