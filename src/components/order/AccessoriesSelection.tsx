
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";

interface Accessory {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface AccessoriesSelectionProps {
  currentItem: any;
  setCurrentItem: (item: any) => void;
  accessories: Accessory[];
}

const AccessoriesSelection = ({ currentItem, setCurrentItem, accessories }: AccessoriesSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shirt className="w-5 h-5" />
          الإكسسوارات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {accessories.map(accessory => {
            const selectedAcc = currentItem.accessories?.find((a: any) => a.id === accessory.id);
            return (
              <Card 
                key={accessory.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAcc ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-3 text-center">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 w-16 h-16 mx-auto"></div>
                  <h4 className="font-medium text-xs">{accessory.name}</h4>
                  <p className="text-xs text-primary font-semibold">{accessory.price.toFixed(3)} د.ك</p>
                  
                  {selectedAcc ? (
                    <div className="flex items-center gap-1 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-6 h-6 p-0"
                        onClick={() => {
                          const newQuantity = Math.max(0, selectedAcc.quantity - 1);
                          if (newQuantity === 0) {
                            setCurrentItem({
                              ...currentItem,
                              accessories: currentItem.accessories?.filter((a: any) => a.id !== accessory.id)
                            });
                          } else {
                            setCurrentItem({
                              ...currentItem,
                              accessories: currentItem.accessories?.map((a: any) => 
                                a.id === accessory.id ? {...a, quantity: newQuantity} : a
                              )
                            });
                          }
                        }}
                      >
                        -
                      </Button>
                      <span className="text-xs font-bold w-8 text-center">{selectedAcc.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-6 h-6 p-0"
                        onClick={() => {
                          setCurrentItem({
                            ...currentItem,
                            accessories: currentItem.accessories?.map((a: any) => 
                              a.id === accessory.id ? {...a, quantity: a.quantity + 1} : a
                            )
                          });
                        }}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2 text-xs"
                      onClick={() => {
                        const newAccessories = [...(currentItem.accessories || []), {
                          ...accessory,
                          quantity: 1
                        }];
                        setCurrentItem({...currentItem, accessories: newAccessories});
                      }}
                    >
                      إضافة
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessoriesSelection;
