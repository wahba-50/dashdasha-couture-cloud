import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Receipt, Share, Printer, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import CustomerForm from "@/components/CustomerForm";
import OrderForm from "@/components/OrderForm";

const NewOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workshopId = searchParams.get('workshopId');
  const isRepeated = searchParams.get('repeated') === 'true';
  const { t } = useLanguage();
  
  // Don't clear sessionStorage immediately - let useEffect handle it
  const getInitialOrderData = () => {
    console.log('getInitialOrderData - isRepeated:', isRepeated);
    if (isRepeated) {
      const repeatedData = sessionStorage.getItem('repeatedOrderData');
      console.log('repeatedData from sessionStorage:', repeatedData);
      if (repeatedData) {
        try {
          const parsedData = JSON.parse(repeatedData);
          console.log('parsedData:', parsedData);
          // Don't clear sessionStorage yet - let useEffect handle it
          return parsedData;
        } catch (error) {
          console.error('Error parsing repeated order data:', error);
        }
      } else {
        console.log('No repeated data found in sessionStorage');
      }
    }
    
    console.log('Returning default order data');
    return {
      customer: null,
      items: [],
      discount: { type: 'amount', value: 0 },
      deliveryDate: '',
      notes: '',
      payment: {
        type: 'cash',
        receivedAmount: 0,
        remainingAmount: 0
      }
    };
  };

  const initialOrderData = getInitialOrderData();
  const initialStep = isRepeated && initialOrderData.items && initialOrderData.items.length > 0 ? 2 : 1;

  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    customer: null,
    items: [],
    discount: { type: 'amount', value: 0 },
    deliveryDate: '',
    notes: '',
    payment: {
      type: 'cash',
      receivedAmount: 0,
      remainingAmount: 0
    }
  });

  // Use useEffect to ensure proper initialization for repeated orders
  useEffect(() => {
    console.log('=== useEffect RUNNING ===');
    console.log('useEffect triggered - isRepeated:', isRepeated);
    console.log('useEffect triggered - currentStep:', currentStep);
    console.log('useEffect triggered - orderData.items.length:', orderData.items?.length);
    
    if (isRepeated) {
      const repeatedData = sessionStorage.getItem('repeatedOrderData');
      console.log('useEffect - repeatedData exists:', !!repeatedData);
      
      if (repeatedData) {
        try {
          const parsedData = JSON.parse(repeatedData);
          console.log('useEffect - parsedData:', parsedData);
          console.log('useEffect - parsedData.items.length:', parsedData.items?.length);
          
          if (parsedData.items && parsedData.items.length > 0 && currentStep !== 2) {
            console.log('useEffect - About to set order data and step');
            
            // Force state updates
            setOrderData(parsedData);
            setCurrentStep(2);
            
            console.log('useEffect - State updates called');
            
            // Clear sessionStorage after successful initialization
            sessionStorage.removeItem('repeatedOrderData');
            console.log('useEffect - SessionStorage cleared');
          } else {
            console.log('useEffect - Conditions not met:', {
              hasItems: parsedData.items?.length > 0,
              currentStepNot2: currentStep !== 2
            });
          }
        } catch (error) {
          console.error('useEffect - Error parsing repeated order data:', error);
        }
      } else {
        console.log('useEffect - No repeated data in sessionStorage');
      }
    } else {
      console.log('useEffect - Not a repeated order');
    }
  }); // Remove dependency array to force it to run every render

  console.log('NewOrder render - currentStep:', currentStep, 'isRepeated:', isRepeated);
  console.log('NewOrder render - orderData.items.length:', orderData.items?.length);

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

  const calculateRemainingAmount = () => {
    const total = calculateTotal();
    return Math.max(0, total - orderData.payment.receivedAmount);
  };

  const generateOrderNumber = () => {
    return `ORD-${Date.now().toString().slice(-6)}`;
  };

  const handlePaymentAmountChange = (amount: number) => {
    const total = calculateTotal();
    const remaining = Math.max(0, total - amount);
    setOrderData({
      ...orderData,
      payment: {
        ...orderData.payment,
        receivedAmount: amount,
        remainingAmount: remaining
      }
    });
  };

  const generateInvoiceHTML = () => {
    const orderNumber = generateOrderNumber();
    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>فاتورة - ${orderNumber}</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            margin: 0; 
            padding: 20px; 
            direction: rtl; 
            background: white;
            font-size: 14px;
            line-height: 1.6;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 2px solid #2563eb;
            border-radius: 10px;
            overflow: hidden;
          }
          .invoice-header { 
            text-align: center; 
            background: #2563eb;
            color: white;
            padding: 20px;
            margin-bottom: 0;
          }
          .invoice-header h1 { 
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: bold;
          }
          .invoice-header p { 
            margin: 5px 0;
            opacity: 0.9;
          }
          .invoice-body {
            padding: 30px;
          }
          .section {
            margin-bottom: 25px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .section-header {
            background: #f8f9fa;
            padding: 12px 15px;
            border-bottom: 1px solid #e5e7eb;
            font-weight: bold;
            color: #374151;
          }
          .section-content {
            padding: 15px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dotted #d1d5db;
          }
          .info-item:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #6b7280;
          }
          .info-value {
            font-weight: bold;
            color: #111827;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 0;
          }
          th, td { 
            padding: 12px; 
            text-align: right; 
            border-bottom: 1px solid #e5e7eb;
          }
          th { 
            background-color: #f8f9fa; 
            font-weight: bold;
            color: #374151;
          }
          .totals-section {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dotted #d1d5db;
          }
          .total-row:last-child {
            border-bottom: none;
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
            border-top: 2px solid #2563eb;
            padding-top: 15px;
            margin-top: 10px;
          }
          .payment-section {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 2px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .payment-header {
            font-size: 16px;
            font-weight: bold;
            color: #065f46;
            margin-bottom: 15px;
            text-align: center;
          }
          .delivery-notice {
            text-align: center;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-weight: bold;
            color: #92400e;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
            font-style: italic;
          }
          .qr-codes {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }
          .qr-code {
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 4px 8px;
            font-family: monospace;
            font-size: 12px;
          }
          @media print { 
            body { margin: 0; padding: 10px; }
            .invoice-container { border: none; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <h1>نظام إدارة ورش الدشاديش</h1>
            <p>ورشة النموذج - الكويت</p>
            <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
            <p>رقم الطلب: ${orderNumber}</p>
          </div>
          
          <div class="invoice-body">
            <div class="section">
              <div class="section-header">بيانات العميل</div>
              <div class="section-content">
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">الاسم:</span>
                    <span class="info-value">${orderData.customer?.name || ''}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">الهاتف:</span>
                    <span class="info-value">${orderData.customer?.phone || ''}</span>
                  </div>
                  ${orderData.customer?.email ? `
                  <div class="info-item">
                    <span class="info-label">البريد الإلكتروني:</span>
                    <span class="info-value">${orderData.customer.email}</span>
                  </div>
                  ` : ''}
                  ${orderData.customer?.gender ? `
                  <div class="info-item">
                    <span class="info-label">الجنس:</span>
                    <span class="info-value">${orderData.customer.gender}</span>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-header">تفاصيل القطع (${orderData.items.length})</div>
              <div class="section-content">
                <table>
                  <thead>
                    <tr>
                      <th>القطعة</th>
                      <th>نوع القماش</th>
                      <th>نوع القصة</th>
                      <th>الإكسسوارات</th>
                      <th>السعر</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderData.items.map((item: any, index: number) => `
                      <tr>
                        <td>قطعة #${index + 1}</td>
                        <td>${item.fabricType === 'customer' ? 'قماش العميل' : item.fabric?.name || ''}</td>
                        <td>${item.cut?.name || ''}</td>
                        <td>${item.accessories?.map((acc: any) => `${acc.name} (${acc.quantity})`).join(', ') || 'لا يوجد'}</td>
                        <td>${item.totalPrice?.toFixed(3) || '0.000'} د.ك</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                
                <div style="margin-top: 15px;">
                  <strong>أكواد QR للقطع:</strong>
                  <div class="qr-codes">
                    ${orderData.items.map((item: any) => `<span class="qr-code">${item.qrCode}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="totals-section">
              <div class="total-row">
                <span>المجموع الفرعي:</span>
                <span>${calculateSubtotal().toFixed(3)} د.ك</span>
              </div>
              ${orderData.discount.value > 0 ? `
              <div class="total-row" style="color: #dc2626;">
                <span>الخصم (${orderData.discount.type === 'percentage' ? `${orderData.discount.value}%` : 'مبلغ ثابت'}):</span>
                <span>-${calculateDiscount().toFixed(3)} د.ك</span>
              </div>
              ` : ''}
              <div class="total-row">
                <span>المجموع النهائي:</span>
                <span>${calculateTotal().toFixed(3)} د.ك</span>
              </div>
            </div>

            <div class="payment-section">
              <div class="payment-header">تفاصيل الدفع</div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">نوع الدفع:</span>
                  <span class="info-value">${orderData.payment.type === 'cash' ? 'نقدي' : 'إلكتروني'}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">المبلغ الإجمالي:</span>
                  <span class="info-value">${calculateTotal().toFixed(3)} د.ك</span>
                </div>
                <div class="info-item">
                  <span class="info-label">المبلغ المستلم:</span>
                  <span class="info-value">${orderData.payment.receivedAmount.toFixed(3)} د.ك</span>
                </div>
                <div class="info-item">
                  <span class="info-label">المبلغ المتبقي:</span>
                  <span class="info-value" style="color: ${calculateRemainingAmount() > 0 ? '#dc2626' : '#16a34a'};">
                    ${calculateRemainingAmount().toFixed(3)} د.ك
                  </span>
                </div>
              </div>
            </div>
            
            ${orderData.deliveryDate ? `
            <div class="delivery-notice">
              موعد التسليم المتوقع: ${new Date(orderData.deliveryDate).toLocaleDateString('ar-KW')}
            </div>
            ` : ''}
            
            ${orderData.notes ? `
            <div class="section">
              <div class="section-header">ملاحظات إضافية</div>
              <div class="section-content">
                <p>${orderData.notes}</p>
              </div>
            </div>
            ` : ''}
            
            <div class="footer">
              شكراً لثقتكم بنا - نظام إدارة ورش الدشاديش
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleShare = async () => {
    try {
      const invoiceHTML = generateInvoiceHTML();
      const blob = new Blob([invoiceHTML], { type: 'text/html;charset=utf-8' });
      const orderNumber = generateOrderNumber();
      
      // Create a temporary link for the HTML file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${orderNumber}.html`;
      
      // For mobile sharing
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
        try {
          // Create a File object for sharing
          const file = new File([invoiceHTML], `invoice-${orderNumber}.html`, { type: 'text/html' });
          
          await navigator.share({
            title: `فاتورة طلب رقم ${orderNumber}`,
            text: `فاتورة طلب - العميل: ${orderData.customer?.name} - المجموع: ${calculateTotal().toFixed(3)} د.ك`,
            files: [file]
          });
        } catch (shareError) {
          console.log('Native share failed, using fallback:', shareError);
          fallbackShare();
        }
      } else {
        // For desktop - download the HTML file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('تم تحميل ملف الفاتورة بصيغة HTML. يمكنك فتحه في المتصفح وطباعته كـ PDF.');
      }
    } catch (error) {
      console.error('Error sharing invoice:', error);
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const orderNumber = generateOrderNumber();
    const shareText = `فاتورة طلب رقم ${orderNumber}\nالعميل: ${orderData.customer?.name}\nالمجموع: ${calculateTotal().toFixed(3)} د.ك\nنوع الدفع: ${orderData.payment.type === 'cash' ? 'نقدي' : 'إلكتروني'}\nالمبلغ المستلم: ${orderData.payment.receivedAmount.toFixed(3)} د.ك\nالمبلغ المتبقي: ${calculateRemainingAmount().toFixed(3)} د.ك`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('تم نسخ تفاصيل الفاتورة إلى الحافظة');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('تم نسخ تفاصيل الفاتورة إلى الحافظة');
    }
  };

  const handlePrint = () => {
    const invoiceHTML = generateInvoiceHTML();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    } else {
      alert('يرجى السماح للنوافذ المنبثقة لعرض الفاتورة');
    }
  };

  const handleCreateOrder = () => {
    const orderNumber = generateOrderNumber();
    const order = {
      id: orderNumber,
      customerName: orderData.customer.name,
      phone: orderData.customer.phone,
      items: orderData.items.length,
      total: calculateTotal(),
      status: 'جديد',
      deliveryDate: orderData.deliveryDate,
      createdAt: new Date().toISOString().split('T')[0],
      qrCodes: orderData.items.map((item: any) => item.qrCode),
      cutter: null,
      customerMeasurements: orderData.customer.measurements || {},
      itemDetails: orderData.items.map((item: any, index: number) => ({
        qrCode: item.qrCode,
        fabric: item.fabricType === 'customer' ? 'قماش العميل' : item.fabric?.name,
        cut: item.cut?.name
      })),
      workshopId: workshopId,
      discount: orderData.discount,
      notes: orderData.notes,
      payment: {
        type: orderData.payment.type,
        receivedAmount: orderData.payment.receivedAmount,
        remainingAmount: calculateRemainingAmount()
      },
      fullOrderData: orderData
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('workshopOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('workshopOrders', JSON.stringify(existingOrders));
    
    console.log('Order created and saved:', order);
    
    alert(`تم إنشاء الطلب بنجاح!\nرقم الطلب: ${orderNumber}`);
    
    if (workshopId) {
      navigate(`/workshop/${workshopId}/dashboard`);
    } else {
      navigate(-1);
    }
  };

  const handleBackToWorkshop = () => {
    if (workshopId) {
      navigate(`/workshop/${workshopId}/dashboard`);
    } else {
      navigate(-1);
    }
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
        onBackClick={handleBackToWorkshop}
      />

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center gap-4 min-w-max px-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
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
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <CustomerForm onNext={handleCustomerNext} workshopId={workshopId} />
          )}

          {currentStep === 2 && (
            <OrderForm 
              customerData={orderData.customer}
              initialItems={orderData.items || []}
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
                            <div>القماش: {item.fabricType === 'customer' ? `قماش العميل${item.fabric?.specifications ? ` - ${item.fabric.specifications}` : ''}` : item.fabric?.name}</div>
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

                  {/* Payment Section */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">تفاصيل الدفع</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>نوع الدفع</Label>
                        <RadioGroup
                          value={orderData.payment.type}
                          onValueChange={(value) => setOrderData({
                            ...orderData,
                            payment: { ...orderData.payment, type: value }
                          })}
                          className="flex gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">نقدي</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online">إلكتروني</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="receivedAmount">المبلغ المستلم</Label>
                          <Input
                            id="receivedAmount"
                            type="number"
                            min="0"
                            step="0.001"
                            max={calculateTotal()}
                            value={orderData.payment.receivedAmount}
                            onChange={(e) => handlePaymentAmountChange(parseFloat(e.target.value) || 0)}
                            placeholder="0.000"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>المبلغ الإجمالي</Label>
                          <div className="mt-1 p-2 bg-gray-100 rounded-md text-center font-semibold">
                            {calculateTotal().toFixed(3)} د.ك
                          </div>
                        </div>
                        <div>
                          <Label>المبلغ المتبقي</Label>
                          <div className={`mt-1 p-2 rounded-md text-center font-semibold ${
                            calculateRemainingAmount() > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {calculateRemainingAmount().toFixed(3)} د.ك
                          </div>
                        </div>
                      </div>
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

                      {/* Payment Details in Invoice */}
                      <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">تفاصيل الدفع</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>نوع الدفع:</span>
                            <span className="font-medium">{orderData.payment.type === 'cash' ? 'نقدي' : 'إلكتروني'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>المبلغ المستلم:</span>
                            <span className="font-medium">{orderData.payment.receivedAmount.toFixed(3)} د.ك</span>
                          </div>
                          <div className="flex justify-between">
                            <span>المبلغ المتبقي:</span>
                            <span className={`font-medium ${
                              calculateRemainingAmount() > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {calculateRemainingAmount().toFixed(3)} د.ك
                            </span>
                          </div>
                        </div>
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
                    <Button variant="outline" size="lg" className="sm:w-auto" onClick={handlePrint}>
                      <Printer className="w-4 h-4 mr-2" />
                      طباعة الفاتورة
                    </Button>
                    <Button variant="outline" size="lg" className="sm:w-auto" onClick={handleShare}>
                      <Share className="w-4 h-4 mr-2" />
                      مشاركة الفاتورة
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
