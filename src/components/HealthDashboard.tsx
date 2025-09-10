import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Heart, 
  Users, 
  Shield, 
  Phone,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import HealthChatbot from './HealthChatbot';
import TopicCards from './TopicCards';
import LanguageSelector from './LanguageSelector';
import HealthMascot from './HealthMascot';

interface HealthDashboardProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');

  const handleTopicClick = (topic: any) => {
    setActiveView('chat');
  };

  const quickStats = {
    en: {
      vaccinated: 'Children Vaccinated',
      healthCenters: 'Health Centers',
      awareness: 'Awareness Sessions',
      emergency: 'Emergency Helpline'
    },
    hi: {
      vaccinated: 'टीकाकृत बच्चे',
      healthCenters: 'स्वास्थ्य केंद्र',
      awareness: 'जागरूकता सत्र',
      emergency: 'आपातकालीन हेल्पलाइन'
    }
  };

  const content = selectedLanguage === 'hi' ? quickStats.hi : quickStats.en;

  if (activeView === 'chat') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveView('dashboard')}
              className="hover:bg-medical-light"
            >
              ← {selectedLanguage === 'hi' ? 'वापस' : 'Back'}
            </Button>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              compact
            />
          </div>
          <HealthChatbot 
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <HealthMascot size="lg" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-card-foreground mb-4 animate-fade-in">
            {selectedLanguage === 'hi' 
              ? 'स्वास्थ्य सहायक AI' 
              : 'AI Health Assistant'
            }
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            {selectedLanguage === 'hi'
              ? 'ग्रामीण और अर्ध-शहरी क्षेत्रों के लिए टीकाकरण, बीमारी की रोकथाम और स्वास्थ्य जागरूकता'
              : 'Vaccination, disease prevention, and health awareness for rural and semi-urban communities'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              onClick={() => setActiveView('chat')}
              className="bg-medical hover:bg-medical-accent text-white shadow-soft"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {selectedLanguage === 'hi' ? 'अभी चैट करें' : 'Start Chat Now'}
            </Button>
            
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-12 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-soft bg-medical-light/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-medical rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-medical">2.5M+</div>
                <div className="text-sm text-muted-foreground">{content.vaccinated}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft bg-trust-light/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-trust rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-trust">15,000+</div>
                <div className="text-sm text-muted-foreground">{content.healthCenters}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft bg-warning/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-warning">50,000+</div>
                <div className="text-sm text-muted-foreground">{content.awareness}</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft bg-danger/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-danger rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-danger">102</div>
                <div className="text-sm text-muted-foreground">{content.emergency}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Health Topics */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              {selectedLanguage === 'hi' ? 'स्वास्थ्य विषय' : 'Health Topics'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {selectedLanguage === 'hi'
                ? 'जानकारी प्राप्त करने के लिए किसी भी विषय पर क्लिक करें'
                : 'Click on any topic to get information'
              }
            </p>
          </div>
          
          <TopicCards 
            selectedLanguage={selectedLanguage}
            onTopicClick={handleTopicClick}
          />
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-danger/10 border-l-4 border-danger py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-danger" />
            <div>
              <h3 className="font-semibold text-card-foreground">
                {selectedLanguage === 'hi' ? 'आपातकालीन स्थिति?' : 'Medical Emergency?'}
              </h3>
              <p className="text-muted-foreground">
                {selectedLanguage === 'hi'
                  ? 'तुरंत 102 पर कॉल करें या नजदीकी अस्पताल जाएं'
                  : 'Call 102 immediately or visit the nearest hospital'
                }
              </p>
            </div>
            <Button variant="destructive" size="lg" className="ml-auto">
              <Phone className="w-4 h-4 mr-2" />
              102
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <HealthMascot size="sm" />
          </div>
          <p className="text-muted-foreground text-sm">
            {selectedLanguage === 'hi'
              ? '⚠️ यह जानकारी केवल जागरूकता के लिए है। चिकित्सा सलाह के लिए डॉक्टर से सलाह लें।'
              : '⚠️ This information is for awareness only. Please consult a doctor for medical advice.'
            }
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            {selectedLanguage === 'hi' 
              ? 'स्वास्थ्य मंत्रालय, भारत सरकार के सहयोग से'
              : 'In collaboration with Ministry of Health, Government of India'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HealthDashboard;