
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Package, Scissors, Shirt, Wrench, Search, Filter, Upload, Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: string;
  name: string;
  nameEn: string;
  type: 'fabric' | 'accessory' | 'cut' | 'labor';
  price: number;
  unit: string;
  stock: number;
  description?: string;
  image?: string;
  category?: string;
  color?: string;
  material?: string;
}

interface ProductManagementProps {
  onClose?: () => void;
}

const ProductManagement = ({ onClose }: ProductManagementProps) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('fabric');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'قماش قطني فاخر',
      nameEn: 'Premium Cotton Fabric',
      type: 'fabric',
      price: 12.500,
      unit: 'متر',
      stock: 50,
      description: 'قماش قطني عالي الجودة مناسب للدشاديش الصيفية',
      category: 'قطني',
      color: 'أبيض',
      material: 'قطن 100%',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      name: 'قصة دشداشة كلاسيكية',
      nameEn: 'Classic Dshdasha Cut',
      type: 'cut',
      price: 15.750,
      unit: 'قطعة',
      stock: 100,
      description: 'قصة تقليدية كويتية أنيقة',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      name: 'أزرار ذهبية',
      nameEn: 'Golden Buttons',
      type: 'accessory',
      price: 2.250,
      unit: 'عدد',
      stock: 200,
      description: 'أزرار معدنية ذهبية فاخرة',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '4',
      name: 'مصنعية قص وتفصيل',
      nameEn: 'Cutting & Tailoring Labor',
      type: 'labor',
      price: 25.000,
      unit: 'قطعة',
      stock: 999,
      description: 'أجرة القص والتفصيل والخياطة'
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    nameEn: '',
    type: 'fabric',
    price: 0,
    unit: 'متر',
    stock: 0,
    description: '',
    category: '',
    color: '',
    material: '',
    image: ''
  });

  const productTypes = [
    { value: 'fabric', label: 'الأقمشة', labelEn: 'Fabrics', icon: Package, color: 'bg-blue-500' },
    { value: 'cut', label: 'القصات', labelEn: 'Cuts', icon: Scissors, color: 'bg-green-500' },
    { value: 'accessory', label: 'الإكسسوارات', labelEn: 'Accessories', icon: Shirt, color: 'bg-purple-500' },
    { value: 'labor', label: 'المصنعيات', labelEn: 'Labor', icon: Wrench, color: 'bg-orange-500' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesType = product.type === activeTab;
    const matchesSearch = product.name.includes(searchTerm) || 
                         product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.includes(searchTerm));
    return matchesType && matchesSearch;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isEditing && editingProduct) {
          setEditingProduct({ ...editingProduct, image: imageUrl });
        } else {
          setNewProduct({ ...newProduct, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name!,
        nameEn: newProduct.nameEn || newProduct.name!,
        type: newProduct.type as 'fabric' | 'accessory' | 'cut' | 'labor',
        price: newProduct.price!,
        unit: newProduct.unit || 'قطعة',
        stock: newProduct.stock || 0,
        description: newProduct.description,
        category: newProduct.category,
        color: newProduct.color,
        material: newProduct.material,
        image: newProduct.image
      };
      
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        nameEn: '',
        type: 'fabric',
        price: 0,
        unit: 'متر',
        stock: 0,
        description: '',
        category: '',
        color: '',
        material: '',
        image: ''
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProductChange = (partialProduct: Partial<Product>) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, ...partialProduct });
    }
  };

  const ProductForm = ({ product, onSave, onCancel, isEditing = false }: { 
    product: Partial<Product>, 
    onSave: (product: Partial<Product>) => void,
    onCancel: () => void,
    isEditing?: boolean
  }) => (
    <div className="space-y-4 p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">الاسم بالعربية *</Label>
          <Input
            id="name"
            value={product.name || ''}
            onChange={(e) => onSave({ ...product, name: e.target.value })}
            placeholder="اسم المنتج"
          />
        </div>
        <div>
          <Label htmlFor="nameEn">الاسم بالإنجليزية</Label>
          <Input
            id="nameEn"
            value={product.nameEn || ''}
            onChange={(e) => onSave({ ...product, nameEn: e.target.value })}
            placeholder="Product Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="type">النوع *</Label>
          <Select value={product.type} onValueChange={(value) => onSave({ ...product, type: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {productTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">السعر (د.ك) *</Label>
          <Input
            id="price"
            type="number"
            step="0.001"
            value={product.price || ''}
            onChange={(e) => onSave({ ...product, price: parseFloat(e.target.value) || 0 })}
            placeholder="0.000"
          />
        </div>
        <div>
          <Label htmlFor="unit">الوحدة *</Label>
          <Select value={product.unit} onValueChange={(value) => onSave({ ...product, unit: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="متر">متر</SelectItem>
              <SelectItem value="قطعة">قطعة</SelectItem>
              <SelectItem value="عدد">عدد</SelectItem>
              <SelectItem value="كيلو">كيلو</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <Label htmlFor="image">صورة المنتج</Label>
        <div className="mt-2 space-y-3">
          {product.image && (
            <div className="relative w-32 h-32 mx-auto">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
          )}
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">انقر لرفع صورة</p>
                <p className="text-xs text-gray-500">PNG, JPG حتى 10MB</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, isEditing)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stock">المخزون</Label>
          <Input
            id="stock"
            type="number"
            value={product.stock || ''}
            onChange={(e) => onSave({ ...product, stock: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>
        {product.type === 'fabric' && (
          <div>
            <Label htmlFor="color">اللون</Label>
            <Input
              id="color"
              value={product.color || ''}
              onChange={(e) => onSave({ ...product, color: e.target.value })}
              placeholder="اللون"
            />
          </div>
        )}
      </div>

      {product.type === 'fabric' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="material">نوع القماش</Label>
            <Input
              id="material"
              value={product.material || ''}
              onChange={(e) => onSave({ ...product, material: e.target.value })}
              placeholder="مثل: قطن، حرير، كتان"
            />
          </div>
          <div>
            <Label htmlFor="category">الفئة</Label>
            <Input
              id="category"
              value={product.category || ''}
              onChange={(e) => onSave({ ...product, category: e.target.value })}
              placeholder="مثل: صيفي، شتوي، فاخر"
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={product.description || ''}
          onChange={(e) => onSave({ ...product, description: e.target.value })}
          placeholder="وصف المنتج..."
          rows={3}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button onClick={() => onSave(product)} className="flex-1">
          حفظ المنتج
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          إلغاء
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">إدارة المنتجات</h2>
          <p className="text-sm text-gray-600">إدارة الأقمشة والإكسسوارات والقصات والمصنعيات</p>
        </div>
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              إضافة منتج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة منتج جديد</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={newProduct}
              onSave={setNewProduct}
              onCancel={() => setIsAddingProduct(false)}
            />
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button onClick={handleAddProduct}>إضافة المنتج</Button>
              <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                إلغاء
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          {productTypes.map(type => {
            const Icon = type.icon;
            const count = products.filter(p => p.type === type.value).length;
            return (
              <TabsTrigger key={type.value} value={type.value} className="flex-col gap-1 py-3">
                <div className="flex items-center gap-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{type.label}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {productTypes.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    {/* Product Image */}
                    <div className="w-full h-40 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Image className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{product.name}</CardTitle>
                        {product.nameEn && (
                          <p className="text-xs text-gray-500 truncate">{product.nameEn}</p>
                        )}
                      </div>
                      <Badge className={`${productTypes.find(t => t.value === product.type)?.color} text-white shrink-0`}>
                        {productTypes.find(t => t.value === product.type)?.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">السعر:</span>
                        <p className="font-semibold">{product.price.toFixed(3)} د.ك/{product.unit}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">المخزون:</span>
                        <p className="font-semibold">{product.stock} {product.unit}</p>
                      </div>
                    </div>
                    
                    {product.type === 'fabric' && (product.color || product.material) && (
                      <div className="text-xs space-y-1">
                        {product.color && <p><span className="text-gray-500">اللون:</span> {product.color}</p>}
                        {product.material && <p><span className="text-gray-500">النوع:</span> {product.material}</p>}
                      </div>
                    )}
                    
                    {product.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            تعديل
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>تعديل المنتج</DialogTitle>
                          </DialogHeader>
                          <ProductForm
                            product={editingProduct || product}
                            onSave={handleEditProductChange}
                            onCancel={() => setEditingProduct(null)}
                            isEditing={true}
                          />
                          <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button onClick={() => editingProduct && handleEditProduct(editingProduct)}>
                              حفظ التعديلات
                            </Button>
                            <Button variant="outline" onClick={() => setEditingProduct(null)}>
                              إلغاء
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد منتجات في هذه الفئة</p>
                <Button className="mt-4" onClick={() => setIsAddingProduct(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة منتج جديد
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {onClose && (
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
