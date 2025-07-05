import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'ur' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // System branding
    'system.name': 'دشداشة كلاود',
    'system.title': 'نظام إدارة ورش الدشاديش',
    'system.subtitle': 'لوحة تحكم مالك النظام',
    'system.owner.login': 'تسجيل دخول مالك النظام',
    'system.workshop.login': 'تسجيل دخول الورشة',
    'system.description': 'حلول سحابية متكاملة لإدارة ورش تفصيل الدشاديش الكويتية بكفاءة وأناقة',
    'system.copyright': '© 2025 جميع الحقوق محفوظة - نظام إدارة ورش الدشاديش',
    
    // Dashboard
    'dashboard.workshops': 'الورش',
    'dashboard.customers': 'العملاء',
    'dashboard.orders': 'الطلبات',
    'dashboard.externalServices': 'الخدمات الخارجية',
    'workshop.add': 'إضافة ورشة جديدة',
    'workshop.name': 'اسم الورشة',
    'workshop.type': 'نوع الخدمة',
    'workshop.address': 'العنوان',
    'workshop.status': 'الحالة',
    'workshop.users': 'المستخدمين',
    'workshop.enter': 'دخول الورشة',
    'workshop.details': 'عرض التفاصيل',
    'workshop.active': 'نشط',
    'workshop.inactive': 'غير نشط',
    'workshop.type.male': 'رجالي',
    'workshop.type.female': 'حريمي',
    'workshop.type.both': 'حريمي ورجالي',
    
    // Order Management
    'order.new': 'طلب جديد',
    'order.number': 'رقم الطلب',
    'order.customer': 'العميل',
    'order.status.new': 'جديد',
    'order.status.production': 'جاري الإنتاج',
    'order.status.completed': 'مكتمل',
    'order.delivery': 'موعد التسليم',
    'order.total': 'المجموع',
    'order.items': 'القطع',
    'order.startProduction': 'بدء الإنتاج',
    'order.endProduction': 'انتهاء الإنتاج',
    'order.viewDetails': 'عرض التفاصيل',
    
    // Customer Management
    'customer.new': 'عميل جديد',
    'customer.existing': 'عميل حالي',
    'customer.name': 'اسم العميل',
    'customer.phone': 'رقم الهاتف',
    'customer.email': 'البريد الإلكتروني',
    'customer.gender': 'الجنس',
    'customer.age': 'العمر',
    'customer.address': 'العنوان',
    'customer.country': 'الدولة',
    'customer.state': 'المحافظة',
    'customer.area': 'المنطقة',
    'customer.street': 'الشارع',
    'customer.house': 'رقم المنزل',
    'customer.measurements': 'القياسات',
    'customer.search': 'البحث عن العميل',
    'customer.orders.previous': 'الطلبات السابقة',
    
    // Measurements
    'measurement.chest': 'الصدر',
    'measurement.waist': 'الوسط',
    'measurement.shoulder': 'الكتف',
    'measurement.neck': 'الرقبة',
    'measurement.length': 'الطول',
    'measurement.sleeve': 'الكم',
    
    // Auth
    'auth.username': 'اسم المستخدم أو رقم الورشة',
    'auth.password': 'كلمة المرور',
    'auth.login': 'دخول إلى النظام',
    'auth.loading': 'جاري التحميل...',
    'auth.help': 'هل تحتاج مساعدة؟',
    'auth.support': 'اتصل بالدعم',
    'auth.loginTitle': 'تسجيل الدخول',
    'auth.loginDescription': 'ادخل بيانات الورشة للوصول إلى النظام',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.search': 'بحث',
    'common.add': 'إضافة',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.print': 'طباعة',
    'common.create': 'إنشاء',
    'common.update': 'تحديث',
    'common.required': 'مطلوب',
    'common.optional': 'اختياري',
    'common.male': 'ذكر',
    'common.female': 'أنثى',
    'common.currency': 'د.ك',
    
    // Navigation
    'nav.dashboard': 'الرئيسية',
    'nav.orders': 'الطلبات',
    'nav.customers': 'العملاء',
    'nav.products': 'المنتجات',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',
  },
  en: {
    // System branding
    'system.name': 'Dshdasha Cloud',
    'system.title': 'Dshdasha Workshop Management System',
    'system.subtitle': 'System Owner Dashboard',
    'system.owner.login': 'System Owner Login',
    'system.workshop.login': 'Workshop Login',
    'system.description': 'Comprehensive cloud solutions for managing Kuwaiti dshdasha tailoring workshops with efficiency and elegance',
    'system.copyright': '© 2025 All Rights Reserved - Dshdasha Workshop Management System',
    
    // Dashboard
    'dashboard.workshops': 'Workshops',
    'dashboard.customers': 'Customers',
    'dashboard.orders': 'Orders',
    'dashboard.externalServices': 'External Services',
    'workshop.add': 'Add New Workshop',
    'workshop.name': 'Workshop Name',
    'workshop.type': 'Service Type',
    'workshop.address': 'Address',
    'workshop.status': 'Status',
    'workshop.users': 'Users',
    'workshop.enter': 'Enter Workshop',
    'workshop.details': 'View Details',
    'workshop.active': 'Active',
    'workshop.inactive': 'Inactive',
    'workshop.type.male': 'Male',
    'workshop.type.female': 'Female',
    'workshop.type.both': 'Male & Female',
    
    // Order Management
    'order.new': 'New Order',
    'order.number': 'Order Number',
    'order.customer': 'Customer',
    'order.status.new': 'New',
    'order.status.production': 'In Production',
    'order.status.completed': 'Completed',
    'order.delivery': 'Delivery Date',
    'order.total': 'Total',
    'order.items': 'Items',
    'order.startProduction': 'Start Production',
    'order.endProduction': 'End Production',
    'order.viewDetails': 'View Details',
    
    // Customer Management
    'customer.new': 'New Customer',
    'customer.existing': 'Existing Customer',
    'customer.name': 'Customer Name',
    'customer.phone': 'Phone Number',
    'customer.email': 'Email',
    'customer.gender': 'Gender',
    'customer.age': 'Age',
    'customer.address': 'Address',
    'customer.country': 'Country',
    'customer.state': 'State',
    'customer.area': 'Area',
    'customer.street': 'Street',
    'customer.house': 'House Number',
    'customer.measurements': 'Measurements',
    'customer.search': 'Search Customer',
    'customer.orders.previous': 'Previous Orders',
    
    // Measurements
    'measurement.chest': 'Chest',
    'measurement.waist': 'Waist',
    'measurement.shoulder': 'Shoulder',
    'measurement.neck': 'Neck',
    'measurement.length': 'Length',
    'measurement.sleeve': 'Sleeve',
    
    // Auth
    'auth.username': 'Username or Workshop ID',
    'auth.password': 'Password',
    'auth.login': 'Login to System',
    'auth.loading': 'Loading...',
    'auth.help': 'Need help?',
    'auth.support': 'Contact Support',
    'auth.loginTitle': 'Login',
    'auth.loginDescription': 'Enter workshop credentials to access the system',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.print': 'Print',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.male': 'Male',
    'common.female': 'Female',
    'common.currency': 'KWD',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.orders': 'Orders',
    'nav.customers': 'Customers',
    'nav.products': 'Products',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
  },
  ur: {
    // System branding
    'system.name': 'دشداشہ کلاؤڈ',
    'system.title': 'دشداشہ ورکشاپ منیجمنٹ سسٹم',
    'system.subtitle': 'سسٹم مالک ڈیش بورڈ',
    'system.owner.login': 'سسٹم مالک لاگ ان',
    'system.workshop.login': 'ورکشاپ لاگ ان',
    'system.description': 'کویتی دشداشہ ٹیلرنگ ورکشاپس کے لیے جامع کلاؤڈ حل',
    'system.copyright': '© 2025 تمام حقوق محفوظ ہیں - دشداشہ ورکشاپ منیجمنٹ سسٹم',
    
    // Dashboard
    'dashboard.workshops': 'ورکشاپس',
    'dashboard.customers': 'گاہک',
    'dashboard.orders': 'آرڈرز',
    'dashboard.externalServices': 'بیرونی خدمات',
    'workshop.add': 'نیا ورکشاپ شامل کریں',
    'workshop.name': 'ورکشاپ کا نام',
    'workshop.type': 'سروس کی قسم',
    'workshop.address': 'پتہ',
    'workshop.status': 'حالت',
    'workshop.users': 'صارفین',
    'workshop.enter': 'ورکشاپ میں داخل ہوں',
    'workshop.details': 'تفصیلات دیکھیں',
    'workshop.active': 'فعال',
    'workshop.inactive': 'غیر فعال',
    'workshop.type.male': 'مردانہ',
    'workshop.type.female': 'خواتین',
    'workshop.type.both': 'مردانہ اور خواتین',
    
    // Order Management
    'order.new': 'نیا آرڈر',
    'order.number': 'آرڈر نمبر',
    'order.customer': 'گاہک',
    'order.status.new': 'نیا',
    'order.status.production': 'تیاری میں',
    'order.status.completed': 'مکمل',
    'order.delivery': 'ڈیلیوری کی تاریخ',
    'order.total': 'کل',
    'order.items': 'اشیاء',
    'order.startProduction': 'پروڈکشن شروع کریں',
    'order.endProduction': 'پروڈکشن ختم کریں',
    'order.viewDetails': 'تفصیلات دیکھیں',
    
    // Customer Management
    'customer.new': 'نیا گاہک',
    'customer.existing': 'موجودہ گاہک',
    'customer.name': 'گاہک کا نام',
    'customer.phone': 'فون نمبر',
    'customer.email': 'ای میل',
    'customer.gender': 'جنس',
    'customer.age': 'عمر',
    'customer.address': 'پتہ',
    'customer.country': 'ملک',
    'customer.state': 'ریاست',
    'customer.area': 'علاقہ',
    'customer.street': 'گلی',
    'customer.house': 'گھر نمبر',
    'customer.measurements': 'پیمائش',
    'customer.search': 'گاہک تلاش کریں',
    'customer.orders.previous': 'پچھلے آرڈرز',
    
    // Measurements
    'measurement.chest': 'چھاتی',
    'measurement.waist': 'کمر',
    'measurement.shoulder': 'کندھا',
    'measurement.neck': 'گردن',
    'measurement.length': 'لمبائی',
    'measurement.sleeve': 'آستین',
    
    // Auth
    'auth.username': 'صارف نام یا ورکشاپ آئی ڈی',
    'auth.password': 'پاس ورڈ',
    'auth.login': 'سسٹم میں لاگ ان',
    'auth.loading': 'لوڈ ہو رہا ہے...',
    'auth.help': 'مدد چاہیے؟',
    'auth.support': 'سپورٹ سے رابطہ کریں',
    'auth.loginTitle': 'لاگ ان',
    'auth.loginDescription': 'سسٹم تک رسائی کے لیے ورکشاپ کی تفصیلات درج کریں',
    
    // Common
    'common.save': 'محفوظ کریں',
    'common.cancel': 'منسوخ کریں',
    'common.next': 'اگلا',
    'common.previous': 'پچھلا',
    'common.search': 'تلاش',
    'common.add': 'شامل کریں',
    'common.edit': 'تبدیل کریں',
    'common.delete': 'حذف کریں',
    'common.view': 'دیکھیں',
    'common.print': 'پرنٹ کریں',
    'common.create': 'بنائیں',
    'common.update': 'اپ ڈیٹ کریں',
    'common.required': 'ضروری',
    'common.optional': 'اختیاری',
    'common.male': 'مرد',
    'common.female': 'عورت',
    'common.currency': 'KWD',
    
    // Navigation
    'nav.dashboard': 'ڈیش بورڈ',
    'nav.orders': 'آرڈرز',
    'nav.customers': 'گاہک',
    'nav.products': 'پروڈکٹس',
    'nav.reports': 'رپورٹس',
    'nav.settings': 'سیٹنگز',
  },
  hi: {
    // System branding
    'system.name': 'दशदाशा क्लाउड',
    'system.title': 'दशदाशा वर्कशॉप प्रबंधन सिस्टम',
    'system.subtitle': 'सिस्टम मालिक डैशबोर्ड',
    'system.owner.login': 'सिस्टम मालिक लॉगिन',
    'system.workshop.login': 'वर्कशॉप लॉगिन',
    'system.description': 'कुवैती दशदाशा टेलरिंग वर्कशॉप के लिए व्यापक क्लाउड समाधान',
    'system.copyright': '© 2025 सभी अधिकार सुरक्षित - दशदाशा वर्कशॉप प्रबंधन सिस्टम',
    
    // Dashboard
    'dashboard.workshops': 'वर्कशॉप',
    'dashboard.customers': 'ग्राहक',
    'dashboard.orders': 'ऑर्डर',
    'dashboard.externalServices': 'बाहरी सेवाएं',
    'workshop.add': 'नई वर्कशॉप जोड़ें',
    'workshop.name': 'वर्कशॉप का नाम',
    'workshop.type': 'सेवा प्रकार',
    'workshop.address': 'पता',
    'workshop.status': 'स्थिति',
    'workshop.users': 'उपयोगकर्ता',
    'workshop.enter': 'वर्कशॉप में प्रवेश',
    'workshop.details': 'विवरण देखें',
    'workshop.active': 'सक्रिय',
    'workshop.inactive': 'निष्क्रिय',
    'workshop.type.male': 'पुरुष',
    'workshop.type.female': 'महिला',
    'workshop.type.both': 'पुरुष और महिला',
    
    // Order Management
    'order.new': 'नया ऑर्डर',
    'order.number': 'ऑर्डर संख्या',
    'order.customer': 'ग्राहक',
    'order.status.new': 'नया',
    'order.status.production': 'उत्पादन में',
    'order.status.completed': 'पूर्ण',
    'order.delivery': 'डिलीवरी तिथि',
    'order.total': 'कुल',
    'order.items': 'वस्तुएं',
    'order.startProduction': 'उत्पादन शुरू करें',
    'order.endProduction': 'उत्पादन समाप्त करें',
    'order.viewDetails': 'विवरण देखें',
    
    // Customer Management
    'customer.new': 'नया ग्राहक',
    'customer.existing': 'मौजूदा ग्राहक',
    'customer.name': 'ग्राहक का नाम',
    'customer.phone': 'फोन नंबर',
    'customer.email': 'ईमेल',
    'customer.gender': 'लिंग',
    'customer.age': 'आयु',
    'customer.address': 'पता',
    'customer.country': 'देश',
    'customer.state': 'राज्य',
    'customer.area': 'क्षेत्र',
    'customer.street': 'गली',
    'customer.house': 'घर संख्या',
    'customer.measurements': 'माप',
    'customer.search': 'ग्राहक खोजें',
    'customer.orders.previous': 'पिछले ऑर्डर',
    
    // Measurements
    'measurement.chest': 'छाती',
    'measurement.waist': 'कमर',
    'measurement.shoulder': 'कंधा',
    'measurement.neck': 'गर्दन',
    'measurement.length': 'लंबाई',
    'measurement.sleeve': 'आस्तीन',
    
    // Auth
    'auth.username': 'उपयोगकर्ता नाम या वर्कशॉप आईडी',
    'auth.password': 'पासवर्ड',
    'auth.login': 'सिस्टम में लॉगिन',
    'auth.loading': 'लोड हो रहा है...',
    'auth.help': 'मदद चाहिए?',
    'auth.support': 'सहायता से संपर्क करें',
    'auth.loginTitle': 'लॉगिन',
    'auth.loginDescription': 'सिस्टम तक पहुंच के लिए वर्कशॉप विवरण दर्ज करें',
    
    // Common
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.search': 'खोज',
    'common.add': 'जोड़ें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.print': 'प्रिंट करें',
    'common.create': 'बनाएं',
    'common.update': 'अपडेट करें',
    'common.required': 'आवश्यक',
    'common.optional': 'वैकल्पिक',
    'common.male': 'पुरुष',
    'common.female': 'महिला',
    'common.currency': 'KWD',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.orders': 'ऑर्डर',
    'nav.customers': 'ग्राहक',
    'nav.products': 'उत्पाद',
    'nav.reports': 'रिपोर्ट',
    'nav.settings': 'सेटिंग',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = (language === 'ar' || language === 'ur') ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === 'ar' ? 'font-arabic' : language === 'ur' ? 'font-arabic' : 'font-english'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
