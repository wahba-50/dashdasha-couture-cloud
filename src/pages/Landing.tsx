
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Scissors, Crown, Sparkles, User, Lock } from 'lucide-react';

const Landing = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // For demo purposes, navigate to workshop dashboard
      // In real implementation, you'd validate credentials and get workshop ID
      const workshopId = 'demo-workshop';
      navigate(`/workshop/${workshopId}/dashboard`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Crown className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 font-arabic">دشداشة كوتور كلاود</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <div className="mb-8">
              <div className="flex justify-center lg:justify-end mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl"></div>
                  <div className="relative bg-white rounded-full p-6 shadow-lg">
                    <Scissors className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-arabic leading-tight">
                نظام إدارة ورش
                <span className="text-blue-600 block">الدشاديش المتطور</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-arabic">
                حلول سحابية متكاملة لإدارة ورش تفصيل الدشاديش الكويتية بكفاءة وأناقة
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/60 rounded-lg p-4">
                <Sparkles className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div className="text-right">
                  <h3 className="font-semibold text-gray-900 font-arabic">إدارة الطلبات</h3>
                  <p className="text-gray-600 text-sm font-arabic">تتبع شامل لجميع الطلبات</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse bg-white/60 rounded-lg p-4">
                <User className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div className="text-right">
                  <h3 className="font-semibold text-gray-900 font-arabic">إدارة العملاء</h3>
                  <p className="text-gray-600 text-sm font-arabic">بيانات العملاء والمقاسات</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="order-1 lg:order-2">
            <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 font-arabic">
                  تسجيل الدخول
                </CardTitle>
                <CardDescription className="text-gray-600 font-arabic">
                  ادخل بيانات الورشة للوصول إلى النظام
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-right font-arabic">
                      اسم المستخدم أو رقم الورشة
                    </Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pr-10 text-right font-arabic"
                        placeholder="أدخل اسم المستخدم"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-right font-arabic">
                      كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pr-10 text-right font-arabic"
                        placeholder="أدخل كلمة المرور"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-arabic text-lg py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>جاري التحميل...</span>
                      </div>
                    ) : (
                      'دخول إلى النظام'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 font-arabic">
                    هل تحتاج مساعدة؟{' '}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      اتصل بالدعم
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-6 w-6 text-blue-400 ml-2" />
            <span className="text-lg font-semibold font-arabic">دشداشة كوتور كلاود</span>
          </div>
          <p className="text-gray-400 font-arabic">
            © 2024 جميع الحقوق محفوظة - نظام إدارة ورش الدشاديش
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
