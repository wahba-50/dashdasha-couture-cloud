
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

interface SystemHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const SystemHeader = ({ title, subtitle, showBackButton = false, actions }: SystemHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b-2 border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-amber-500 rounded-lg flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            {actions}
            <Button variant="outline" size="icon" className="shrink-0">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SystemHeader;
