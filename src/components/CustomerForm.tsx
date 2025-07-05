import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerFormProps {
  onNext: (customerData: any) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    // Enable the "Next" button only when both name and phone are filled
    setIsNextButtonDisabled(!(name.trim() !== '' && phone.trim() !== ''));
  }, [name, phone]);

  const handleNext = () => {
    const customerData = {
      name,
      phone,
      email,
      gender
    };
    onNext(customerData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{t('الاسم')}</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">{t('رقم الهاتف')}</Label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">{t('البريد الإلكتروني')}</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>{t('الجنس')}</Label>
          <RadioGroup defaultValue={gender || undefined} onValueChange={setGender}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" className="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
              <Label htmlFor="male" className="cursor-pointer peer-checked:text-primary">
                {t('ذكر')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" className="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
              <Label htmlFor="female" className="cursor-pointer peer-checked:text-primary">
                {t('أنثى')}
              </Label>
            </div>
            {!gender ? (
                          <span className="text-gray-500">لا يوجد</span>
                        ) : null}
          </RadioGroup>
        </div>
      </div>
      <div>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isNextButtonDisabled}
        >
          {t('التالي')}
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
