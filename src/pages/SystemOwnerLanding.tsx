import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Crown, Shield, Database, Users, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const SystemOwnerLanding = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, dir, language } = useLanguage();

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
      navigate('/system');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" dir={dir}>
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Crown className="h-8 w-8 text-amber-400" />
                <h1 className="text-2xl font-bold text-white">{t('system.name')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className={`text-center ${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'} order-2 lg:order-1`}>
            <div className="mb-8">
              <div className={`flex ${dir === 'rtl' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'} mb-6`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                    <Shield className="h-16 w-16 text-amber-400" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('system.subtitle')}
                <span className="text-amber-400 block">{t('system.owner.login')}</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('system.description')}
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className={`flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20`}>
                <Database className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className="font-semibold text-white">{t('dashboard.workshops')}</h3>
                  <p className="text-gray-300 text-sm">{t('workshop.details')}</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20`}>
                <Users className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className="font-semibold text-white">{t('dashboard.customers')}</h3>
                  <p className="text-gray-300 text-sm">{t('customer.measurements')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="order-1 lg:order-2">
            <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-full p-3">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {t('system.owner.login')}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t('system.subtitle')}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'ur' ? 'ای میل' : language === 'hi' ? 'ईमेल' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Mail className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-gray-400`} />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'}`}
                        placeholder={language === 'ar' ? 'البريد الإلكتروني' : language === 'ur' ? 'ای میل' : language === 'hi' ? 'ईमेल' : 'Email'}
                        dir={dir}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {t('auth.password')}
                    </Label>
                    <div className="relative">
                      <Lock className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-gray-400`} />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'}`}
                        placeholder={t('auth.password')}
                        dir={dir}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{t('auth.loading')}</span>
                      </div>
                    ) : (
                      t('auth.login')
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {t('auth.help')}{' '}
                    <button className="text-amber-600 hover:text-amber-800 font-medium">
                      {t('auth.support')}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm text-white py-8 mt-16 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className={`h-6 w-6 text-amber-400 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-lg font-semibold">{t('system.name')}</span>
          </div>
          <p className="text-gray-400">
            {t('system.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SystemOwnerLanding;
