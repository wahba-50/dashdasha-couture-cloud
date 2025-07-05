
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SystemHeader from '@/components/SystemHeader';

const CreateWorkshop = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating workshop:', formData);
    // Here you would typically send the data to your backend
    alert('تم إنشاء الورشة بنجاح!');
    navigate('/system');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title="إضافة ورشة جديدة"
        subtitle="إنشاء ورشة خياطة جديدة"
        actions={
          <Button 
            variant="outline"
            onClick={() => navigate('/system')}
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

              <div className="space-y-2">
                <Label htmlFor="address">العنوان *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="أدخل عنوان الورشة"
                  required
                />
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

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  إنشاء الورشة
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/system')}
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
