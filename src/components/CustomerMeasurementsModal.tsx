import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, MapPin, User } from "lucide-react";

interface CustomerMeasurementsModalProps {
  customer: any;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerMeasurementsModal: React.FC<CustomerMeasurementsModalProps> = ({
  customer,
  isOpen,
  onClose
}) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right">
            <User className="w-5 h-5" />
            قياسات العميل: {customer.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Basic Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                معلومات العميل
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">الاسم:</span>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">الهاتف:</span>
                  <p className="font-medium">{customer.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500">البريد:</span>
                  <p className="font-medium">{customer.email || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">الجنس:</span>
                  <Badge variant="outline">{customer.gender || 'غير محدد'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurements */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                القياسات
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {customer.measurements?.chest && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الصدر:</span>
                    <p className="font-semibold">{customer.measurements.chest} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.waist && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الخصر:</span>
                    <p className="font-semibold">{customer.measurements.waist} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.shoulder && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الكتف:</span>
                    <p className="font-semibold">{customer.measurements.shoulder} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.neck && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الرقبة:</span>
                    <p className="font-semibold">{customer.measurements.neck} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.length && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الطول:</span>
                    <p className="font-semibold">{customer.measurements.length} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.sleeve && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">الكم:</span>
                    <p className="font-semibold">{customer.measurements.sleeve} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.armhole && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">فتحة الكم:</span>
                    <p className="font-semibold">{customer.measurements.armhole} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.armLength && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">طول الكم:</span>
                    <p className="font-semibold">{customer.measurements.armLength} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.neckCircumference && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">محيط الرقبة:</span>
                    <p className="font-semibold">{customer.measurements.neckCircumference} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.armOpening && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">فتحة الذراع:</span>
                    <p className="font-semibold">{customer.measurements.armOpening} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
                {customer.measurements?.bottomWidth && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">عرض القاع:</span>
                    <p className="font-semibold">{customer.measurements.bottomWidth} {customer.measurements?.unit === 'inch' ? 'انش' : 'سم'}</p>
                  </div>
                )}
              </div>
              
              {customer.measurements?.notes && (
                <div className="mt-3 p-2 bg-blue-50 rounded">
                  <span className="text-gray-500 text-sm">ملاحظات:</span>
                  <p className="text-sm">{customer.measurements.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                العنوان
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">الدولة:</span>
                  <p className="font-medium">{customer.address?.country || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">المحافظة:</span>
                  <p className="font-medium">{customer.address?.governorate || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">المنطقة:</span>
                  <p className="font-medium">{customer.address?.area || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">القطعة:</span>
                  <p className="font-medium">{customer.address?.block || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">الشارع:</span>
                  <p className="font-medium">{customer.address?.street || 'غير محدد'}</p>
                </div>
                <div>
                  <span className="text-gray-500">رقم المنزل:</span>
                  <p className="font-medium">{customer.address?.houseNumber || 'غير محدد'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerMeasurementsModal;