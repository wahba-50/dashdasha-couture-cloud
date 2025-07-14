
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
    const findPieceData = () => {
      try {
        // Get workshop ID from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const workshopId = urlParams.get('workshop');
        
        // Load workshop orders from localStorage
        const workshopOrdersKey = workshopId ? `workshopOrders_${workshopId}` : 'workshopOrders';
        const orders = JSON.parse(localStorage.getItem(workshopOrdersKey) || '[]');
        
        // Also check the main orders storage
        const allOrders = JSON.parse(localStorage.getItem('allWorkshopOrders') || '[]');
        
        // Find the piece with matching QR code
        let foundPiece = null;
        let foundOrder = null;
        let foundWorkshop = null;

        // Search in workshop-specific orders first
        for (const order of orders) {
          if (order.itemDetails) {
            const piece = order.itemDetails.find((item: any) => item.qrCode === pieceId);
            if (piece) {
              foundPiece = piece;
              foundOrder = order;
              foundWorkshop = {
                id: workshopId,
                name: "ورشة الأناقة الكويتية",
                address: "حولي، شارع تونس، مجمع الأناقة التجاري",
                phone: "+965 2262 8945"
              };
              break;
            }
          }
        }

        // If not found, search in all orders
        if (!foundPiece) {
          for (const workshop of allOrders) {
            for (const order of workshop.orders || []) {
              if (order.itemDetails) {
                const piece = order.itemDetails.find((item: any) => item.qrCode === pieceId);
                if (piece) {
                  foundPiece = piece;
                  foundOrder = order;
                  foundWorkshop = workshop;
                  break;
                }
              }
            }
            if (foundPiece) break;
          }
        }

        if (foundPiece && foundOrder) {
          // Get full item details from fullOrderData if available
          const fullItem = foundOrder.fullOrderData?.items?.find((item: any) => item.qrCode === pieceId);
          
          // Create the piece data object
          const pieceData = {
            orderId: foundOrder.id,
            itemCode: pieceId,
            customerName: foundOrder.customerName,
            customerPhone: foundOrder.phone,
            fabric: foundPiece.fabric,
            cut: foundPiece.cut,
            deliveryDate: foundOrder.deliveryDate,
            createdAt: foundOrder.createdAt,
            workshopName: foundWorkshop?.name || "ورشة الأناقة الكويتية",
            workshopPhone: foundWorkshop?.phone || "+965 2262 8945",
            workshopAddress: foundWorkshop?.address || "حولي، شارع تونس، مجمع الأناقة التجاري",
            measurements: foundOrder.measurements || {},
            status: foundOrder.status || 'جديد',
            cutter: foundOrder.cutter || null,
            totalAmount: foundOrder.total || 0,
            timestamp: foundOrder.createdAt || new Date().toISOString(),
            fullDetails: fullItem,
            accessories: fullItem?.accessories || [],
            labors: fullItem?.labors || [],
            fabricCode: foundPiece.fabricCode,
            fabricColor: foundPiece.fabricColor,
            fabricType: foundPiece.fabricType
          };
          
          setPieceData(pieceData);
        }
      } catch (error) {
        console.error('Error loading piece data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pieceId) {
      findPieceData();
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
              <p className="font-semibold text-sm sm:text-base">
                {(() => {
                  // Check fabric type from various sources
                  const fabricType = pieceData.fabricType || pieceData.fullDetails?.fabricType;
                  const isCustomerFabric = fabricType === 'customer' || 
                                          pieceData.fullDetails?.fabric?.specifications ||
                                          (typeof pieceData.fabric === 'string' && pieceData.fabric.includes('قماش العميل'));
                  
                  if (isCustomerFabric) {
                    const specifications = pieceData.fullDetails?.fabric?.specifications || 
                                         pieceData.fabric?.specifications || 
                                         pieceData.fullDetails?.customerFabricDetails || 
                                         pieceData.customerFabricDetails ||
                                         '';
                    return `قماش العميل${specifications ? ` - ${specifications}` : ''}`;
                  } else {
                    // Handle workshop fabric - check if fabric is an object or string
                    let fabricName = '';
                    if (typeof pieceData.fabric === 'object' && pieceData.fabric?.name) {
                      fabricName = pieceData.fabric.name;
                    } else if (typeof pieceData.fabric === 'string') {
                      fabricName = pieceData.fabric;
                    } else if (pieceData.fullDetails?.fabric?.name) {
                      fabricName = pieceData.fullDetails.fabric.name;
                    }
                    
                    return `${fabricName}${pieceData.fabricCode ? ` - كود: ${pieceData.fabricCode}` : ''}${pieceData.fabricColor ? ` - لون: ${pieceData.fabricColor}` : ''}`;
                  }
                })()}
              </p>
            </div>
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">نوع القصة:</span>
              <p className="font-semibold text-sm sm:text-base">{pieceData.cut}</p>
            </div>
            
            {/* Accessories */}
            {pieceData.accessories && pieceData.accessories.length > 0 && (
              <div>
                <span className="text-gray-600 text-xs sm:text-sm">الإكسسوارات:</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pieceData.accessories.map((accessory: any, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {accessory.name} - عدد: {accessory.quantity || 1}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Labors */}
            {pieceData.labors && pieceData.labors.length > 0 && (
              <div>
                <span className="text-gray-600 text-xs sm:text-sm">الأعمال الإضافية:</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pieceData.labors.map((labor: any, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {labor.name} - السعر: {labor.price} د.ك
                    </Badge>
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
                {Object.entries(pieceData.measurements).map(([key, value]) => {
                  if (!value) return null;
                  
                  const measurementLabels: { [key: string]: string } = {
                    chest: 'قياس الصدر',
                    waist: 'قياس الخصر',
                    hips: 'قياس الأرداف',
                    shoulder: 'قياس الكتف',
                    armLength: 'طول الذراع',
                    thighLength: 'طول الفخذ',
                    totalLength: 'الطول الكامل',
                    neckCircumference: 'محيط الرقبة',
                    wristCircumference: 'محيط المعصم',
                    bicepCircumference: 'محيط العضد',
                    waistHeight: 'ارتفاع الخصر',
                    pantLength: 'طول البنطلون',
                    inseam: 'الطول الداخلي',
                    rise: 'ارتفاع المنشعب',
                    neck: 'الرقبة',
                    length: 'الطول',
                    sleeve: 'الكم',
                    armhole: 'فتحة الذراع'
                  };
                  
                  return (
                    <div key={key} className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">{measurementLabels[key] || key}</p>
                      <p className="font-bold text-sm sm:text-lg">{String(value)} سم</p>
                    </div>
                  );
                })}
              </div>
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
