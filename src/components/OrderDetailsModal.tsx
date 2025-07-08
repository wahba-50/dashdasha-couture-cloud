
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Phone, MapPin, Calendar, Package, Scissors, CreditCard, Banknote } from "lucide-react";

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  // Debug: Log order structure
  console.log('Order data:', order);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'جاري الإنتاج': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'مكتمل': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            تفاصيل الطلب #{order.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <Badge className={`${getStatusColor(order.status)} border text-lg px-4 py-2`}>
              {order.status}
            </Badge>
            {order.cutter && (
              <Badge variant="outline" className="text-sm">
                <Scissors className="w-4 h-4 mr-1" />
                القصاص: {order.cutter}
              </Badge>
            )}
          </div>

          {/* Customer Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                معلومات العميل
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">الاسم:</span>
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">الهاتف:</span>
                  <span className="font-medium">{order.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                معلومات الطلب
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">تاريخ الطلب</p>
                  <p className="font-semibold">{order.createdAt}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">تاريخ التسليم</p>
                  <p className="font-semibold">{order.deliveryDate}</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Package className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <p className="text-sm text-gray-600">عدد القطع</p>
                  <p className="font-semibold">{order.items}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Measurements */}
          {order.clientMeasurements && Object.keys(order.clientMeasurements).length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  قياسات العميل
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                  {Object.entries(order.clientMeasurements).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray-600 font-medium">{key}:</span>
                      <span className="font-semibold">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {order.payment && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {order.payment.type === 'cash' ? <Banknote className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                  تفاصيل الدفع
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-700 mb-1">نوع الدفع</div>
                    <p className="font-semibold">{order.payment.type === 'cash' ? 'نقدي' : 'إلكتروني'}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-700 mb-1">المبلغ المستلم</div>
                    <p className="font-semibold">{order.payment.receivedAmount?.toFixed(3) || '0.000'} د.ك</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-700 mb-1">المبلغ المتبقي</div>
                    <p className="font-semibold">{order.payment.remainingAmount?.toFixed(3) || '0.000'} د.ك</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Item Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">تفاصيل القطع</h3>
              <div className="space-y-6">
                {order.itemDetails?.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="font-mono text-sm">
                        {item.qrCode}
                      </Badge>
                      <span className="text-sm font-medium text-primary">قطعة {index + 1}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
                      {/* Fabric Details */}
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 font-medium">نوع القماش:</span>
                          <p className="font-medium">{item.fabricType === 'customer' ? 'قماش العميل' : item.fabric}</p>
                        </div>
                        {item.fabricType === 'customer' && item.clientFabric && (
                          <>
                            {item.clientFabric.type && (
                              <div>
                                <span className="text-gray-600 font-medium">نوع قماش العميل:</span>
                                <p className="font-medium">{item.clientFabric.type}</p>
                              </div>
                            )}
                            {item.clientFabric.color && (
                              <div>
                                <span className="text-gray-600 font-medium">لون قماش العميل:</span>
                                <p className="font-medium">{item.clientFabric.color}</p>
                              </div>
                            )}
                            {item.clientFabric.description && (
                              <div>
                                <span className="text-gray-600 font-medium">وصف قماش العميل:</span>
                                <p className="font-medium">{item.clientFabric.description}</p>
                              </div>
                            )}
                          </>
                        )}
                        {item.fabric?.specifications && (
                          <div>
                            <span className="text-gray-600 font-medium">مواصفات القماش:</span>
                            <p className="font-medium">{item.fabric.specifications}</p>
                          </div>
                        )}
                        {item.fabric?.color && (
                          <div>
                            <span className="text-gray-600 font-medium">لون القماش:</span>
                            <p className="font-medium">{item.fabric.color}</p>
                          </div>
                        )}
                      </div>

                      {/* Cut and Style Details */}
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 font-medium">نوع القصة:</span>
                          <p className="font-medium">{item.cut}</p>
                        </div>
                        {item.style && (
                          <div>
                            <span className="text-gray-600 font-medium">الستايل:</span>
                            <p className="font-medium">{item.style}</p>
                          </div>
                        )}
                        {item.size && (
                          <div>
                            <span className="text-gray-600 font-medium">المقاس:</span>
                            <p className="font-medium">{item.size}</p>
                          </div>
                        )}
                      </div>

                      {/* Additional Details */}
                      <div className="space-y-2">
                        {item.measurements && (
                          <div>
                            <span className="text-gray-600 font-medium">القياسات:</span>
                            <div className="text-xs space-y-1 mt-1">
                              {Object.entries(item.measurements).map(([key, value]) => (
                                <p key={key} className="flex justify-between">
                                  <span>{key}:</span>
                                  <span className="font-medium">{value as string}</span>
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {item.price && (
                          <div>
                            <span className="text-gray-600 font-medium">السعر:</span>
                            <p className="font-medium">{item.price} د.ك</p>
                          </div>
                        )}
                        {item.deliveryDate && (
                          <div>
                            <span className="text-gray-600 font-medium">تاريخ التسليم:</span>
                            <p className="font-medium">{item.deliveryDate}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes Section */}
                    {item.notes && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">ملاحظات:</span>
                        <p className="font-medium mt-1 text-sm bg-yellow-50 p-2 rounded border">{item.notes}</p>
                      </div>
                    )}

                    {/* Special Instructions */}
                    {item.specialInstructions && (
                      <div className="mt-3">
                        <span className="text-gray-600 font-medium">تعليمات خاصة:</span>
                        <p className="font-medium mt-1 text-sm bg-blue-50 p-2 rounded border">{item.specialInstructions}</p>
                      </div>
                    )}

                    {/* Accessories Section */}
                    {item.accessories && item.accessories.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <span className="text-gray-600 font-medium mb-2 block">الإكسسوارات:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.accessories.map((accessory: string, accIndex: number) => (
                            <Badge key={accIndex} variant="secondary" className="text-xs">
                              {accessory}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* QR Codes Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">أكواد QR</h3>
              <div className="flex flex-wrap gap-2">
                {order.qrCodes?.map((qr: string) => (
                  <Badge key={qr} variant="outline" className="font-mono">
                    {qr}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Total */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">إجمالي الطلب:</span>
                <span className="font-bold text-primary text-xl">
                  {order.total?.toFixed(3)} د.ك
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
