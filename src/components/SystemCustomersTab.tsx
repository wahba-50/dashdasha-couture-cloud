
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Building2 } from "lucide-react";

const SystemCustomersTab = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load system-wide customers
    const systemCustomers = JSON.parse(localStorage.getItem('systemCustomers') || '[]');
    setCustomers(systemCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.includes(searchTerm) || 
    customer.phone.includes(searchTerm) ||
    customer.workshopName.includes(searchTerm) ||
    (customer.email && customer.email.includes(searchTerm))
  );

  const handleViewCustomerDetails = (customer: any) => {
    const measurementsText = `
قياسات العميل: ${customer.name}
الورشة: ${customer.workshopName}

الصدر: ${customer.measurements?.chest || 'غير محدد'} سم
الخصر: ${customer.measurements?.waist || 'غير محدد'} سم
الكتف: ${customer.measurements?.shoulder || 'غير محدد'} سم
الرقبة: ${customer.measurements?.neckCircumference || 'غير محدد'} سم
الطول: ${customer.measurements?.length || 'غير محدد'} سم

العنوان الكامل:
${customer.address?.country || 'غير محدد'} - ${customer.address?.governorate || 'غير محدد'}
${customer.address?.block || 'غير محدد'} - ${customer.address?.street || 'غير محدد'}
منزل رقم: ${customer.address?.houseNumber || 'غير محدد'}
    `;
    
    alert(measurementsText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>العملاء في جميع الورش ({filteredCustomers.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في العملاء..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="space-y-4">
          {filteredCustomers.map((customer: any) => (
            <Card key={customer.id} className="border hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{customer.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {customer.gender || 'غير محدد'}
                      </Badge>
                      <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                        <Building2 className="w-3 h-3 mr-1" />
                        {customer.workshopName}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">الهاتف:</span>
                        <p className="font-medium">{customer.phone}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">البريد:</span>
                        <p className="font-medium">{customer.email || 'غير محدد'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">المحافظة:</span>
                        <p className="font-medium">{customer.address?.governorate || 'غير محدد'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">تاريخ التسجيل:</span>
                        <p className="font-medium">{customer.createdAt}</p>
                      </div>
                    </div>
                    
                    {/* Workshop info for customers registered in multiple workshops */}
                    {customer.workshops && customer.workshops.length > 1 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium mb-2">مسجل في عدة ورش:</p>
                        <div className="flex flex-wrap gap-1">
                          {customer.workshops.map((workshop: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {workshop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                      <div className="text-center">
                        <p className="text-gray-500">الطلبات</p>
                        <p className="font-bold text-primary">{customer.orders || 0}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">إجمالي الإنفاق</p>
                        <p className="font-bold text-green-600">{(customer.totalSpent || 0).toFixed(3)} د.ك</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">العمر</p>
                        <p className="font-bold">{customer.age || 'غير محدد'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full lg:w-48">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewCustomerDetails(customer)}
                      className="w-full"
                    >
                      عرض القياسات والعنوان
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد عملاء</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemCustomersTab;
