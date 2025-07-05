
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, User } from "lucide-react";

interface MeasurementsData {
  chest: string;
  waist: string;
  shoulder: string;
  length: string;
  armLength: string;
  neckCircumference: string;
  armOpening: string;
  bottomWidth: string;
  notes: string;
}

interface CustomerMeasurementsProps {
  measurements: MeasurementsData;
  onMeasurementsChange: (measurements: MeasurementsData) => void;
  readOnly?: boolean;
}

const CustomerMeasurements = ({ measurements, onMeasurementsChange, readOnly = false }: CustomerMeasurementsProps) => {
  const updateMeasurement = (field: keyof MeasurementsData, value: string) => {
    onMeasurementsChange({ ...measurements, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="w-5 h-5" />
          قياسات العميل
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="chest">الصدر (سم)</Label>
            <Input
              id="chest"
              type="number"
              step="0.5"
              value={measurements.chest}
              onChange={(e) => updateMeasurement('chest', e.target.value)}
              placeholder="مثال: 110"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="waist">الخصر (سم)</Label>
            <Input
              id="waist"
              type="number"
              step="0.5"
              value={measurements.waist}
              onChange={(e) => updateMeasurement('waist', e.target.value)}
              placeholder="مثال: 95"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="shoulder">الكتف (سم)</Label>
            <Input
              id="shoulder"
              type="number"
              step="0.5"
              value={measurements.shoulder}
              onChange={(e) => updateMeasurement('shoulder', e.target.value)}
              placeholder="مثال: 45"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="length">الطول الكلي (سم)</Label>
            <Input
              id="length"
              type="number"
              step="0.5"
              value={measurements.length}
              onChange={(e) => updateMeasurement('length', e.target.value)}
              placeholder="مثال: 150"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="armLength">طول الكم (سم)</Label>
            <Input
              id="armLength"
              type="number"
              step="0.5"
              value={measurements.armLength}
              onChange={(e) => updateMeasurement('armLength', e.target.value)}
              placeholder="مثال: 60"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="neckCircumference">محيط الرقبة (سم)</Label>
            <Input
              id="neckCircumference"
              type="number"
              step="0.5"
              value={measurements.neckCircumference}
              onChange={(e) => updateMeasurement('neckCircumference', e.target.value)}
              placeholder="مثال: 42"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="armOpening">فتحة الذراع (سم)</Label>
            <Input
              id="armOpening"
              type="number"
              step="0.5"
              value={measurements.armOpening}
              onChange={(e) => updateMeasurement('armOpening', e.target.value)}
              placeholder="مثال: 25"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="bottomWidth">عرض الأسفل (سم)</Label>
            <Input
              id="bottomWidth"
              type="number"
              step="0.5"
              value={measurements.bottomWidth}
              onChange={(e) => updateMeasurement('bottomWidth', e.target.value)}
              placeholder="مثال: 65"
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Label htmlFor="notes">ملاحظات على القياسات</Label>
            <textarea
              id="notes"
              value={measurements.notes}
              onChange={(e) => updateMeasurement('notes', e.target.value)}
              placeholder="أي ملاحظات خاصة بالقياسات..."
              rows={3}
              readOnly={readOnly}
              className={`w-full mt-1 p-2 border rounded-md ${readOnly ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerMeasurements;
