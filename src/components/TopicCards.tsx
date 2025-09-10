import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Syringe, 
  Heart, 
  Shield, 
  Baby, 
  AlertTriangle, 
  Thermometer,
  Droplets,
  Apple
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  urgent?: boolean;
  popular?: boolean;
}

interface TopicCardsProps {
  selectedLanguage: string;
  onTopicClick: (topic: Topic) => void;
}

const TopicCards: React.FC<TopicCardsProps> = ({ selectedLanguage, onTopicClick }) => {
  const topics: Record<string, Topic[]> = {
    en: [
      {
        id: 'vaccination',
        title: 'Vaccination Schedule',
        description: 'Complete immunization schedule for children and adults',
        icon: <Syringe className="w-6 h-6" />,
        category: 'Prevention',
        popular: true
      },
      {
        id: 'disease-symptoms',
        title: 'Disease Symptoms',
        description: 'Recognize symptoms of common diseases like dengue, malaria',
        icon: <Thermometer className="w-6 h-6" />,
        category: 'Health Alert',
        urgent: true
      },
      {
        id: 'preventive-care',
        title: 'Preventive Care',
        description: 'Daily health habits and seasonal disease prevention',
        icon: <Shield className="w-6 h-6" />,
        category: 'Wellness'
      },
      {
        id: 'maternal-child',
        title: 'Mother & Child Health',
        description: 'Pregnancy care, newborn health, and nutrition',
        icon: <Baby className="w-6 h-6" />,
        category: 'Family Health'
      },
      {
        id: 'emergency-signs',
        title: 'Emergency Warning Signs',
        description: 'When to seek immediate medical attention',
        icon: <AlertTriangle className="w-6 h-6" />,
        category: 'Emergency',
        urgent: true
      },
      {
        id: 'nutrition',
        title: 'Nutrition & Diet',
        description: 'Healthy eating for disease prevention',
        icon: <Apple className="w-6 h-6" />,
        category: 'Wellness'
      }
    ],
    hi: [
      {
        id: 'vaccination',
        title: 'टीकाकरण कार्यक्रम',
        description: 'बच्चों और बड़ों के लिए पूरी टीकाकरण तालिका',
        icon: <Syringe className="w-6 h-6" />,
        category: 'रोकथाम',
        popular: true
      },
      {
        id: 'disease-symptoms',
        title: 'बीमारी के लक्षण',
        description: 'डेंगू, मलेरिया जैसी आम बीमारियों के लक्षण पहचानें',
        icon: <Thermometer className="w-6 h-6" />,
        category: 'स्वास्थ्य चेतावनी',
        urgent: true
      },
      {
        id: 'preventive-care',
        title: 'बचाव की देखभाल',
        description: 'दैनिक स्वास्थ्य आदतें और मौसमी बीमारियों से बचाव',
        icon: <Shield className="w-6 h-6" />,
        category: 'कल्याण'
      },
      {
        id: 'maternal-child',
        title: 'मां और बच्चे का स्वास्थ्य',
        description: 'गर्भावस्था की देखभाल, नवजात स्वास्थ्य और पोषण',
        icon: <Baby className="w-6 h-6" />,
        category: 'पारिवारिक स्वास्थ्य'
      },
      {
        id: 'emergency-signs',
        title: 'आपातकालीन चेतावनी के संकेत',
        description: 'कब तुरंत चिकित्सा सहायता लेनी चाहिए',
        icon: <AlertTriangle className="w-6 h-6" />,
        category: 'आपातकाल',
        urgent: true
      },
      {
        id: 'nutrition',
        title: 'पोषण और आहार',
        description: 'बीमारी की रोकथाम के लिए स्वस्थ भोजन',
        icon: <Apple className="w-6 h-6" />,
        category: 'कल्याण'
      }
    ]
  };

  const currentTopics = topics[selectedLanguage === 'hi' ? 'hi' : 'en'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentTopics.map((topic, index) => (
        <Card 
          key={topic.id} 
          className="hover:shadow-card transition-all duration-300 cursor-pointer group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onTopicClick(topic)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${topic.urgent ? 'bg-danger/10 text-danger' : 'bg-medical-light text-medical'}
                group-hover:scale-110 transition-transform duration-300
              `}>
                {topic.icon}
              </div>
              <div className="flex flex-col gap-1">
                {topic.popular && (
                  <Badge variant="secondary" className="text-xs bg-trust-light text-trust">
                    {selectedLanguage === 'hi' ? 'लोकप्रिय' : 'Popular'}
                  </Badge>
                )}
                {topic.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    {selectedLanguage === 'hi' ? 'जरूरी' : 'Urgent'}
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-lg group-hover:text-medical transition-colors">
              {topic.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {topic.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {topic.category}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-medical hover:bg-medical-light"
              >
                {selectedLanguage === 'hi' ? 'जानें' : 'Learn More'} →
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopicCards;