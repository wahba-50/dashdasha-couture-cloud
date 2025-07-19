
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  const updateMeasurement = (field: keyof MeasurementsData, value: string) => {
    onMeasurementsChange({ ...measurements, [field]: value });
  };

  const convertValue = (value: string, fromUnit: 'cm' | 'inch', toUnit: 'cm' | 'inch'): string => {
    if (!value || fromUnit === toUnit) return value;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    
    if (fromUnit === 'cm' && toUnit === 'inch') {
      return (numValue / 2.54).toFixed(1);
    } else if (fromUnit === 'inch' && toUnit === 'cm') {
      return (numValue * 2.54).toFixed(1);
    }
    return value;
  };

  const handleUnitChange = (newUnit: 'cm' | 'inch') => {
    if (newUnit === unit) return;
    
    const convertedMeasurements = { ...measurements };
    Object.keys(measurements).forEach(key => {
      if (key !== 'notes') {
        convertedMeasurements[key as keyof MeasurementsData] = convertValue(
          measurements[key as keyof MeasurementsData], 
          unit, 
          newUnit
        );
      }
    });
    
    onMeasurementsChange(convertedMeasurements);
    setUnit(newUnit);
  };

  const getUnitText = () => unit === 'cm' ? 'سم' : 'انش';
  const getPlaceholderValue = (defaultCm: string) => {
    if (unit === 'cm') return `مثال: ${defaultCm}`;
    const inchValue = convertValue(defaultCm, 'cm', 'inch');
    return `مثال: ${inchValue}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            قياسات العميل
          </CardTitle>
          {!readOnly && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant={unit === 'cm' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleUnitChange('cm')}
              >
                سم
              </Button>
              <Button
                type="button"
                variant={unit === 'inch' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleUnitChange('inch')}
              >
                انش
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="chest">الصدر ({getUnitText()})</Label>
            <Input
              id="chest"
              type="number"
              step="0.1"
              value={measurements.chest}
              onChange={(e) => updateMeasurement('chest', e.target.value)}
              placeholder={getPlaceholderValue('110')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="waist">الخصر ({getUnitText()})</Label>
            <Input
              id="waist"
              type="number"
              step="0.1"
              value={measurements.waist}
              onChange={(e) => updateMeasurement('waist', e.target.value)}
              placeholder={getPlaceholderValue('95')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="shoulder">الكتف ({getUnitText()})</Label>
            <Input
              id="shoulder"
              type="number"
              step="0.1"
              value={measurements.shoulder}
              onChange={(e) => updateMeasurement('shoulder', e.target.value)}
              placeholder={getPlaceholderValue('45')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="length">الطول الكلي ({getUnitText()})</Label>
            <Input
              id="length"
              type="number"
              step="0.1"
              value={measurements.length}
              onChange={(e) => updateMeasurement('length', e.target.value)}
              placeholder={getPlaceholderValue('150')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="armLength">طول الكم ({getUnitText()})</Label>
            <Input
              id="armLength"
              type="number"
              step="0.1"
              value={measurements.armLength}
              onChange={(e) => updateMeasurement('armLength', e.target.value)}
              placeholder={getPlaceholderValue('60')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="neckCircumference">محيط الرقبة ({getUnitText()})</Label>
            <Input
              id="neckCircumference"
              type="number"
              step="0.1"
              value={measurements.neckCircumference}
              onChange={(e) => updateMeasurement('neckCircumference', e.target.value)}
              placeholder={getPlaceholderValue('42')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="armOpening">فتحة الذراع ({getUnitText()})</Label>
            <Input
              id="armOpening"
              type="number"
              step="0.1"
              value={measurements.armOpening}
              onChange={(e) => updateMeasurement('armOpening', e.target.value)}
              placeholder={getPlaceholderValue('25')}
              readOnly={readOnly}
              className={readOnly ? 'bg-gray-50' : ''}
            />
          </div>

          <div>
            <Label htmlFor="bottomWidth">عرض الأسفل ({getUnitText()})</Label>
            <Input
              id="bottomWidth"
              type="number"
              step="0.1"
              value={measurements.bottomWidth}
              onChange={(e) => updateMeasurement('bottomWidth', e.target.value)}
              placeholder={getPlaceholderValue('65')}
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
