
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, ShoppingCart, MapPin, User, Phone, Mail } from 'lucide-react';

interface WorkshopDetailsModalProps {
  workshop: any;
  isOpen: boolean;
  onClose: () => void;
}

const WorkshopDetailsModal = ({ workshop, isOpen, onClose }: WorkshopDetailsModalProps) => {
  if (!workshop) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            تفاصيل الورشة - {workshop.name}
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
              </div>
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
                  <span className="font-medium">2024-01-01</span>
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
