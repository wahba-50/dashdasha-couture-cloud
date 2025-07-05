
import React from 'react';
import { Button } from "@/components/ui/button";
import FabricSelection from './FabricSelection';
import CutSelection from './CutSelection';
import AccessoriesSelection from './AccessoriesSelection';
import LaborSelection from './LaborSelection';
import ItemSummary from './ItemSummary';

interface ItemBuilderProps {
  currentItem: any;
  setCurrentItem: (item: any) => void;
  onAddItem: () => void;
  onCancel: () => void;
  calculateItemTotal: (item: any) => number;
  workshopFabrics: any[];
  cuts: any[];
  accessories: any[];
  labors: any[];
}

const ItemBuilder = ({ 
  currentItem, 
  setCurrentItem, 
  onAddItem, 
  onCancel, 
  calculateItemTotal,
  workshopFabrics,
  cuts,
  accessories,
  labors
}: ItemBuilderProps) => {
  return (
    <div className="space-y-6">
      <FabricSelection 
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        workshopFabrics={workshopFabrics}
      />
      
      <CutSelection 
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        cuts={cuts}
      />
      
      <AccessoriesSelection 
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        accessories={accessories}
      />
      
      <LaborSelection 
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        labors={labors}
      />
      
      <ItemSummary 
        currentItem={currentItem}
        calculateItemTotal={calculateItemTotal}
      />
      
      <div className="flex gap-2">
        <Button onClick={onAddItem} disabled={!currentItem.fabric || !currentItem.cut} className="flex-1">
          إضافة القطعة
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          إلغاء
        </Button>
      </div>
    </div>
  );
};

export default ItemBuilder;
