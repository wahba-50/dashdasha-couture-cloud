import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Minus, Package, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderFormProps {
  customerData: any;
  onNext: (items: any[]) => void;
  onPrevious: () => void;
}

const OrderForm = ({ customerData, onNext, onPrevious }: OrderFormProps) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<any>({
    id: Date.now(),
    fabricType: 'workshop',
    fabric: null,
    cut: null,
    accessories: [],
    labors: [],
    totalPrice: 0,
    qrCode: '',
    customerFabricSpecs: ''
  });

  const handleCustomerFabricSpecsChange = useCallback((value: string) => {
    setCurrentItem(prev => ({ ...prev, customerFabricSpecs: value }));
  }, []);

  const mockFabrics = [
    {
      id: 'fabric-1',
      name: 'قماش قطني فاخر',
      price: 12.500,
      unit: 'متر',
      stock: 50,
      category: 'قطني',
      color: 'أبيض',
      material: 'قطن 100%'
    },
    {
      id: 'fabric-2',
      name: 'قماش حرير طبيعي',
      price: 45.000,
      unit: 'متر',
      stock: 30,
      category: 'حرير',
      color: 'أسود',
      material: 'حرير 100%'
    },
    {
      id: 'fabric-3',
      name: 'قماش كتان صيفي',
      price: 18.750,
      unit: 'متر',
      stock: 40,
      category: 'كتان',
      color: 'بيج',
      material: 'كتان 100%'
    }
  ];

  const mockCuts = [
    { id: 'cut-1', name: 'قصة كلاسيكية' },
    { id: 'cut-2', name: 'قصة عصرية' },
    { id: 'cut-3', name: 'قصة واسعة' }
  ];

  const mockAccessories = [
    { id: 'acc-1', name: 'أزرار ذهبية', price: 2.500 },
    { id: 'acc-2', name: 'سحاب مخفي', price: 1.250 },
    { id: 'acc-3', name: 'خيوط تطريز', price: 3.750 }
  ];

  const mockLabors = [
    { id: 'labor-1', name: 'خياطة أساسية', price: 15.000 },
    { id: 'labor-2', name: 'تطريز يدوي', price: 25.000 },
    { id: 'labor-3', name: 'تركيب أزرار', price: 5.000 }
  ];

  const calculateItemPrice = (item: any) => {
    let fabricPrice = 0;
    if (item.fabricType === 'workshop' && item.fabric) {
      fabricPrice = item.fabric.price;
    }
    const accessoriesPrice = item.accessories.reduce((sum: number, acc: any) => sum + acc.price, 0);
    const laborsPrice = item.labors.reduce((sum: number, labor: any) => sum + labor.price, 0);
    return fabricPrice + accessoriesPrice + laborsPrice;
  };

  const handleAddItem = () => {
    const qrCode = `QR-${Date.now().toString().slice(-4)}`;
    const newItem = {
      ...currentItem,
      id: Date.now(),
      totalPrice: calculateItemPrice(currentItem),
      qrCode: qrCode
    };
    setItems([...items, newItem]);
    setCurrentItem({
      id: Date.now(),
      fabricType: 'workshop',
      fabric: null,
      cut: null,
      accessories: [],
      labors: [],
      totalPrice: 0,
      qrCode: '',
      customerFabricSpecs: ''
    });
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleNext = () => {
    onNext(items);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل الطلب - العميل: {customerData?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fabric Selection */}
        <div>
          <Label className="text-base font-semibold">اختيار القماش *</Label>
          <RadioGroup
            value={currentItem.fabricType}
            onValueChange={(value) => setCurrentItem({...currentItem, fabricType: value, fabric: null})}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="workshop" id="workshop" />
              <Label htmlFor="workshop">قماش الورشة</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">قماش العميل</Label>
            </div>
          </RadioGroup>
        </div>

        {currentItem.fabricType === 'customer' && (
          <div>
            <Label htmlFor="customerFabricSpecs">مواصفات قماش العميل</Label>
            <Textarea
              id="customerFabricSpecs"
              value={currentItem.customerFabricSpecs}
              onChange={(e) => handleCustomerFabricSpecsChange(e.target.value)}
              placeholder="وصف نوع ولون ونمط القماش..."
              rows={3}
              className="mt-1"
            />
          </div>
        )}

        {currentItem.fabricType === 'workshop' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockFabrics.map(fabric => (
              <div 
                key={fabric.id}
                className={`cursor-pointer p-3 border rounded-lg transition-all ${
                  currentItem.fabric?.id === fabric.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentItem({...currentItem, fabric, totalPrice: calculateItemPrice({...currentItem, fabric})})}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{fabric.name}</h4>
                  <Badge variant="secondary">{fabric.category}</Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>السعر: {fabric.price.toFixed(3)} د.ك/{fabric.unit}</div>
                  <div>اللون: {fabric.color}</div>
                  <div>النوع: {fabric.material}</div>
                  <div>المخزون: {fabric.stock} {fabric.unit}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cut Selection */}
        <div>
          <Label htmlFor="cut" className="text-base font-semibold">اختيار القصة *</Label>
          <Select onValueChange={(value) => setCurrentItem({...currentItem, cut: mockCuts.find(cut => cut.id === value), totalPrice: calculateItemPrice({...currentItem, cut: mockCuts.find(cut => cut.id === value)})})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر قصة" />
            </SelectTrigger>
            <SelectContent>
              {mockCuts.map(cut => (
                <SelectItem key={cut.id} value={cut.id}>{cut.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Accessories Selection */}
        <div>
          <Label className="text-base font-semibold">الإكسسوارات</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockAccessories.map(accessory => (
              <div 
                key={accessory.id}
                className={`cursor-pointer p-3 border rounded-lg transition-all ${
                  currentItem.accessories.find((acc: any) => acc.id === accessory.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  const isSelected = currentItem.accessories.find((acc: any) => acc.id === accessory.id);
                  if (isSelected) {
                    setCurrentItem({
                      ...currentItem,
                      accessories: currentItem.accessories.filter((acc: any) => acc.id !== accessory.id),
                      totalPrice: calculateItemPrice({...currentItem, accessories: currentItem.accessories.filter((acc: any) => acc.id !== accessory.id)})
                    });
                  } else {
                    setCurrentItem({
                      ...currentItem,
                      accessories: [...currentItem.accessories, accessory],
                      totalPrice: calculateItemPrice({...currentItem, accessories: [...currentItem.accessories, accessory]})
                    });
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{accessory.name}</h4>
                  <Badge variant="outline">{accessory.price.toFixed(3)} د.ك</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labors Selection */}
        <div>
          <Label className="text-base font-semibold">المصنعيات</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockLabors.map(labor => (
              <div
                key={labor.id}
                className={`cursor-pointer p-3 border rounded-lg transition-all ${
                  currentItem.labors.find((l: any) => l.id === labor.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  const isSelected = currentItem.labors.find((l: any) => l.id === labor.id);
                  if (isSelected) {
                    setCurrentItem({
                      ...currentItem,
                      labors: currentItem.labors.filter((l: any) => l.id !== labor.id),
                      totalPrice: calculateItemPrice({...currentItem, labors: currentItem.labors.filter((l: any) => l.id !== labor.id)})
                    });
                  } else {
                    setCurrentItem({
                      ...currentItem,
                      labors: [...currentItem.labors, labor],
                      totalPrice: calculateItemPrice({...currentItem, labors: [...currentItem.labors, labor]})
                    });
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{labor.name}</h4>
                  <Badge variant="outline">{labor.price.toFixed(3)} د.ك</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Item */}
        <Button onClick={handleAddItem} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          إضافة قطعة
        </Button>

        {/* Items List */}
        {items.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">القطع المضافة</h3>
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">قطعة #{items.indexOf(item) + 1}</h4>
                  <div className="text-sm text-gray-600">
                    {item.fabricType === 'workshop' && item.fabric && (
                      <div>القماش: {item.fabric.name}</div>
                    )}
                    {item.cut && <div>القصة: {item.cut.name}</div>}
                    <div>السعر: {item.totalPrice.toFixed(3)} د.ك</div>
                    <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block">
                      QR: {item.qrCode}
                    </div>
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            تعديل بيانات العميل
          </Button>
          
          <div className="text-center text-sm text-gray-600 order-1 sm:order-2">
            {items.length > 0 ? `تم إضافة ${items.length} قطعة` : 'لم يتم إضافة أي قطع بعد'}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={items.length === 0}
            className="w-full sm:w-auto order-3"
          >
            متابعة للفاتورة
            <ArrowLeft className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
