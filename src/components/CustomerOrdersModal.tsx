import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Calendar, DollarSign, Package, User, Banknote, CreditCard } from "lucide-react";

interface CustomerOrdersModalProps {
  customer: any;
  orders: any[];
  isOpen: boolean;
  onClose: () => void;
}

const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({
  customer,
  orders,
  isOpen,
  onClose
}) => {
  if (!customer) return null;

  const customerOrders = orders.filter(order => order.customerName === customer.name)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
      <DialogContent className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right">
            <ShoppingCart className="w-5 h-5" />
            طلبات العميل: {customer.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  ملخص العميل
                </h3>
                <Badge variant="outline">{customerOrders.length} طلب</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="text-center bg-blue-50 p-2 rounded">
                  <p className="text-gray-500">إجمالي الطلبات</p>
                  <p className="font-bold text-blue-600">{customerOrders.length}</p>
                </div>
                <div className="text-center bg-green-50 p-2 rounded">
                  <p className="text-gray-500">إجمالي الإنفاق</p>
                  <p className="font-bold text-green-600">{customer.totalSpent.toFixed(3)} د.ك</p>
                </div>
                <div className="text-center bg-purple-50 p-2 rounded">
                  <p className="text-gray-500">متوسط الطلب</p>
                  <p className="font-bold text-purple-600">{(customer.totalSpent / customer.orders).toFixed(3)} د.ك</p>
                </div>
                <div className="text-center bg-amber-50 p-2 rounded">
                  <p className="text-gray-500">آخر طلب</p>
                  <p className="font-bold text-amber-600">{customer.lastOrder}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-3">
            {customerOrders.length > 0 ? (
              customerOrders.map((order) => (
                <Card key={order.id} className="border hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-primary">#{order.id}</h4>
                          <Badge className={`${getStatusColor(order.status)} border text-xs`}>
                            {order.status}
                          </Badge>
                          {order.cutter && (
                            <Badge variant="outline" className="text-xs">
                              القصاص: {order.cutter}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">القطع:</span>
                          <span className="font-semibold">{order.items}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">المجموع:</span>
                          <span className="font-semibold text-green-600">{order.total.toFixed(3)} د.ك</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">التسليم:</span>
                          <span className="font-semibold">{order.deliveryDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {order.payment?.type === 'cash' ? (
                            <Banknote className="w-3 h-3 text-gray-400" />
                          ) : (
                            <CreditCard className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-gray-500">الدفع:</span>
                          <span className="font-semibold">{order.payment?.type === 'cash' ? 'نقدي' : 'إلكتروني'}</span>
                        </div>
                      </div>

                      {/* Payment Details */}
                      {order.payment && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">المبلغ المستلم:</span>
                              <p className="font-semibold text-green-600">{order.payment.receivedAmount?.toFixed(3)} د.ك</p>
                            </div>
                            <div>
                              <span className="text-gray-500">المبلغ المتبقي:</span>
                              <p className="font-semibold text-red-600">{order.payment.remainingAmount?.toFixed(3)} د.ك</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* QR Codes */}
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500 mr-2">أكواد QR:</span>
                        {order.qrCodes.map(qr => (
                          <Badge key={qr} variant="outline" className="text-xs font-mono">
                            {qr}
                          </Badge>
                        ))}
                      </div>

                      {/* Item Details if available */}
                      {order.itemDetails && order.itemDetails.length > 0 && (
                        <div className="border-t pt-3">
                          <h5 className="text-sm font-medium mb-2">تفاصيل القطع:</h5>
                          <div className="space-y-2">
                            {order.itemDetails.map((item, index) => (
                              <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div>
                                    <span className="text-gray-500">الكود:</span> {item.qrCode}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">القماش:</span> {item.fabric}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">القصة:</span> {item.cut}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات سابقة لهذا العميل</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerOrdersModal;