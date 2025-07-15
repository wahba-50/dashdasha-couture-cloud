
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, User, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SystemHeader from '@/components/SystemHeader';

const CreateWorkshop = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: {
      country: 'الكويت',
      governorate: '',
      block: '',
      street: '',
      building: ''
    },
    description: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const kuwaitGovernorates = [
    'العاصمة',
    'حولي',
    'الفروانية',
    'مبارك الكبير',
    'الأحمدي',
    'الجهراء'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة!');
      return;
    }

    // Create workshop object
    const newWorkshop = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      type: formData.type === 'men' ? 'رجالي' : formData.type === 'women' ? 'حريمي' : 'حريمي ورجالي',
      address: `${formData.address.country}، ${formData.address.governorate}، القطعة ${formData.address.block}، الشارع ${formData.address.street}، المبنى ${formData.address.building}`,
      users: 1,
      customers: 0,
      orders: 0,
      status: "نشط",
      revenue: 0,
      description: formData.description,
      createdAt: new Date().toISOString(),
      credentials: {
        username: formData.username,
        password: formData.password
      }
    };

    // Get existing workshops from localStorage
    const existingWorkshops = JSON.parse(localStorage.getItem('workshops') || '[]');
    
    // Add new workshop
    const updatedWorkshops = [...existingWorkshops, newWorkshop];
    
    // Save to localStorage
    localStorage.setItem('workshops', JSON.stringify(updatedWorkshops));

    console.log('Creating workshop:', newWorkshop);
    alert('تم إنشاء الورشة بنجاح!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title="إضافة ورشة جديدة"
        subtitle="إنشاء ورشة خياطة جديدة"
        actions={
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة
          </Button>
        }
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              بيانات الورشة الجديدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Workshop Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">معلومات الورشة الأساسية</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">اسم الورشة *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم الورشة"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">نوع الورشة *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الورشة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">رجالي</SelectItem>
                      <SelectItem value="women">حريمي</SelectItem>
                      <SelectItem value="both">رجالي وحريمي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">العنوان</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>الدولة</Label>
                      <Input
                        value={formData.address.country}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>المحافظة *</Label>
                      <Select value={formData.address.governorate} onValueChange={(value) => handleAddressChange('governorate', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                        <SelectContent>
                          {kuwaitGovernorates.map((gov) => (
                            <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>القطعة *</Label>
                      <Input
                        value={formData.address.block}
                        onChange={(e) => handleAddressChange('block', e.target.value)}
                        placeholder="رقم القطعة"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>الشارع *</Label>
                      <Input
                        value={formData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        placeholder="رقم الشارع"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>المبنى *</Label>
                      <Input
                        value={formData.address.building}
                        onChange={(e) => handleAddressChange('building', e.target.value)}
                        placeholder="رقم المبنى"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الورشة</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="أدخل وصف مختصر للورشة"
                    rows={3}
                  />
                </div>
              </div>

              {/* Workshop Owner Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  بيانات صاحب الورشة
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم *</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="أدخل اسم المستخدم لصاحب الورشة"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="أعد إدخال كلمة المرور"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  إنشاء الورشة
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateWorkshop;
