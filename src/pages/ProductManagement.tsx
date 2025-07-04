
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Package, Scissors, Shirt, Star, Plus, Edit, Trash2, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fabrics');

  // Sample data
  const [fabrics, setFabrics] = useState([
    { id: 1, name: 'قماش قطني فاخر', pricePerMeter: 8.500, image: '/placeholder.svg', description: 'قماش قطني عالي الجودة مناسب للاستخدام اليومي', inStock: true, quantity: 50 },
    { id: 2, name: 'حرير طبيعي', pricePerMeter: 15.000, image: '/placeholder.svg', description: 'حرير طبيعي فاخر للمناسبات الخاصة', inStock: true, quantity: 25 },
    { id: 3, name: 'كتان مخلوط', pricePerMeter: 12.000, image: '/placeholder.svg', description: 'خليط كتان مريح ومتين', inStock: false, quantity: 0 }
  ]);

  const [cuts, setCuts] = useState([
    { id: 1, name: 'قصة كلاسيكية', price: 15.000, image: '/placeholder.svg', description: 'قصة تقليدية أنيقة', category: 'رجالي' },
    { id: 2, name: 'قصة عصرية', price: 20.000, image: '/placeholder.svg', description: 'قصة حديثة وعملية', category: 'حريمي' },
    { id: 3, name: 'قصة رسمية', price: 25.000, image: '/placeholder.svg', description: 'قصة رسمية للمناسبات', category: 'رجالي' }
  ]);

  const [accessories, setAccessories] = useState([
    { id: 1, name: 'أزرار ذهبية', price: 5.000, image: '/placeholder.svg', description: 'أزرار معدنية بطلاء ذهبي' },
    { id: 2, name: 'تطريز يدوي', price: 12.000, image: '/placeholder.svg', description: 'تطريز يدوي تقليدي' },
    { id: 3, name: 'كم مطرز', price: 8.000, image: '/placeholder.svg', description: 'كم بتطريز خاص' }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'مصنعية القص', price: 3.000, description: 'خدمة قص القماش حسب المقاسات' },
    { id: 2, name: 'مصنعية التفصيل', price: 8.000, description: 'تفصيل القطعة كاملة' },
    { id: 3, name: 'تركيب الإكسسوارات', price: 2.000, description: 'تركيب الأزرار والتطريز' },
    { id: 4, name: 'مصنعية الكي', price: 1.500, description: 'كي وتجهيز القطعة النهائية' }
  ]);

  // Forms state
  const [newFabric, setNewFabric] = useState({
    name: '', pricePerMeter: 0, image: '', description: '', quantity: 0
  });

  const [newCut, setNewCut] = useState({
    name: '', price: 0, image: '', description: '', category: 'رجالي'
  });

  const [newAccessory, setNewAccessory] = useState({
    name: '', price: 0, image: '', description: ''
  });

  const [newService, setNewService] = useState({
    name: '', price: 0, description: ''
  });

  const addFabric = () => {
    if (newFabric.name && newFabric.pricePerMeter > 0) {
      setFabrics([...fabrics, { 
        id: Date.now(), 
        ...newFabric, 
        inStock: newFabric.quantity > 0,
        image: newFabric.image || '/placeholder.svg'
      }]);
      setNewFabric({ name: '', pricePerMeter: 0, image: '', description: '', quantity: 0 });
    }
  };

  const addCut = () => {
    if (newCut.name && newCut.price > 0) {
      setCuts([...cuts, { 
        id: Date.now(), 
        ...newCut,
        image: newCut.image || '/placeholder.svg'
      }]);
      setNewCut({ name: '', price: 0, image: '', description: '', category: 'رجالي' });
    }
  };

  const addAccessory = () => {
    if (newAccessory.name && newAccessory.price > 0) {
      setAccessories([...accessories, { 
        id: Date.now(), 
        ...newAccessory,
        image: newAccessory.image || '/placeholder.svg'
      }]);
      setNewAccessory({ name: '', price: 0, image: '', description: '' });
    }
  };

  const addService = () => {
    if (newService.name && newService.price > 0) {
      setServices([...services, { id: Date.now(), ...newService }]);
      setNewService({ name: '', price: 0, description: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-blue-600 to-amber-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  إدارة المنتجات والخدمات
                </h1>
                <p className="text-sm text-gray-600">إدارة الأقمشة والقصات والإكسسوارات والمصنعيات</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button variant="outline" size="sm">العربية</Button>
              <Button variant="outline" size="sm">English</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="fabrics" className="flex items-center space-x-reverse space-x-2">
              <Package className="w-4 h-4" />
              <span>الأقمشة</span>
            </TabsTrigger>
            <TabsTrigger value="cuts" className="flex items-center space-x-reverse space-x-2">
              <Scissors className="w-4 h-4" />
              <span>القصات</span>
            </TabsTrigger>
            <TabsTrigger value="accessories" className="flex items-center space-x-reverse space-x-2">
              <Star className="w-4 h-4" />
              <span>الإكسسوارات</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-reverse space-x-2">
              <Shirt className="w-4 h-4" />
              <span>المصنعيات</span>
            </TabsTrigger>
          </TabsList>

          {/* Fabrics Tab */}
          <TabsContent value="fabrics" className="space-y-6">
            {/* Add New Fabric Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-reverse space-x-3">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>إضافة قماش جديد</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fabric-name">اسم القماش</Label>
                    <Input
                      id="fabric-name"
                      value={newFabric.name}
                      onChange={(e) => setNewFabric({...newFabric, name: e.target.value})}
                      placeholder="أدخل اسم القماش"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fabric-price">السعر لكل متر (د.ك)</Label>
                    <Input
                      id="fabric-price"
                      type="number"
                      step="0.001"
                      value={newFabric.pricePerMeter}
                      onChange={(e) => setNewFabric({...newFabric, pricePerMeter: parseFloat(e.target.value) || 0})}
                      placeholder="0.000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fabric-quantity">الكمية المتوفرة (متر)</Label>
                    <Input
                      id="fabric-quantity"
                      type="number"
                      value={newFabric.quantity}
                      onChange={(e) => setNewFabric({...newFabric, quantity: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fabric-description">الوصف</Label>
                    <Textarea
                      id="fabric-description"
                      value={newFabric.description}
                      onChange={(e) => setNewFabric({...newFabric, description: e.target.value})}
                      placeholder="أدخل وصف القماش..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fabric-image">رابط الصورة</Label>
                    <div className="flex space-x-reverse space-x-2">
                      <Input
                        id="fabric-image"
                        value={newFabric.image}
                        onChange={(e) => setNewFabric({...newFabric, image: e.target.value})}
                        placeholder="رابط الصورة..."
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={addFabric} className="bg-gradient-to-r from-blue-600 to-amber-500">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة القماش
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fabrics List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fabrics.map((fabric) => (
                <Card key={fabric.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4">
                    <img src={fabric.image} alt={fabric.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-800">{fabric.name}</h3>
                        <Badge variant={fabric.inStock ? 'default' : 'destructive'}>
                          {fabric.inStock ? 'متوفر' : 'نفدت الكمية'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{fabric.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">{fabric.pricePerMeter.toFixed(3)} د.ك/متر</span>
                        <span className="text-sm text-gray-500">الكمية: {fabric.quantity} متر</span>
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 ml-1" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cuts Tab */}
          <TabsContent value="cuts" className="space-y-6">
            {/* Add New Cut Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-reverse space-x-3">
                  <Plus className="w-5 h-5 text-amber-600" />
                  <span>إضافة قصة جديدة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cut-name">اسم القصة</Label>
                    <Input
                      id="cut-name"
                      value={newCut.name}
                      onChange={(e) => setNewCut({...newCut, name: e.target.value})}
                      placeholder="أدخل اسم القصة"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cut-price">السعر (د.ك)</Label>
                    <Input
                      id="cut-price"
                      type="number"
                      step="0.001"
                      value={newCut.price}
                      onChange={(e) => setNewCut({...newCut, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cut-category">الفئة</Label>
                    <select 
                      id="cut-category"
                      value={newCut.category}
                      onChange={(e) => setNewCut({...newCut, category: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-blue-400"
                    >
                      <option value="رجالي">رجالي</option>
                      <option value="حريمي">حريمي</option>
                      <option value="الاثنين معا">الاثنين معا</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cut-description">الوصف</Label>
                    <Textarea
                      id="cut-description"
                      value={newCut.description}
                      onChange={(e) => setNewCut({...newCut, description: e.target.value})}
                      placeholder="أدخل وصف القصة..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cut-image">رابط الصورة</Label>
                    <div className="flex space-x-reverse space-x-2">
                      <Input
                        id="cut-image"
                        value={newCut.image}
                        onChange={(e) => setNewCut({...newCut, image: e.target.value})}
                        placeholder="رابط الصورة..."
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={addCut} className="bg-gradient-to-r from-amber-600 to-blue-500">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة القصة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cuts List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuts.map((cut) => (
                <Card key={cut.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4">
                    <img src={cut.image} alt={cut.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-800">{cut.name}</h3>
                        <Badge variant="secondary">{cut.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{cut.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-600">{cut.price.toFixed(3)} د.ك</span>
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 ml-1" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Accessories Tab */}
          <TabsContent value="accessories" className="space-y-6">
            {/* Add New Accessory Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-reverse space-x-3">
                  <Plus className="w-5 h-5 text-purple-600" />
                  <span>إضافة إكسسوار جديد</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="acc-name">اسم الإكسسوار</Label>
                    <Input
                      id="acc-name"
                      value={newAccessory.name}
                      onChange={(e) => setNewAccessory({...newAccessory, name: e.target.value})}
                      placeholder="أدخل اسم الإكسسوار"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acc-price">السعر (د.ك)</Label>
                    <Input
                      id="acc-price"
                      type="number"
                      step="0.001"
                      value={newAccessory.price}
                      onChange={(e) => setNewAccessory({...newAccessory, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.000"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="acc-description">الوصف</Label>
                    <Textarea
                      id="acc-description"
                      value={newAccessory.description}
                      onChange={(e) => setNewAccessory({...newAccessory, description: e.target.value})}
                      placeholder="أدخل وصف الإكسسوار..."
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={addAccessory} className="bg-gradient-to-r from-purple-600 to-amber-500">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة الإكسسوار
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Accessories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessories.map((accessory) => (
                <Card key={accessory.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4">
                    <img src={accessory.image} alt={accessory.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-800">{accessory.name}</h3>
                      <p className="text-sm text-gray-600">{accessory.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-purple-600">{accessory.price.toFixed(3)} د.ك</span>
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 ml-1" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Add New Service Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-reverse space-x-3">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span>إضافة مصنعية جديدة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">اسم المصنعية</Label>
                    <Input
                      id="service-name"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      placeholder="أدخل اسم المصنعية"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-price">السعر (د.ك)</Label>
                    <Input
                      id="service-price"
                      type="number"
                      step="0.001"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.000"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="service-description">الوصف</Label>
                    <Textarea
                      id="service-description"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      placeholder="أدخل وصف المصنعية..."
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={addService} className="bg-gradient-to-r from-green-600 to-blue-500">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة المصنعية
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                        <span className="font-bold text-green-600">{service.price.toFixed(3)} د.ك</span>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 ml-1" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductManagement;
