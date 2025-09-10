import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

interface HealthChatbotProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const HealthChatbot: React.FC<HealthChatbotProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: selectedLanguage === 'hi' 
        ? 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। मैं टीकाकरण, बीमारियों के लक्षण और स्वास्थ्य सुझावों के बारे में जानकारी दे सकता हूं।'
        : 'Hello! I am your health assistant. I can provide information about vaccination, disease symptoms, and health tips.',
      isUser: false,
      timestamp: new Date(),
      language: selectedLanguage
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Healthcare FAQ responses in multiple languages
  const healthResponses: Record<string, Record<string, string>> = {
    en: {
      'vaccination schedule': 'Children should get vaccinated according to India\'s National Immunization Schedule:\n\n• At birth: BCG, OPV-0, Hepatitis B-0\n• 6 weeks: OPV-1, DPT-1, Hepatitis B-1, Hib-1\n• 10 weeks: OPV-2, DPT-2, Hib-2\n• 14 weeks: OPV-3, DPT-3, Hib-3\n• 9 months: Measles-1, JE-1\n\n💡 Visit your nearest government health center for free vaccines.',
      'dengue symptoms': 'Dengue symptoms include:\n\n• Sudden high fever\n• Severe headache\n• Pain behind eyes\n• Muscle and joint pain\n• Red rash on skin\n\n⚠️ If you have these symptoms, go to a hospital immediately.',
      'prevent diseases': 'To prevent seasonal diseases:\n\n• Drink clean, boiled water\n• Wash hands with soap before eating\n• Use mosquito nets\n• Cover stored water\n• Eat fresh fruits and vegetables\n• Avoid outside food during monsoon',
      'why vaccines important': 'Vaccines protect against life-threatening diseases like polio, measles, TB, diphtheria, and whooping cough. They save lives and are free at government hospitals.',
      'default': 'I can help you with vaccination schedules, disease symptoms, and preventive healthcare tips. Please ask me about specific health topics.\n\n⚠️ This information is for awareness only. For medical advice, please consult a doctor.'
    },
    hi: {
      'vaccination schedule': 'बच्चों को भारत के राष्ट्रीय टीकाकरण कार्यक्रम के अनुसार टीके लगवाने चाहिए:\n\n• जन्म के समय: बीसीजी, ओपीवी-0, हेपेटाइटिस बी-0\n• 6 सप्ताह: ओपीवी-1, डीपीटी-1, हेपेटाइटिस बी-1, हिब-1\n• 10 सप्ताह: ओपीवी-2, डीपीटी-2, हिब-2\n• 14 सप्ताह: ओपीवी-3, डीपीटी-3, हिब-3\n• 9 महीने: खसरा-1, जेई-1\n\n💡 मुफ्त टीके के लिए अपने नजदीकी सरकारी स्वास्थ्य केंद्र जाएं।',
      'dengue symptoms': 'डेंगू के लक्षण:\n\n• अचानक तेज बुखार\n• सिर में तेज दर्द\n• आंखों के पीछे दर्द\n• मांसपेशियों और जोड़ों में दर्द\n• त्वचा पर लाल चकत्ते\n\n⚠️ यदि आपमें ये लक्षण हैं, तुरंत अस्पताल जाएं।',
      'prevent diseases': 'मौसमी बीमारियों से बचने के लिए:\n\n• साफ, उबला हुआ पानी पिएं\n• खाने से पहले साबुन से हाथ धोएं\n• मच्छरदानी का उपयोग करें\n• पानी को ढककर रखें\n• ताजे फल और सब्जियां खाएं\n• बारिश में बाहर का खाना न खाएं',
      'why vaccines important': 'टीके पोलियो, खसरा, टीबी, डिप्थीरिया और काली खांसी जैसी जानलेवा बीमारियों से बचाते हैं। ये जीवन बचाते हैं और सरकारी अस्पतालों में मुफ्त मिलते हैं।',
      'default': 'मैं आपकी टीकाकरण अनुसूची, बीमारी के लक्षण और स्वास्थ्य सुझावों में मदद कर सकता हूं। कृपया मुझसे स्वास्थ्य विषयों के बारे में पूछें।\n\n⚠️ यह जानकारी केवल जागरूकता के लिए है। चिकित्सा सलाह के लिए कृपया डॉक्टर से सलाह लें।'
    }
  };

  const getHealthResponse = (message: string): string => {
    const lang = selectedLanguage === 'hi' ? 'hi' : 'en';
    const responses = healthResponses[lang];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('vaccination') || lowerMessage.includes('vaccine') || lowerMessage.includes('टीका')) {
      return responses['vaccination schedule'];
    }
    if (lowerMessage.includes('dengue') || lowerMessage.includes('डेंगू')) {
      return responses['dengue symptoms'];
    }
    if (lowerMessage.includes('prevent') || lowerMessage.includes('बचाव')) {
      return responses['prevent diseases'];
    }
    if (lowerMessage.includes('important') || lowerMessage.includes('जरूरी')) {
      return responses['why vaccines important'];
    }
    
    return responses['default'];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getHealthResponse(currentMessage),
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);

      // Text-to-speech for bot response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse.text);
        utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech recognition not supported",
        description: "Please type your message instead.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCurrentMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Speech recognition error",
        description: "Please try again or type your message.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Card className="h-[600px] flex flex-col bg-card shadow-card">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-medical text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-medical" />
          </div>
          <div>
            <h3 className="font-semibold">
              {selectedLanguage === 'hi' ? 'स्वास्थ्य सहायक' : 'Health Assistant'}
            </h3>
            <p className="text-sm opacity-90">
              {selectedLanguage === 'hi' ? 'आपकी स्वास्थ्य जानकारी के लिए यहां हूं' : 'Here to help with your health queries'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-chat-bg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-chat-user text-white ml-auto'
                  : 'bg-card shadow-soft border'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-card p-3 rounded-lg shadow-soft border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-medical rounded-full animate-pulse-gentle"></div>
                <div className="w-2 h-2 bg-medical rounded-full animate-pulse-gentle" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-medical rounded-full animate-pulse-gentle" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder={selectedLanguage === 'hi' ? 'अपना सवाल लिखें...' : 'Type your health question...'}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={startListening}
            disabled={isListening}
            className={`${isListening ? 'bg-medical text-white' : ''}`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className="bg-medical hover:bg-medical-accent"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {selectedLanguage === 'hi' 
            ? '⚠️ यह जानकारी केवल जागरूकता के लिए है। चिकित्सा सलाह के लिए डॉक्टर से सलाह लें।'
            : '⚠️ This information is for awareness only. Consult a doctor for medical advice.'
          }
        </div>
      </div>
    </Card>
  );
};

export default HealthChatbot;