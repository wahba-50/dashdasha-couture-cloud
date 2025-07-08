
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Calendar, Package, Ruler, Scissors } from "lucide-react";

const PieceDetails = () => {
  const { pieceId } = useParams();
  const navigate = useNavigate();
  const [pieceData, setPieceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('pieceId from useParams:', pieceId);
    console.log('Window location:', window.location.pathname);
    
    const fetchPieceData = () => {
      console.log('Looking for pieceId:', pieceId);
      console.log('All localStorage keys:', Object.keys(localStorage));
      
      // Try different possible keys for orders
      const possibleKeys = ['orders', 'workshopOrders', 'orderData'];
      let orders = [];
      
      for (const key of possibleKeys) {
        const storedData = localStorage.getItem(key);
        console.log(`Checking localStorage key "${key}":`, storedData ? `Data found (${storedData.length} chars)` : 'No data');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            console.log(`Parsed data for "${key}":`, parsedData);
            if (Array.isArray(parsedData)) {
              orders = parsedData;
              console.log(`Found orders array in "${key}":`, orders.length, 'orders');
              break;
            } else if (parsedData && typeof parsedData === 'object') {
              // Handle single order object
              orders = [parsedData];
              console.log(`Found single order in "${key}":`, orders);
              break;
            }
          } catch (e) {
            console.log(`Error parsing localStorage key "${key}":`, e);
          }
        }
      }
      
      console.log('Found orders:', orders);
      
      if (orders.length > 0) {
        // Find the order that contains this piece
        for (const order of orders) {
          console.log('Checking order:', order.id, 'QR codes:', order.qrCodes);
          
          if (order.qrCodes && order.qrCodes.includes(pieceId)) {
            console.log('Found order with matching QR code:', order.id);
            
            // Find the specific item details for this piece
            const pieceItem = order.itemDetails?.find((item: any) => item.qrCode === pieceId);
            const fullItem = order.fullOrderData?.items?.find((item: any) => item.qrCode === pieceId);
            
            console.log('Piece item found:', pieceItem);
            console.log('Full item found:', fullItem);
            
            if (pieceItem) {
              const pieceData = {
                orderId: order.id,
                itemCode: pieceId,
                customerName: order.customerName,
                customerPhone: order.phone,
                fabric: pieceItem.fabric,
                fabricSpecifications: fullItem?.fabric?.specifications || '',
                cut: pieceItem.cut,
                accessories: fullItem?.accessories || [],
                deliveryDate: order.deliveryDate,
                createdAt: order.createdAt,
                workshopName: "ورشة الأناقة الكويتية",
                workshopPhone: "+965 2262 8945",
                workshopAddress: "حولي، شارع تونس، مجمع الأناقة التجاري",
                measurements: order.customerMeasurements || {},
                status: order.status,
                cutter: order.cutter,
                totalAmount: order.total,
                timestamp: new Date().toISOString()
              };
              
              console.log('Setting piece data:', pieceData);
              setPieceData(pieceData);
              setLoading(false);
              return;
            }
          }
        }
      }
      
      console.log('No piece data found for:', pieceId);
      // If no data found, set pieceData to null to show not found message
      setPieceData(null);
      setLoading(false);
    };

    if (pieceId) {
      setTimeout(fetchPieceData, 500); // Simulate loading time
    }
  }, [pieceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm">جاري تحميل تفاصيل القطعة...</p>
        </div>
      </div>
    );
  }

  if (!pieceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold mb-2">القطعة غير موجودة</h2>
            <p className="text-gray-600 mb-4">لم يتم العثور على تفاصيل هذه القطعة</p>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'جاري الإنتاج': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'مكتمل': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="outline" onClick={() => navigate('/')} className="text-xs sm:text-sm">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            العودة
          </Button>
          <Badge className={`${getStatusColor(pieceData.status)} border text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2`}>
            {pieceData.status}
          </Badge>
        </div>

        {/* Workshop Info */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold">{pieceData.workshopName}</h1>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">{pieceData.workshopAddress}</p>
              <p className="text-gray-600 text-xs sm:text-sm">{pieceData.workshopPhone}</p>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Piece Code - Enhanced mobile responsiveness */}
        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="break-all">
              <Badge className="font-mono text-lg sm:text-2xl px-3 sm:px-6 py-2 sm:py-3 bg-primary inline-block max-w-full">
                <span className="block sm:inline">{pieceData.itemCode}</span>
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">رمز القطعة</p>
          </CardContent>
        </Card>

        {/* Order Information */}
        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              معلومات الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-gray-600 text-xs sm:text-sm">رقم الطلب:</span>
                  <p className="font-semibold text-sm sm:text-base">{pieceData.orderId}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs sm:text-sm">تاريخ الطلب:</span>
                  <p className="font-semibold text-sm sm:text-base">{pieceData.createdAt}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-gray-600 text-xs sm:text-sm">تاريخ التسليم:</span>
                  <p className="font-semibold text-sm sm:text-base">{pieceData.deliveryDate}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs sm:text-sm">إجمالي الطلب:</span>
                  <p className="font-semibold text-primary text-sm sm:text-base">{pieceData.totalAmount.toFixed(3)} د.ك</p>
                </div>
              </div>
            </div>
            {pieceData.cutter && (
              <div className="pt-2 border-t">
                <span className="text-gray-600 text-xs sm:text-sm">القصاص المسؤول:</span>
                <p className="font-semibold flex items-center text-sm sm:text-base">
                  <Scissors className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {pieceData.cutter}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              معلومات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">الاسم:</span>
              <p className="font-semibold text-sm sm:text-base">{pieceData.customerName}</p>
            </div>
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">الهاتف:</span>
              <p className="font-semibold flex items-center text-sm sm:text-base break-all">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                {pieceData.customerPhone}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Piece Details */}
        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">تفاصيل القطعة</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">نوع القماش:</span>
              <p className="font-semibold text-sm sm:text-base">{pieceData.fabric}</p>
              {pieceData.fabricSpecifications && (
                <p className="text-xs text-gray-600 mt-1">{pieceData.fabricSpecifications}</p>
              )}
            </div>
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">نوع القصة:</span>
              <p className="font-semibold text-sm sm:text-base">{pieceData.cut}</p>
            </div>
            {pieceData.accessories && pieceData.accessories.length > 0 && (
              <div>
                <span className="text-gray-600 text-xs sm:text-sm">الإكسسوارات:</span>
                <div className="mt-1 space-y-1">
                  {pieceData.accessories.map((accessory: any, index: number) => (
                    <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                      <span className="font-medium">{accessory.name}</span>
                      {accessory.quantity && <span className="text-gray-600"> - عدد: {accessory.quantity}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Measurements */}
        {pieceData.measurements && Object.keys(pieceData.measurements).length > 0 && (
          <Card>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
                قياسات العميل
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {Object.entries(pieceData.measurements)
                  .filter(([key, value]) => key !== 'notes' && value && value.toString().trim())
                  .map(([key, value]) => (
                    <div key={key} className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">{key}</p>
                      <p className="font-bold text-sm sm:text-lg">{String(value)} سم</p>
                    </div>
                  ))}
              </div>
              {pieceData.measurements.notes && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border">
                  <p className="text-xs text-gray-600 mb-1">ملاحظات القياسات:</p>
                  <p className="text-sm font-medium">{pieceData.measurements.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Timestamp */}
        <Card>
          <CardContent className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-600">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            تم إنشاء هذا الرمز في: {new Date(pieceData.timestamp).toLocaleString('ar-KW')}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PieceDetails;
