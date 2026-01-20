
export interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'online' | 'onsite';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
