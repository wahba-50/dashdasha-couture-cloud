
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // System Owner Dashboard
    'system.title': 'نظام إدارة ورش الدشاديش',
    'system.subtitle': 'لوحة تحكم مالك النظام',
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
    // System Owner Dashboard
    'system.title': 'Dshdasha Workshop Management System',
    'system.subtitle': 'System Owner Dashboard',
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

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === 'ar' ? 'font-arabic' : 'font-english'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
