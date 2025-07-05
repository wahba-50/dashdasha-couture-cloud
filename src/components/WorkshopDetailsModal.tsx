
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, Eye, Settings } from 'lucide-react';

interface Workshop {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  customers: number;
  orders: number;
  revenue: number;
  hasExternalServices: boolean;
}

interface WorkshopDetailsModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
  onEnterWorkshop: (workshopId: string) => void;
}

const WorkshopDetailsModal = ({ workshop, isOpen, onClose, onEnterWorkshop }: WorkshopDetailsModalProps) => {
  if (!workshop) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'men': return 'رجالي';
      case 'women': return 'حريمي';
      case 'both': return 'رجالي وحريمي';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير مفعل': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            تفاصيل الورشة
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Workshop Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{workshop.name}</h3>
              <Badge className={getStatusColor(workshop.status)}>
                {workshop.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">نوع الورشة</p>
                <p className="font-medium">{getTypeLabel(workshop.type)}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">الموقع</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="font-medium">{workshop.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{workshop.customers}</p>
              <p className="text-sm text-gray-600">المستخدمين</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Building2 className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">{workshop.orders}</p>
              <p className="text-sm text-gray-600">الطلبات</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-5 h-5 bg-amber-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-amber-600">{workshop.revenue.toLocaleString()} د.ك</p>
              <p className="text-sm text-gray-600">الإيرادات</p>
            </div>
          </div>

          {/* External Services */}
          {workshop.hasExternalServices && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">الخدمات الخارجية المفعلة</h4>
              </div>
              <p className="text-sm text-blue-700">
                هذه الورشة مربوطة بالخدمات الخارجية مثل خدمة المغسلة الآلية وخدمة التوصيل السريع.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => onEnterWorkshop(workshop.id)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              دخول الورشة
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailsModal;
