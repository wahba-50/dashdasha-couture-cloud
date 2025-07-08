
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Package, Scissors, Shirt, Copy, QrCode, Trash2, Eye, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface OrderFormProps {
  customerData: any;
  onNext: (items: OrderItem[]) => void;
  onPrevious: () => void;
}

const OrderForm = ({ customerData, onNext, onPrevious }: OrderFormProps) => {
  const { t, language } = useLanguage();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<OrderItem>>({
    fabricType: 'workshop'
  });

  // Mock data - in real app this would come from ProductManagement
  const workshopFabrics = [
    { id: '1', name: 'قماش قطني فاخر', price: 12.500, image: '/api/placeholder/100/100', inStock: 50 },
    { id: '2', name: 'قماش حريري', price: 25.750, image: '/api/placeholder/100/100', inStock: 30 },
    { id: '3', name: 'قماش كتان', price: 18.250, image: '/api/placeholder/100/100', inStock: 40 }
  ];

  const cuts = [
    { id: '1', name: 'قصة كلاسيكية', price: 15.750, image: '/api/placeholder/150/150' },
    { id: '2', name: 'قصة عصرية', price: 18.500, image: '/api/placeholder/150/150' },
    { id: '3', name: 'قصة فاخرة', price: 22.000, image: '/api/placeholder/150/150' }
  ];

  const accessories = [
    { id: '1', name: 'أزرار ذهبية', price: 2.250, image: '/api/placeholder/80/80' },
    { id: '2', name: 'أزرار فضية', price: 1.750, image: '/api/placeholder/80/80' },
    { id: '3', name: 'تطريز يدوي', price: 15.000, image: '/api/placeholder/80/80' },
    { id: '4', name: 'جيوب مخفية', price: 5.500, image: '/api/placeholder/80/80' }
  ];

  const labors = [
    { id: '1', name: 'مصنعية القص', price: 8.000 },
    { id: '2', name: 'مصنعية التفصيل', price: 15.000 },
    { id: '3', name: 'تركيب الإكسسوارات', price: 5.000 },
    { id: '4', name: 'مصنعية الكي', price: 3.000 }
  ];

  const generateQRCode = () => {
    return `QR${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
  };

  const calculateItemTotal = (item: Partial<OrderItem>) => {
    let total = 0;
    
    if (item.fabric) {
      total += item.fabricType === 'workshop' && item.fabric.meters 
        ? item.fabric.price * item.fabric.meters 
        : item.fabric.price;
    }
    
    if (item.cut) {
      total += item.cut.price;
    }
    
    if (item.accessories) {
      total += item.accessories.reduce((sum, acc) => sum + (acc.price * acc.quantity), 0);
    }
    
    if (item.labors) {
      total += item.labors.reduce((sum, labor) => sum + labor.price, 0);
    }
    
    return total;
  };

  const handleAddItem = () => {
    if (currentItem.fabric && currentItem.cut) {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        qrCode: generateQRCode(),
        fabricType: currentItem.fabricType!,
        fabric: currentItem.fabric,
        cut: currentItem.cut,
        accessories: currentItem.accessories || [],
        labors: currentItem.labors || [],
        totalPrice: calculateItemTotal(currentItem)
      };
      
      setOrderItems([...orderItems, newItem]);
      setCurrentItem({ fabricType: 'workshop' });
      setIsAddingItem(false);
    }
  };

  const handleCopyItem = (item: OrderItem) => {
    const copiedItem: OrderItem = {
      ...item,
      id: Date.now().toString(),
      qrCode: generateQRCode()
    };
    setOrderItems([...orderItems, copiedItem]);
  };

  const handleDeleteItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const totalOrderAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Fixed textarea with proper event handling
  const CustomerFabricTextarea = React.memo(() => {
    const [internalValue, setInternalValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInternalValue(value);
      
      // Update parent state asynchronously
      setTimeout(() => {
        setCurrentItem(prev => ({
          ...prev,
          fabric: {
            id: 'customer-fabric',
            name: 'قماش العميل',
            price: 0,
            specifications: value
          }
        }));
      }, 0);
    };

    return (
      <textarea
        id="fabricSpecs"
        placeholder="وصف نوع ولون وخامة القماش..."
        value={internalValue}
        onChange={handleChange}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
      />
    );
  });

  const ItemBuilder = () => (
    <div className="space-y-6">
      {/* Fabric Selection */}
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
                <CustomerFabricTextarea />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cut Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            اختiار القصة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cuts.map(cut => (
              <Card 
                key={cut.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentItem.cut?.id === cut.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentItem({...currentItem, cut})}
              >
                <CardContent className="p-3 text-center">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2"></div>
                  <h4 className="font-medium text-sm">{cut.name}</h4>
                  <p className="text-sm text-primary font-semibold">{cut.price.toFixed(3)} د.ك</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessories Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="w-5 h-5" />
            الإكسسوارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map(accessory => {
              const selectedAcc = currentItem.accessories?.find(a => a.id === accessory.id);
              return (
                <Card 
                  key={accessory.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAcc ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardContent className="p-3 text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-2 w-16 h-16 mx-auto"></div>
                    <h4 className="font-medium text-xs">{accessory.name}</h4>
                    <p className="text-xs text-primary font-semibold">{accessory.price.toFixed(3)} د.ك</p>
                    
                    {selectedAcc ? (
                      <div className="flex items-center gap-1 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-6 h-6 p-0"
                          onClick={() => {
                            const newQuantity = Math.max(0, selectedAcc.quantity - 1);
                            if (newQuantity === 0) {
                              setCurrentItem({
                                ...currentItem,
                                accessories: currentItem.accessories?.filter(a => a.id !== accessory.id)
                              });
                            } else {
                              setCurrentItem({
                                ...currentItem,
                                accessories: currentItem.accessories?.map(a => 
                                  a.id === accessory.id ? {...a, quantity: newQuantity} : a
                                )
                              });
                            }
                          }}
                        >
                          -
                        </Button>
                        <span className="text-xs font-bold w-8 text-center">{selectedAcc.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-6 h-6 p-0"
                          onClick={() => {
                            setCurrentItem({
                              ...currentItem,
                              accessories: currentItem.accessories?.map(a => 
                                a.id === accessory.id ? {...a, quantity: a.quantity + 1} : a
                              )
                            });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2 text-xs"
                        onClick={() => {
                          const newAccessories = [...(currentItem.accessories || []), {
                            ...accessory,
                            quantity: 1
                          }];
                          setCurrentItem({...currentItem, accessories: newAccessories});
                        }}
                      >
                        إضافة
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Labor Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            المصنعيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {labors.map(labor => {
              const isSelected = currentItem.labors?.some(l => l.id === labor.id);
              return (
                <div 
                  key={labor.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setCurrentItem({
                        ...currentItem,
                        labors: currentItem.labors?.filter(l => l.id !== labor.id)
                      });
                    } else {
                      setCurrentItem({
                        ...currentItem,
                        labors: [...(currentItem.labors || []), labor]
                      });
                    }
                  }}
                >
                  <div>
                    <h4 className="font-medium text-sm">{labor.name}</h4>
                    <p className="text-sm text-primary font-semibold">{labor.price.toFixed(3)} د.ك</p>
                  </div>
                  <div className={`w-4 h-4 rounded border ${
                    isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Item Summary */}
      {(currentItem.fabric || currentItem.cut) && (
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
                    {currentItem.accessories.reduce((sum, acc) => sum + (acc.price * acc.quantity), 0).toFixed(3)} د.ك
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  {currentItem.accessories.map(acc => (
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
                    {currentItem.labors.reduce((sum, labor) => sum + labor.price, 0).toFixed(3)} د.ك
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  {currentItem.labors.map(labor => (
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
      )}
      
      <div className="flex gap-2">
        <Button onClick={handleAddItem} disabled={!currentItem.fabric || !currentItem.cut} className="flex-1">
          إضافة القطعة
        </Button>
        <Button variant="outline" onClick={() => setIsAddingItem(false)} className="flex-1">
          إلغاء
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Current Items */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>قطع الطلب ({orderItems.length})</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                إجمالي المبلغ: <span className="font-bold text-primary">{totalOrderAmount.toFixed(3)} د.ك</span>
              </p>
            </div>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة قطعة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إنشاء قطعة جديدة</DialogTitle>
                </DialogHeader>
                <ItemBuilder />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {orderItems.length > 0 ? (
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <Card key={item.id} className="border-l-4 border-l-primary">
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
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleCopyItem(item)}>
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
                              
                              {/* Detailed breakdown */}
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
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لم يتم إضافة أي قطع بعد</p>
              <Button className="mt-4" onClick={() => setIsAddingItem(true)}>
                <Plus className="w-4 h-4 mr-2" />
                إضافة القطعة الأولى
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={onPrevious} className="flex-1 sm:flex-none">
          السابق
        </Button>
        <Button 
          onClick={() => onNext(orderItems)} 
          disabled={orderItems.length === 0}
          className="flex-1 sm:flex-none"
        >
          التالي - الملخص والفاتورة
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
