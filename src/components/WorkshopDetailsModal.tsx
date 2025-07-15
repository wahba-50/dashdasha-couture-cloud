
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, ShoppingCart, MapPin, User, Phone, Mail, Edit3, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkshopDetailsModalProps {
  workshop: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedWorkshop: any) => void;
}

const WorkshopDetailsModal = ({ workshop, isOpen, onClose, onUpdate }: WorkshopDetailsModalProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: workshop?.name || '',
    type: workshop?.type || '',
    address: workshop?.address || '',
    username: workshop?.credentials?.username || '',
    password: workshop?.credentials?.password || '',
    status: workshop?.status || 'نشط'
  });

  if (!workshop) return null;

  const handleEdit = () => {
    setEditData({
      name: workshop.name || '',
      type: workshop.type || '',
      address: workshop.address || '',
      username: workshop.credentials?.username || '',
      password: workshop.credentials?.password || '',
      status: workshop.status || 'نشط'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedWorkshop = {
      ...workshop,
      name: editData.name,
      type: editData.type,
      address: editData.address,
      status: editData.status,
      credentials: {
        ...workshop.credentials,
        username: editData.username,
        password: editData.password
      }
    };

    // Update localStorage
    const existingWorkshops = JSON.parse(localStorage.getItem('workshops') || '[]');
    const workshopIndex = existingWorkshops.findIndex((w: any) => w.id === workshop.id);
    
    if (workshopIndex !== -1) {
      existingWorkshops[workshopIndex] = updatedWorkshop;
      localStorage.setItem('workshops', JSON.stringify(existingWorkshops));
      
      if (onUpdate) {
        onUpdate(updatedWorkshop);
      }
      
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الورشة بنجاح",
      });
      
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: workshop.name || '',
      type: workshop.type || '',
      address: workshop.address || '',
      username: workshop.credentials?.username || '',
      password: workshop.credentials?.password || '',
      status: workshop.status || 'نشط'
    });
  };

  const formatDate = (date: string | Date) => {
    if (!date) return '2024-01-01';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    } catch {
      return '2024-01-01';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              تفاصيل الورشة - {workshop.name}
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit3 className="w-4 h-4 mr-2" />
                تعديل
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  إلغاء
                </Button>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Workshop Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                معلومات الورشة الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-600">اسم الورشة:</span>
                    <p className="font-medium">{workshop.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">نوع الورشة:</span>
                    <Badge variant="secondary">{workshop.type}</Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">الحالة:</span>
                    <Badge className={workshop.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {workshop.status}
                    </Badge>
                  </div>
                  <div className="col-span-full">
                    <span className="text-gray-600">العنوان:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="font-medium">{workshop.address}</p>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <span className="text-gray-600">اسم المستخدم:</span>
                    <p className="font-medium">{workshop.credentials?.username || 'غير محدد'}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">اسم الورشة</Label>
                      <Input
                        id="edit-name"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">نوع الورشة</Label>
                      <Select value={editData.type} onValueChange={(value) => setEditData(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="رجالي">رجالي</SelectItem>
                          <SelectItem value="حريمي">حريمي</SelectItem>
                          <SelectItem value="حريمي ورجالي">حريمي ورجالي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">العنوان</Label>
                    <Input
                      id="edit-address"
                      value={editData.address}
                      onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-username">اسم المستخدم</Label>
                      <Input
                        id="edit-username"
                        value={editData.username}
                        onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-password">كلمة المرور</Label>
                      <Input
                        id="edit-password"
                        type="password"
                        value={editData.password}
                        onChange={(e) => setEditData(prev => ({ ...prev, password: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">الحالة</Label>
                    <Select value={editData.status} onValueChange={(value) => setEditData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="نشط">نشط</SelectItem>
                        <SelectItem value="معطل">معطل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>الإحصائيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">المستخدمين</p>
                  <p className="font-bold text-lg text-blue-600">{workshop.users}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">العملاء</p>
                  <p className="font-bold text-lg text-green-600">{workshop.customers}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">الطلبات</p>
                  <p className="font-bold text-lg text-purple-600">{workshop.orders}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mb-2 block">💰</span>
                  <p className="text-sm text-gray-600">الإيرادات</p>
                  <p className="font-bold text-lg text-orange-600">{workshop.revenue?.toFixed(3)} د.ك</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاريخ الإنشاء:</span>
                  <span className="font-medium">{formatDate(workshop.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">آخر نشاط:</span>
                  <span className="font-medium">اليوم</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الخدمات الخارجية:</span>
                  <Badge variant="outline">مفعلة</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailsModal;
