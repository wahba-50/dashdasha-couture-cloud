import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Crown } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">نظام التفصيل الذكي</h1>
              <p className="text-sm text-gray-600">اختر نوع الدخول للنظام</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            مرحباً بك في نظام التفصيل الذكي
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            منصة شاملة لإدارة ورش التفصيل والطلبات. اختر نوع المستخدم للدخول إلى النظام
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* SaaS Owner Card */}
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">مالك النظام</CardTitle>
              <p className="text-gray-600 mt-2">
                إدارة شاملة للنظام والورش والعملاء
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>إدارة جميع الورش</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>متابعة الطلبات والعملاء</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>تقارير شاملة وإحصائيات</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>إدارة الخدمات الخارجية</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/system')}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
              >
                دخول كمالك النظام
              </Button>
            </CardContent>
          </Card>

          {/* Workshop Admin Card */}
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-amber-500/50">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">مدير الورشة</CardTitle>
              <p className="text-gray-600 mt-2">
                إدارة ورشتك وطلباتك وعملائك
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>إدارة طلبات الورشة</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>متابعة العملاء والقياسات</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>إدارة المنتجات والأقمشة</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>تقارير الورشة والمبيعات</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/landing')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg font-semibold"
              >
                دخول كمدير ورشة
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2024 نظام التفصيل الذكي - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default Index;