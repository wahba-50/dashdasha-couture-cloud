import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CustomerFormProps {
  onNext: (customerData: any) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any>(null);
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [reorderData, setReorderData] = useState<any>(null);

  // Mock data for order history
  const orderHistory = [
    {
      id: 1,
      orderNumber: 'ORD-2024001',
      createdAt: '2024-01-20T14:30:00.000Z',
      status: 'مكتمل',
      total: 75.500,
      items: [
        { fabric: 'قماش قطني', cut: 'قصة كلاسيكية', price: 25.500 },
        { fabric: 'قماش حريري', cut: 'قصة عصرية', price: 50.000 }
      ],
      notes: 'تم التوصيل في الموعد'
    },
    {
      id: 2,
      orderNumber: 'ORD-2023012',
      createdAt: '2023-12-15T10:00:00.000Z',
      status: 'قيد التنفيذ',
      total: 120.000,
      items: [
        { fabric: 'قماش كتان', cut: 'قصة فاخرة', price: 120.000 }
      ],
      notes: 'يحتاج إلى تعديل بسيط'
    }
  ];

  const handleSubmit = () => {
    const customerData = {
      name,
      phone,
      email,
      gender,
      address
    };
    onNext(customerData);
  };

  const handleOrderDetails = (order: any) => {
    setSelectedOrderDetails(order);
    setShowOrderDetails(true);
  };

  const handleReorder = (originalOrder: any) => {
    setReorderData({
      originalOrder,
      pieces: 1,
      deliveryDate: ''
    });
    setShowReorderDialog(true);
  };

  const processReorder = () => {
    if (reorderData) {
      const newOrder = {
        ...reorderData.originalOrder,
        id: Date.now(),
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
        pieces: reorderData.pieces,
        deliveryDate: reorderData.deliveryDate,
        status: 'جديد',
        createdAt: new Date().toISOString(),
        total: reorderData.originalOrder.total * reorderData.pieces
      };
      
      console.log('Reorder created:', newOrder);
      alert(`تم إعادة الطلب بنجاح!\nرقم الطلب الجديد: ${newOrder.orderNumber}`);
      setShowReorderDialog(false);
      setReorderData(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Form */}
      <Card>
        <CardHeader>
          <CardTitle>بيانات العميل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gender">الجنس</Label>
            <Select onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الجنس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">ذكر</SelectItem>
                <SelectItem value="female">أنثى</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="address">العنوان</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="أدخل العنوان بالتفصيل"
            />
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>سجل الطلبات</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowOrderHistory(!showOrderHistory)}>
              {showOrderHistory ? 'إخفاء السجل' : 'عرض السجل'}
            </Button>
          </div>
        </CardHeader>
        {showOrderHistory && (
          <CardContent className="space-y-4">
            {orderHistory.length > 0 ? (
              <div className="space-y-2">
                {orderHistory.map(order => (
                  <Card key={order.id} className="border-2 border-gray-100">
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <p className="font-medium">الطلب رقم: {order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString('ar-KW')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleOrderDetails(order)}>
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" onClick={() => handleReorder(order)}>
                          إعادة الطلب
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">لا يوجد سجل طلبات لهذا العميل</div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Submit Button */}
      <Button onClick={handleSubmit}>التالي - تفاصيل الطلب</Button>

        {/* Order Details Modal */}
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تفاصيل الطلب</DialogTitle>
            </DialogHeader>
            {selectedOrderDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>رقم الطلب:</strong> {selectedOrderDetails.orderNumber}</div>
                  <div><strong>التاريخ:</strong> {new Date(selectedOrderDetails.createdAt).toLocaleDateString('ar-KW')}</div>
                  <div><strong>الحالة:</strong> <Badge variant={selectedOrderDetails.status === 'مكتمل' ? 'default' : 'secondary'}>{selectedOrderDetails.status}</Badge></div>
                  <div><strong>المبلغ:</strong> {selectedOrderDetails.total.toFixed(3)} د.ك</div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">القطع:</h4>
                  <div className="space-y-2">
                    {selectedOrderDetails.items?.map((item: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">قطعة #{index + 1}</p>
                            <p className="text-sm text-gray-600">القماش: {item.fabric || 'غير محدد'}</p>
                            <p className="text-sm text-gray-600">القصة: {item.cut || 'غير محدد'}</p>
                          </div>
                          <span className="font-bold text-primary">{item.price?.toFixed(3) || '0.000'} د.ك</span>
                        </div>
                      </div>
                    )) || (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">لا توجد تفاصيل القطع متاحة</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedOrderDetails.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">الملاحظات:</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedOrderDetails.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reorder Dialog */}
        <Dialog open={showReorderDialog} onOpenChange={setShowReorderDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إعادة الطلب</DialogTitle>
            </DialogHeader>
            {reorderData && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">الطلب الأصلي: {reorderData.originalOrder.orderNumber}</p>
                  <p className="text-xs text-gray-600">المبلغ الأصلي: {reorderData.originalOrder.total.toFixed(3)} د.ك</p>
                </div>
                
                <div>
                  <Label htmlFor="pieces">عدد القطع</Label>
                  <Input
                    id="pieces"
                    type="number"
                    min="1"
                    value={reorderData.pieces}
                    onChange={(e) => setReorderData({
                      ...reorderData,
                      pieces: parseInt(e.target.value) || 1
                    })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reorderDeliveryDate">موعد التسليم</Label>
                  <Input
                    id="reorderDeliveryDate"
                    type="date"
                    value={reorderData.deliveryDate}
                    onChange={(e) => setReorderData({
                      ...reorderData,
                      deliveryDate: e.target.value
                    })}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>المبلغ الإجمالي:</span>
                    <span className="font-bold">{(reorderData.originalOrder.total * reorderData.pieces).toFixed(3)} د.ك</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={processReorder} className="flex-1">
                    تأكيد إعادة الطلب
                  </Button>
                  <Button variant="outline" onClick={() => setShowReorderDialog(false)} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerForm;
