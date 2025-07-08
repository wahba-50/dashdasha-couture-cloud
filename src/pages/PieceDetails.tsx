
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
    // In a real app, this would fetch from an API
    // For now, we'll simulate the data that would be stored with the QR code
    const fetchPieceData = () => {
      // This simulates getting data from a database or API
      const mockData = {
        orderId: 'ORD-001',
        itemCode: pieceId,
        customerName: 'أحمد محمد الكندري',
        customerPhone: '+96597712345678',
        fabric: 'قماش قطني فاخر',
        cut: 'قصة كلاسيكية',
        deliveryDate: '2024-07-15',
        createdAt: '2024-07-04',
        workshopName: "ورشة الأناقة الكويتية",
        workshopPhone: "+965 2262 8945",
        workshopAddress: "حولي، شارع تونس، مجمع الأناقة التجاري",
        measurements: {
          chest: 95,
          waist: 85,
          shoulder: 45,
          neck: 38,
          length: 145,
          sleeve: 60,
          armhole: 42
        },
        status: 'جديد',
        cutter: null,
        totalAmount: 45.500,
        timestamp: new Date().toISOString()
      };
      
      setPieceData(mockData);
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
            </div>
            <div>
              <span className="text-gray-600 text-xs sm:text-sm">نوع القصة:</span>
              <p className="font-semibold text-sm sm:text-base">{pieceData.cut}</p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Measurements */}
        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
              قياسات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الصدر</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.chest} سم</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الخصر</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.waist} سم</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الكتف</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.shoulder} سم</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الرقبة</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.neck} سم</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الطول</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.length} سم</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">الكم</p>
                <p className="font-bold text-sm sm:text-lg">{pieceData.measurements.sleeve} سم</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
