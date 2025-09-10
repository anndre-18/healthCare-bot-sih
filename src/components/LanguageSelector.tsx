import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  popular?: boolean;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  compact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange, 
  compact = false 
}) => {
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', popular: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', popular: true },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <select 
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-transparent border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-medical"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <Card className="p-4 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-medical" />
        <h3 className="font-semibold text-card-foreground">
          Choose Your Language / अपनी भाषा चुनें
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            onClick={() => onLanguageChange(lang.code)}
            className={`
              relative justify-start h-auto p-3 text-left
              ${selectedLanguage === lang.code 
                ? 'bg-medical text-white shadow-soft' 
                : 'hover:bg-medical-light hover:border-medical'
              }
            `}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="font-medium text-sm">{lang.nativeName}</div>
                <div className="text-xs opacity-80">{lang.name}</div>
              </div>
              {selectedLanguage === lang.code && (
                <Check className="w-4 h-4" />
              )}
            </div>
            {lang.popular && selectedLanguage !== lang.code && (
              <Badge 
                variant="secondary" 
                className="absolute -top-1 -right-1 text-xs px-1 py-0 bg-trust-light text-trust"
              >
                Popular
              </Badge>
            )}
          </Button>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        More languages coming soon / अधिक भाषाएं जल्द ही आएंगी
      </p>
    </Card>
  );
};

export default LanguageSelector;