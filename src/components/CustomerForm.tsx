
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, Users } from "lucide-react";

interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
}

interface CustomerFormProps {
  onNext: (customerData: CustomerData) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    gender: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const validateForm = () => {
    const newErrors: Partial<CustomerData> = {};
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(customerData);
    }
  };

  const updateField = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          بيانات العميل
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="gender" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                الجنس (اختياري)
              </Label>
              <Select value={customerData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
