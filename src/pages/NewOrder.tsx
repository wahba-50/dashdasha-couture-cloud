
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SystemHeader from "@/components/SystemHeader";
import CustomerForm from "@/components/CustomerForm";

const NewOrder = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    customer: null,
    items: [],
    total: 0,
    discount: 0,
    deliveryDate: ''
  });

  const handleCustomerNext = (customerData: any) => {
    setOrderData({ ...orderData, customer: customerData });
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: 'بيانات العميل', completed: currentStep > 1 },
    { number: 2, title: 'تفاصيل الطلب', completed: currentStep > 2 },
    { number: 3, title: 'ملخص وإنشاء', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      <SystemHeader
        title="إنشاء طلب جديد"
        subtitle={`الخطوة ${currentStep} من 3`}
        showBackButton={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center gap-4 min-w-max px-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step.number <= currentStep 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <div className={`mt-2 text-xs sm:text-sm text-center max-w-[80px] ${
                    step.number <= currentStep ? 'text-primary font-semibold' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-0.5 mx-2 ${
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
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 mb-4">
                    إنشاء القطع وتحديد الأقمشة والقصات
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <Button className="w-full" size="lg">
                      إضافة قطعة جديدة
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        أقمشة الورشة
                      </Button>
                      <Button variant="outline" className="w-full">
                        قماش العميل
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-600 mb-4">
                      مراجعة تفاصيل الطلب والفاتورة
                    </p>
                    <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
                      <div className="space-y-3 text-right">
                        <div className="flex justify-between">
                          <span>المجموع الفرعي:</span>
                          <span>45.500 د.ك</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الخصم:</span>
                          <span>-2.000 د.ك</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-bold text-lg">
                          <span>المجموع النهائي:</span>
                          <span>43.500 د.ك</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                      إنشاء الطلب والفاتورة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
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
          
          {currentStep < 3 && (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !orderData.customer}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <span>{t('common.next')}</span>
              <ArrowLeft className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
