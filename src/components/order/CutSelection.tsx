
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors } from "lucide-react";

interface Cut {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CutSelectionProps {
  currentItem: any;
  setCurrentItem: (item: any) => void;
  cuts: Cut[];
}

const CutSelection = ({ currentItem, setCurrentItem, cuts }: CutSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="w-5 h-5" />
          اختيار القصة
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
  );
};

export default CutSelection;
