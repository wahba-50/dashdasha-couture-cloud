
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Copy, QrCode, Trash2, Eye } from "lucide-react";

interface OrderItem {
  id: string;
  qrCode: string;
  fabricType: 'workshop' | 'customer';
  fabric?: {
    id: string;
    name: string;
    price: number;
    meters?: number;
    specifications?: string;
  };
  cut: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  accessories: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  labors: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  totalPrice: number;
}

interface OrderItemCardProps {
  item: OrderItem;
  index: number;
  onEdit: (item: OrderItem) => void;
  onCopy: (item: OrderItem) => void;
  onDelete: (id: string) => void;
}

const OrderItemCard = ({ item, index, onEdit, onCopy, onDelete }: OrderItemCardProps) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">قطعة #{index + 1}</Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <QrCode className="w-3 h-3 mr-1" />
                {item.qrCode}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-500">القماش:</span>
                <p className="font-medium">
                  {item.fabricType === 'customer' ? 'قماش العميل' : item.fabric?.name}
                </p>
                {item.fabric?.meters && (
                  <p className="text-xs text-gray-600">{item.fabric.meters} متر</p>
                )}
              </div>
              
              <div>
                <span className="text-gray-500">القصة:</span>
                <p className="font-medium">{item.cut.name}</p>
              </div>
              
              <div>
                <span className="text-gray-500">الإكسسوارات:</span>
                <p className="font-medium">{item.accessories.length} عنصر</p>
              </div>
              
              <div>
                <span className="text-gray-500">الإجمالي:</span>
                <p className="font-bold text-primary">{item.totalPrice.toFixed(3)} د.ك</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
              <Eye className="w-3 h-3 mr-1" />
              تعديل
            </Button>
            <Button size="sm" variant="outline" onClick={() => onCopy(item)}>
              <Copy className="w-3 h-3 mr-1" />
              نسخ
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3 mr-1" />
                  عرض
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>تفاصيل القطعة #{index + 1}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>رمز QR:</strong> {item.qrCode}
                    </div>
                    <div>
                      <strong>نوع القماش:</strong> {item.fabricType === 'workshop' ? 'قماش الورشة' : 'قماش العميل'}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">تفاصيل التكلفة:</h4>
                    
                    {item.fabric && (
                      <div className="flex justify-between">
                        <span>القماش:</span>
                        <span>{item.fabricType === 'customer' ? 'مجاني' : `${item.fabric.price.toFixed(3)} د.ك`}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>القصة:</span>
                      <span>{item.cut.price.toFixed(3)} د.ك</span>
                    </div>
                    
                    {item.accessories.map(acc => (
                      <div key={acc.id} className="flex justify-between text-sm">
                        <span>{acc.name} × {acc.quantity}:</span>
                        <span>{(acc.price * acc.quantity).toFixed(3)} د.ك</span>
                      </div>
                    ))}
                    
                    {item.labors.map(labor => (
                      <div key={labor.id} className="flex justify-between text-sm">
                        <span>{labor.name}:</span>
                        <span>{labor.price.toFixed(3)} د.ك</span>
                      </div>
                    ))}
                    
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>الإجمالي:</span>
                      <span className="text-primary">{item.totalPrice.toFixed(3)} د.ك</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
