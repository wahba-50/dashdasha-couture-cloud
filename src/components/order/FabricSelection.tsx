
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

interface Fabric {
  id: string;
  name: string;
  price: number;
  meters?: number;
  specifications?: string;
}

interface FabricSelectionProps {
  currentItem: any;
  setCurrentItem: (item: any) => void;
  workshopFabrics: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: number;
  }>;
}

const FabricSelection = ({ currentItem, setCurrentItem, workshopFabrics }: FabricSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          اختيار القماش
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={currentItem.fabricType} onValueChange={(value) => setCurrentItem({...currentItem, fabricType: value as 'workshop' | 'customer'})}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workshop">قماش الورشة</TabsTrigger>
            <TabsTrigger value="customer">قماش العميل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workshop" className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {workshopFabrics.map(fabric => (
                <Card 
                  key={fabric.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentItem.fabric?.id === fabric.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentItem({
                    ...currentItem, 
                    fabric: { ...fabric, meters: 1 }
                  })}
                >
                  <CardContent className="p-3">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-2"></div>
                    <h4 className="font-medium text-sm">{fabric.name}</h4>
                    <p className="text-xs text-gray-600">{fabric.price.toFixed(3)} د.ك/متر</p>
                    <p className="text-xs text-green-600">متوفر: {fabric.inStock} متر</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {currentItem.fabric && currentItem.fabricType === 'workshop' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label htmlFor="meters">عدد الأمتار</Label>
                <Input
                  id="meters"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={currentItem.fabric.meters || 1}
                  onChange={(e) => setCurrentItem({
                    ...currentItem,
                    fabric: {
                      ...currentItem.fabric!,
                      meters: parseFloat(e.target.value) || 1
                    }
                  })}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-2">
                  الإجمالي: {((currentItem.fabric.meters || 1) * currentItem.fabric.price).toFixed(3)} د.ك
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="customer" className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <Label htmlFor="fabricSpecs">مواصفات قماش العميل</Label>
              <Textarea
                id="fabricSpecs"
                placeholder="وصف نوع ولون وخامة القماش..."
                value={currentItem.fabric?.specifications || ''}
                onChange={(e) => setCurrentItem({
                  ...currentItem,
                  fabric: {
                    id: 'customer-fabric',
                    name: 'قماش العميل',
                    price: 0,
                    specifications: e.target.value
                  }
                })}
                className="mt-1"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FabricSelection;
