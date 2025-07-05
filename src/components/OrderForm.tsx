
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ItemBuilder from './order/ItemBuilder';
import OrderItemCard from './order/OrderItemCard';

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
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
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

  const handleEditItem = (item: OrderItem) => {
    setCurrentItem({
      id: item.id,
      qrCode: item.qrCode,
      fabricType: item.fabricType,
      fabric: item.fabric,
      cut: item.cut,
      accessories: item.accessories,
      labors: item.labors
    });
    setEditingItemId(item.id);
    setIsEditingItem(true);
  };

  const handleUpdateItem = () => {
    if (currentItem.fabric && currentItem.cut && editingItemId) {
      const updatedItem: OrderItem = {
        id: editingItemId,
        qrCode: currentItem.qrCode!,
        fabricType: currentItem.fabricType!,
        fabric: currentItem.fabric,
        cut: currentItem.cut,
        accessories: currentItem.accessories || [],
        labors: currentItem.labors || [],
        totalPrice: calculateItemTotal(currentItem)
      };
      
      setOrderItems(orderItems.map(item => 
        item.id === editingItemId ? updatedItem : item
      ));
      setCurrentItem({ fabricType: 'workshop' });
      setIsEditingItem(false);
      setEditingItemId(null);
    }
  };

  const handleCancelEdit = () => {
    setCurrentItem({ fabricType: 'workshop' });
    setIsEditingItem(false);
    setEditingItemId(null);
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
                <ItemBuilder
                  currentItem={currentItem}
                  setCurrentItem={setCurrentItem}
                  onAddItem={handleAddItem}
                  onCancel={() => setIsAddingItem(false)}
                  calculateItemTotal={calculateItemTotal}
                  workshopFabrics={workshopFabrics}
                  cuts={cuts}
                  accessories={accessories}
                  labors={labors}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {orderItems.length > 0 ? (
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <OrderItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={handleEditItem}
                  onCopy={handleCopyItem}
                  onDelete={handleDeleteItem}
                />
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

      {/* Edit Item Dialog */}
      <Dialog open={isEditingItem} onOpenChange={setIsEditingItem}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تعديل القطعة</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <ItemBuilder
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              onAddItem={handleUpdateItem}
              onCancel={handleCancelEdit}
              calculateItemTotal={calculateItemTotal}
              workshopFabrics={workshopFabrics}
              cuts={cuts}
              accessories={accessories}
              labors={labors}
            />
            <div className="flex gap-2">
              <Button onClick={handleUpdateItem} disabled={!currentItem.fabric || !currentItem.cut} className="flex-1">
                حفظ التعديلات
              </Button>
              <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
