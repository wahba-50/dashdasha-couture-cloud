
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ItemSummaryProps {
  currentItem: any;
  calculateItemTotal: (item: any) => number;
}

const ItemSummary = ({ currentItem, calculateItemTotal }: ItemSummaryProps) => {
  if (!currentItem.fabric && !currentItem.cut) {
    return null;
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-lg">ملخص القطعة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentItem.fabric && (
          <div className="flex justify-between text-sm">
            <span>القماش:</span>
            <span className="font-semibold">
              {currentItem.fabricType === 'workshop' && currentItem.fabric.meters
                ? `${(currentItem.fabric.price * currentItem.fabric.meters).toFixed(3)} د.ك`
                : currentItem.fabricType === 'customer' 
                ? 'قماش العميل' 
                : `${currentItem.fabric.price.toFixed(3)} د.ك`
              }
            </span>
          </div>
        )}
        
        {currentItem.cut && (
          <div className="flex justify-between text-sm">
            <span>القصة:</span>
            <span className="font-semibold">{currentItem.cut.price.toFixed(3)} د.ك</span>
          </div>
        )}
        
        {currentItem.accessories && currentItem.accessories.length > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>الإكسسوارات:</span>
              <span className="font-semibold">
                {currentItem.accessories.reduce((sum: number, acc: any) => sum + (acc.price * acc.quantity), 0).toFixed(3)} د.ك
              </span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              {currentItem.accessories.map((acc: any) => (
                <div key={acc.id} className="flex justify-between">
                  <span>{acc.name} × {acc.quantity}</span>
                  <span>{(acc.price * acc.quantity).toFixed(3)} د.ك</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentItem.labors && currentItem.labors.length > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>المصنعيات:</span>
              <span className="font-semibold">
                {currentItem.labors.reduce((sum: number, labor: any) => sum + labor.price, 0).toFixed(3)} د.ك
              </span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              {currentItem.labors.map((labor: any) => (
                <div key={labor.id} className="flex justify-between">
                  <span>{labor.name}</span>
                  <span>{labor.price.toFixed(3)} د.ك</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator />
        <div className="flex justify-between font-bold">
          <span>إجمالي القطعة:</span>
          <span className="text-primary">{calculateItemTotal(currentItem).toFixed(3)} د.ك</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemSummary;
