
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft, Receipt, Download, Printer, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import CustomerForm from "@/components/CustomerForm";
import OrderForm from "@/components/OrderForm";

const NewOrder = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<any>({
    customer: null,
    items: [],
    discount: { type: 'amount', value: 0 },
    deliveryDate: '',
    notes: ''
  });

  const handleCustomerNext = (customerData: any) => {
    setOrderData({ ...orderData, customer: customerData });
    setCurrentStep(2);
  };

  const handleItemsNext = (items: any[]) => {
    setOrderData({ ...orderData, items });
    setCurrentStep(3);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateSubtotal = () => {
    return orderData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (orderData.discount.type === 'percentage') {
      return (subtotal * orderData.discount.value) / 100;
    }
    return orderData.discount.value;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const generateOrderNumber = () => {
    return `ORD-${Date.now().toString().slice(-6)}`;
  };

  const handleCreateOrder = () => {
    const orderNumber = generateOrderNumber();
    const order = {
      ...orderData,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'جديد',
      total: calculateTotal()
    };
    
    // Here you would typically save to database
    console.log('Order created:', order);
    
    // Show success and navigate back
    alert(`تم إنشاء الطلب بنجاح!\nرقم الطلب: ${orderNumber}`);
    navigate(-1);
  };

  const steps = [
    { number: 1, title: 'بيانات العميل', completed: currentStep > 1 },
    { number: 2, title: 'تفاصيل الطلب', completed: currentStep > 2 },
    { number: 3, title: 'ملخص والفاتورة', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title="إنشاء طلب جديد"
        subtitle={`الخطوة ${currentStep} من 3`}
        showBackButton={true}
      />

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center gap-4 min-w-max px-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step.number <= currentStep 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.number}
                  </div>
                  <div className={`mt-2 text-xs sm:text-sm text-center max-w-[100px] ${
                    step.number <= currentStep ? 'text-primary font-semibold' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    step.completed ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <CustomerForm onNext={handleCustomerNext} />
          )}

          {currentStep === 2 && (
            <OrderForm 
              customerData={orderData.customer}
              onNext={handleItemsNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    ملخص الطلب والفاتورة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">بيانات العميل</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">الاسم:</span>
                        <span className="font-medium mr-2">{orderData.customer?.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الهاتف:</span>
                        <span className="font-medium mr-2">{orderData.customer?.phone}</span>
                      </div>
                      {orderData.customer?.email && (
                        <div>
                          <span className="text-gray-600">البريد:</span>
                          <span className="font-medium mr-2">{orderData.customer.email}</span>
                        </div>
                      )}
                      {orderData.customer?.gender && (
                        <div>
                          <span className="text-gray-600">الجنس:</span>
                          <span className="font-medium mr-2">{orderData.customer.gender}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">تفاصيل القطع ({orderData.items.length})</h3>
                    <div className="space-y-3">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={item.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">قطعة #{index + 1}</span>
                            <span className="font-bold text-primary">{item.totalPrice.toFixed(3)} د.ك</span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>القماش: {item.fabricType === 'customer' ? 'قماش العميل' : item.fabric?.name}</div>
                            <div>القصة: {item.cut.name}</div>
                            {item.accessories.length > 0 && (
                              <div>الإكسسوارات: {item.accessories.map((acc: any) => `${acc.name} (${acc.quantity})`).join(', ')}</div>
                            )}
                            {item.labors.length > 0 && (
                              <div>المصنعيات: {item.labors.map((labor: any) => labor.name).join(', ')}</div>
                            )}
                            <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block">
                              QR: {item.qrCode}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Discount */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">الخصم وموعد التسليم</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="discountType">نوع الخصم</Label>
                        <select
                          id="discountType"
                          className="w-full mt-1 p-2 border rounded-md"
                          value={orderData.discount.type}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            discount: { ...orderData.discount, type: e.target.value }
                          })}
                        >
                          <option value="amount">مبلغ ثابت (د.ك)</option>
                          <option value="percentage">نسبة مئوية (%)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="discountValue">قيمة الخصم</Label>
                        <Input
                          id="discountValue"
                          type="number"
                          min="0"
                          step={orderData.discount.type === 'percentage' ? '1' : '0.001'}
                          max={orderData.discount.type === 'percentage' ? '100' : undefined}
                          value={orderData.discount.value}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            discount: { ...orderData.discount, value: parseFloat(e.target.value) || 0 }
                          })}
                          placeholder={orderData.discount.type === 'percentage' ? '0-100' : '0.000'}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="deliveryDate">موعد التسليم المتوقع</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={orderData.deliveryDate}
                        onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                        className="mt-1"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="notes">ملاحظات إضافية</Label>
                      <textarea
                        id="notes"
                        className="w-full mt-1 p-2 border rounded-md"
                        rows={3}
                        value={orderData.notes}
                        onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                        placeholder="أي ملاحظات خاصة بالطلب..."
                      />
                    </div>
                  </div>

                  {/* Final Invoice */}
                  <div className="bg-white border-2 border-primary rounded-lg p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">نظام إدارة ورش الدشاديش</h2>
                      <p className="text-gray-600">ورشة النموذج - الكويت</p>
                      <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-KW')}</p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span>المجموع الفرعي:</span>
                        <span>{calculateSubtotal().toFixed(3)} د.ك</span>
                      </div>
                      
                      {orderData.discount.value > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>
                            الخصم ({orderData.discount.type === 'percentage' ? `${orderData.discount.value}%` : 'مبلغ ثابت'}):
                          </span>
                          <span>-{calculateDiscount().toFixed(3)} د.ك</span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between text-xl font-bold text-primary">
                        <span>المجموع النهائي:</span>
                        <span>{calculateTotal().toFixed(3)} د.ك</span>
                      </div>
                      
                      {orderData.deliveryDate && (
                        <div className="text-center mt-4 p-3 bg-amber-50 rounded-lg">
                          <span className="text-amber-800">
                            موعد التسليم المتوقع: {new Date(orderData.deliveryDate).toLocaleDateString('ar-KW')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleCreateOrder} className="flex-1" size="lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      إنشاء الطلب والفاتورة
                    </Button>
                    <Button variant="outline" size="lg" className="sm:w-auto">
                      <Printer className="w-4 h-4 mr-2" />
                      طباعة الفاتورة
                    </Button>
                    <Button variant="outline" size="lg" className="sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      تحميل PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              <span>{t('common.previous')}</span>
            </Button>
            
            {currentStep === 1 && (
              <div className="text-center text-sm text-gray-600 order-1 sm:order-2">
                املأ بيانات العميل للمتابعة
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex justify-start mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="w-full sm:w-auto"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              تعديل القطع
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
