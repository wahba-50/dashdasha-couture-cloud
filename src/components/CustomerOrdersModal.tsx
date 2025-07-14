import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Calendar, DollarSign, Package, User, Banknote, CreditCard, RefreshCw, QrCode, Shirt, Eye, CheckSquare } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workshopId = searchParams.get('workshopId');
  const [selectedOrderForRepeat, setSelectedOrderForRepeat] = useState<any>(null);
  const [selectedPieces, setSelectedPieces] = useState<string[]>([]);
  
  if (!customer) return null;

  const customerOrders = orders.filter(order => order.customerName === customer.name)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get actual pieces data from the order
  const getOrderPieces = (order: any) => {
    // First try to use fullOrderData.items if available (most complete data)
    if (order.fullOrderData && order.fullOrderData.items && order.fullOrderData.items.length > 0) {
      return order.fullOrderData.items.map((item: any, index: number) => ({
        id: `${index + 1}`,
        qrCode: item.qrCode || order.qrCodes[index] || `QR00${index + 1}`,
        fabric: item.fabricType === 'customer' ? 'قماش العميل' : (item.fabric?.name || 'قماش الورشة'),
        fabricType: item.fabricType || 'workshop',
        cut: item.cut?.name || 'قصة كلاسيكية',
        accessories: item.accessories ? item.accessories.map((acc: any) => 
          typeof acc === 'string' ? acc : `${acc.name} (${acc.quantity || 1})`
        ) : ['لا يوجد'],
        labors: item.labors ? item.labors.map((labor: any) => 
          typeof labor === 'string' ? labor : labor.name
        ) : ['مصنعية'],
        price: item.totalPrice || (order.total / order.items),
        specifications: `${item.fabricType === 'customer' ? 'قماش العميل' : (item.fabric?.name || 'قماش الورشة')} - ${item.cut?.name || 'قصة كلاسيكية'}`
      }));
    }
    // Fallback to itemDetails if available
    else if (order.itemDetails && order.itemDetails.length > 0) {
      return order.itemDetails.map((item: any, index: number) => ({
        id: `${index + 1}`,
        qrCode: item.qrCode || order.qrCodes[index] || `QR00${index + 1}`,
        fabric: item.fabric || 'قماش العميل',
        fabricType: item.fabric === 'قماش العميل' ? 'customer' : 'workshop',
        cut: item.cut || 'قصة كلاسيكية',
        accessories: item.accessories ? item.accessories.map((acc: any) => 
          typeof acc === 'string' ? acc : `${acc.name} (${acc.quantity || 1})`
        ) : ['لا يوجد'],
        labors: item.labors ? item.labors.map((labor: any) => 
          typeof labor === 'string' ? labor : labor.name
        ) : ['مصنعية'],
        price: order.total / order.items,
        specifications: `${item.fabric || 'قماش العميل'} - ${item.cut || 'قصة كلاسيكية'}`
      }));
    } 
    // Last resort: create pieces based on basic order data
    else {
      const pieceCount = order.items || 1;
      return Array.from({ length: pieceCount }, (_, index) => ({
        id: `${index + 1}`,
        qrCode: order.qrCodes[index] || `QR00${index + 1}`,
        fabric: 'قماش قطني فاخر',
        fabricType: 'workshop',
        cut: 'قصة دشداشة كلاسيكية',
        accessories: ['أزرار ذهبية × 2'],
        labors: ['مصنعية قص وتفصيل'],
        price: order.total / pieceCount,
        specifications: 'قماش قطني عالي الجودة، قصة تقليدية كويتية'
      }));
    }
  };

  const handleRepeatOrder = (order: any) => {
    setSelectedOrderForRepeat(order);
    setSelectedPieces([]);
  };

  const handlePieceToggle = (pieceId: string) => {
    setSelectedPieces(prev => 
      prev.includes(pieceId) 
        ? prev.filter(id => id !== pieceId)
        : [...prev, pieceId]
    );
  };

  const generateNewQRCode = () => {
    return `QR${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
  };

  const handleConfirmRepeat = () => {
    if (selectedPieces.length > 0 && selectedOrderForRepeat) {
      const orderPieces = getOrderPieces(selectedOrderForRepeat);
      const selectedPieceDetails = orderPieces.filter(piece => selectedPieces.includes(piece.id));
      
      // Generate new QR codes for the repeated pieces
      const repeatedPieces = selectedPieceDetails.map(piece => ({
        ...piece,
        qrCode: generateNewQRCode(), // Generate new QR code
        id: generateNewQRCode() // Generate new ID as well
      }));

      // Create order data format that matches the NewOrder page expectations
      const orderData = {
        customer: customer,
        items: repeatedPieces.map(piece => ({
          id: piece.id,
          qrCode: piece.qrCode,
          fabricType: piece.fabricType,
          fabric: piece.fabricType === 'workshop' ? { 
            name: piece.fabric,
            price: 0 // Default price, will be set in OrderForm
          } : null,
          cut: { 
            name: piece.cut,
            price: 0 // Default price, will be set in OrderForm
          },
          accessories: piece.accessories.map((acc, index) => ({ 
            id: `acc_${index}`,
            name: acc, 
            price: 0, // Default price, will be set in OrderForm
            quantity: 1 
          })),
          labors: piece.labors.map((labor, index) => ({ 
            id: `labor_${index}`,
            name: labor,
            price: 0 // Default price, will be set in OrderForm
          })),
          totalPrice: piece.price,
          specifications: piece.specifications
        })),
        discount: { type: 'amount', value: 0 },
        deliveryDate: '',
        notes: `طلب معاد من الطلب #${selectedOrderForRepeat.id}`,
        payment: {
          type: 'cash',
          receivedAmount: 0,
          remainingAmount: 0
        }
      };

      // Store the repeated order data in sessionStorage to pass to NewOrder page
      sessionStorage.setItem('repeatedOrderData', JSON.stringify(orderData));
      
      // Navigate to new order page
      const navPath = workshopId ? `/new-order?workshopId=${workshopId}&repeated=true` : `/new-order?repeated=true`;
      navigate(navPath);
      
      // Reset state and close modal
      setSelectedOrderForRepeat(null);
      setSelectedPieces([]);
      onClose();
    }
  };

  const handleCancelRepeat = () => {
    setSelectedOrderForRepeat(null);
    setSelectedPieces([]);
  };

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
                  <p className="font-bold text-green-600">{(customer.totalSpent || 0).toFixed(3)} د.ك</p>
                </div>
                <div className="text-center bg-purple-50 p-2 rounded">
                  <p className="text-gray-500">متوسط الطلب</p>
                  <p className="font-bold text-purple-600">{((customer.totalSpent || 0) / (customer.orders || 1)).toFixed(3)} د.ك</p>
                </div>
                <div className="text-center bg-amber-50 p-2 rounded">
                  <p className="text-gray-500">آخر طلب</p>
                  <p className="font-bold text-amber-600">{customer.lastOrder || 'غير محدد'}</p>
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

                      {/* Repeat Order Button */}
                      <div className="border-t pt-3 flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => handleRepeatOrder(order)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          إعادة هذا الطلب
                        </Button>
                      </div>
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
        
        {/* Piece Selection Modal */}
        {selectedOrderForRepeat && (
          <Dialog open={!!selectedOrderForRepeat} onOpenChange={handleCancelRepeat}>
            <DialogContent className="max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-right">
                  <CheckSquare className="w-5 h-5" />
                  اختيار القطع لإعادة الطلب #{selectedOrderForRepeat.id}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="text-blue-800">اختر القطع التي تريد إعادة طلبها من هذا الطلب:</p>
                </div>

                {/* Pieces Grid */}
                <div className="space-y-3">
                  {getOrderPieces(selectedOrderForRepeat).map((piece) => (
                    <Card 
                      key={piece.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedPieces.includes(piece.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handlePieceToggle(piece.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedPieces.includes(piece.id)}
                            onChange={() => handlePieceToggle(piece.id)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1 space-y-3">
                            {/* Piece Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <QrCode className="w-4 h-4 text-gray-500" />
                                <Badge variant="outline" className="font-mono text-xs">
                                  {piece.qrCode}
                                </Badge>
                                <Badge className={`text-xs ${
                                  piece.fabricType === 'workshop' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {piece.fabricType === 'workshop' ? 'قماش الورشة' : 'قماش العميل'}
                                </Badge>
                              </div>
                              <div className="text-primary font-bold text-sm">
                                {piece.price.toFixed(3)} د.ك
                              </div>
                            </div>

                            {/* Piece Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Shirt className="w-3 h-3 text-gray-400" />
                                  <span className="text-gray-500">القماش:</span>
                                  <span className="font-medium">{piece.fabric}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shirt className="w-3 h-3 text-gray-400" />
                                  <span className="text-gray-500">القصة:</span>
                                  <span className="font-medium">{piece.cut}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div>
                                  <span className="text-gray-500 text-xs">الإكسسوارات:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {piece.accessories.map((acc, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {acc}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">المصنعيات:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {piece.labors.map((labor, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {labor}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Specifications */}
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <span className="text-gray-500">المواصفات:</span>
                              <p className="mt-1 text-gray-700">{piece.specifications}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Selection Summary */}
                {selectedPieces.length > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-800">
                        تم اختيار {selectedPieces.length} قطعة
                      </span>
                      <span className="font-bold text-green-600">
                        المجموع: {getOrderPieces(selectedOrderForRepeat)
                          .filter(piece => selectedPieces.includes(piece.id))
                          .reduce((sum, piece) => sum + piece.price, 0)
                          .toFixed(3)} د.ك
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleConfirmRepeat}
                    disabled={selectedPieces.length === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    تأكيد إعادة الطلب ({selectedPieces.length} قطعة)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancelRepeat}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerOrdersModal;