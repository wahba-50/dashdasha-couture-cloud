
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor?: string;
}

const StatsCard = ({ title, value, icon: Icon, gradient, iconColor = "text-white/80" }: StatsCardProps) => {
  return (
    <Card className={`${gradient} text-white hover:scale-[1.02] transition-transform duration-200`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={`text-xs sm:text-sm ${iconColor.replace('text-', 'text-').replace('/80', '/70')}`}>
              {title}
            </p>
            <p className="text-xl sm:text-3xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor} shrink-0`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
