
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface Labor {
  id: string;
  name: string;
  price: number;
}

interface LaborSelectionProps {
  currentItem: any;
  setCurrentItem: (item: any) => void;
  labors: Labor[];
}

const LaborSelection = ({ currentItem, setCurrentItem, labors }: LaborSelectionProps) => {
  return (
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
            const isSelected = currentItem.labors?.some((l: any) => l.id === labor.id);
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
                      labors: currentItem.labors?.filter((l: any) => l.id !== labor.id)
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
  );
};

export default LaborSelection;
