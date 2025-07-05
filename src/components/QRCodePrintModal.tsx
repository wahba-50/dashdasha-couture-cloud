
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, QrCode } from "lucide-react";

interface QRCodePrintModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodePrintModal = ({ order, isOpen, onClose }: QRCodePrintModalProps) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-none print:shadow-none">
        <div className="print:hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <QrCode className="w-6 h-6" />
              طباعة أكواد QR - الطلب #{order.id}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4 mb-6">
            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
              <Printer className="w-4 h-4 mr-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
          </div>
        </div>

        {/* Print Content */}
        <div className="print:p-0">
          {/* Workshop Header for Print */}
          <div className="text-center mb-8 print:mb-6">
            <h1 className="text-2xl font-bold print:text-xl">ورشة الأناقة الكويتية</h1>
            <p className="text-gray-600 print:text-sm">حولي، شارع تونس، مجمع الأناقة التجاري</p>
            <p className="text-gray-600 print:text-sm">+965 2262 8945</p>
            <div className="mt-2">
              <Badge variant="outline" className="print:border-black">
                الطلب: #{order.id} | العميل: {order.customerName}
              </Badge>
            </div>
          </div>

          {/* QR Codes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
            {order.itemDetails?.map((item: any, index: number) => (
              <Card key={index} className="border-2 print:border-black print:shadow-none">
                <CardContent className="p-6 print:p-4">
                  {/* QR Code Placeholder */}
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 print:border-black">
                      <QrCode className="w-16 h-16 text-gray-400 print:text-black" />
                    </div>
                    <Badge className="font-mono text-lg px-3 py-1 print:border print:border-black print:bg-white print:text-black">
                      {item.qrCode}
                    </Badge>
                  </div>

                  {/* Item Details */}
                  <div className="space-y-3 text-sm print:text-xs">
                    <div className="border-t pt-3 print:border-black">
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <span className="font-semibold">نوع القماش:</span>
                          <p className="mt-1">{item.fabric}</p>
                        </div>
                        <div>
                          <span className="font-semibold">نوع القصة:</span>
                          <p className="mt-1">{item.cut}</p>
                        </div>
                        <div>
                          <span className="font-semibold">رقم الطلب:</span>
                          <p className="mt-1">#{order.id}</p>
                        </div>
                        <div>
                          <span className="font-semibold">تاريخ التسليم:</span>
                          <p className="mt-1">{order.deliveryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer for each code */}
                  <div className="mt-4 pt-3 border-t text-xs text-center text-gray-500 print:border-black print:text-black">
                    <p>تاريخ الطباعة: {new Date().toLocaleDateString('ar-KW')}</p>
                    <p className="font-semibold">قطعة {index + 1} من {order.items}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Print Footer */}
          <div className="hidden print:block mt-8 text-center text-xs">
            <p>شكراً لثقتكم بنا - ورشة الأناقة الكويتية</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePrintModal;
