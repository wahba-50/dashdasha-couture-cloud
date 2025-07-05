import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Phone, Mail, Eye, History, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderDetailsModal from "./OrderDetailsModal";

interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  gender: string;
  notes: string;
}

interface CustomerFormProps {
  onNext: (customerData: CustomerFormData | any) => void;
}

const CustomerForm = ({ onNext }: CustomerFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    phone: '',
    email: '',
    gender: '',
    notes: ''
  });
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderData, setReorderData] = useState({ pieces: 1, deliveryDate: '' });

  // Mock data - in real app this would come from database
  const mockCustomers = [
    {
      id: '1',
      name: 'أحمد محمد الكندري',
      phone: '+965 9999 8888',
      email: 'ahmed@example.com',
      gender: 'ذكر',
      totalOrders: 5,
      lastOrder: '2024-01-15',
      notes: 'عميل مميز'
    },
    {
      id: '2',
      name: 'فاطمة علي العتيبي',
      phone: '+965 7777 6666',
      email: 'fatima@example.com',
      gender: 'أنثى',
      totalOrders: 3,
      lastOrder: '2024-01-10',
      notes: ''
    },
    {
      id: '3',
      name: 'خالد سعد المطيري',
      phone: '+965 5555 4444',
      email: '',
      gender: 'ذكر',
      totalOrders: 8,
      lastOrder: '2024-01-20',
      notes: 'يفضل التسليم صباحاً'
    }
  ];

  const mockPreviousOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'مكتمل',
      items: 2,
      total: '45.750',
      customerName: 'أحمد محمد الكندري',
      phone: '+965 9999 8888',
      createdAt: '2024-01-15',
      deliveryDate: '2024-01-20',
      qrCodes: ['QR001A', 'QR001B'],
      itemDetails: [
        { qrCode: 'QR001A', fabric: 'قماش قطني فاخر', cut: 'قصة كلاسيكية' },
        { qrCode: 'QR001B', fabric: 'قماش حريري', cut: 'قصة عصرية' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'جاري الإنتاج',
      items: 1,
      total: '28.500',
      customerName: 'أحمد محمد الكندري',
      phone: '+965 9999 8888',
      createdAt: '2024-01-10',
      deliveryDate: '2024-01-25',
      qrCodes: ['QR002A'],
      itemDetails: [
        { qrCode: 'QR002A', fabric: 'قماش كتان', cut: 'قصة فاخرة' }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'جديد',
      items: 3,
      total: '67.250',
      customerName: 'أحمد محمد الكندري',
      phone: '+965 9999 8888',
      createdAt: '2024-01-05',
      deliveryDate: '2024-01-30',
      qrCodes: ['QR003A', 'QR003B', 'QR003C'],
      itemDetails: [
        { qrCode: 'QR003A', fabric: 'قماش قطني فاخر', cut: 'قصة كلاسيكية' },
        { qrCode: 'QR003B', fabric: 'قماش حريري', cut: 'قصة عصرية' },
        { qrCode: 'QR003C', fabric: 'قماش كتان', cut: 'قصة فاخرة' }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExistingCustomer && selectedCustomer) {
      onNext(selectedCustomer);
    } else if (formData.name && formData.phone) {
      onNext(formData);
    }
  };

  const handleReorder = () => {
    console.log('Reorder:', selectedOrder, reorderData);
    setShowReorderModal(false);
    // Here you would typically create a new order based on the selected order
    alert(`تم إعادة طلب ${reorderData.pieces} قطع بتاريخ تسليم ${reorderData.deliveryDate}`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">بيانات العميل</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Type Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant={!isExistingCustomer ? "default" : "outline"}
              onClick={() => {
                setIsExistingCustomer(false);
                setSelectedCustomer(null);
              }}
              className="flex-1"
            >
              عميل جديد
            </Button>
            <Button
              type="button"
              variant={isExistingCustomer ? "default" : "outline"}
              onClick={() => setIsExistingCustomer(true)}
              className="flex-1"
            >
              عميل حالي
            </Button>
          </div>

          {/* New Customer Form */}
          {!isExistingCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-right block">الاسم *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="اسم العميل"
                    required
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-right block">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="رقم الهاتف"
                    required
                    className="text-right"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="البريد الإلكتروني (اختياري)"
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-right block">الجنس</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full p-2 border rounded-md text-right"
                  >
                    <option value="">اختر الجنس</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-right block">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="أي ملاحظات إضافية (اختياري)"
                  className="text-right"
                />
              </div>
            </div>
          )}

          {/* Existing Customer Selection */}
          {isExistingCustomer && (
            <div className="space-y-4">
              <div className="grid gap-3">
                {mockCustomers.map(customer => (
                  <Card 
                    key={customer.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCustomer?.id === customer.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{customer.name}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span>{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                                <Eye className="w-3 h-3 mr-1" />
                                عرض التفاصيل
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>تفاصيل العميل</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>الاسم:</strong> {customer.name}
                                  </div>
                                  <div>
                                    <strong>الهاتف:</strong> {customer.phone}
                                  </div>
                                  {customer.email && (
                                    <div>
                                      <strong>البريد:</strong> {customer.email}
                                    </div>
                                  )}
                                  {customer.gender && (
                                    <div>
                                      <strong>الجنس:</strong> {customer.gender}
                                    </div>
                                  )}
                                </div>
                                <div className="mt-4">
                                  <strong>إجمالي الطلبات:</strong> {customer.totalOrders}
                                </div>
                                <div>
                                  <strong>آخر طلب:</strong> {customer.lastOrder}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setShowPreviousOrders(true)}
                            className="flex-1 sm:flex-none"
                          >
                            <History className="w-3 h-3 mr-1" />
                            الطلبات السابقة
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isExistingCustomer ? !selectedCustomer : !formData.name || !formData.phone}
          >
            {isExistingCustomer ? 'متابعة مع العميل المحدد' : 'التالي - إضافة قطع الطلب'}
          </Button>
        </form>

        {/* Previous Orders Modal */}
        <Dialog open={showPreviousOrders} onOpenChange={setShowPreviousOrders}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>الطلبات السابقة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {mockPreviousOrders.map(order => (
                <Card key={order.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">#{order.id}</Badge>
                          <Badge className={
                            order.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                            order.status === 'جاري الإنتاج' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>التاريخ: {order.date}</div>
                          <div>القطع: {order.items}</div>
                          <div className="font-semibold">المبلغ: {order.total} د.ك</div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          تفاصيل الطلب
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowReorderModal(true);
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          إعادة الطلب
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder}
            isOpen={showOrderDetails}
            onClose={() => setShowOrderDetails(false)}
          />
        )}

        {/* Reorder Modal */}
        <Dialog open={showReorderModal} onOpenChange={setShowReorderModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إعادة الطلب</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">الطلب الأصلي: #{selectedOrder?.id}</p>
                <p className="text-sm text-gray-600">المبلغ الأصلي: {selectedOrder?.total} د.ك</p>
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
                <Label htmlFor="deliveryDate">تاريخ التسليم</Label>
                <Input
                  id="deliveryDate"
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
              
              <div className="flex gap-2">
                <Button onClick={handleReorder} className="flex-1">
                  إعادة الطلب
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowReorderModal(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
