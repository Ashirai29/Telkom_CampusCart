import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Send, 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon,
  Paperclip,
  Smile
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  read: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  productTitle?: string;
  productImage?: string;
  isOnline: boolean;
}

interface ChatWindowProps {
  setCurrentPage: (page: string) => void;
  selectedConversationId?: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantName: 'Sarah Mitchell',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Is the textbook still available?',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    productTitle: 'Calculus: Early Transcendentals',
    productImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop',
    isOnline: true
  },
  {
    id: '2',
    participantName: 'Mike Johnson',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Thanks for the quick delivery!',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    productTitle: 'MacBook Pro 13" M1',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
    isOnline: false
  },
  {
    id: '3',
    participantName: 'Emma Davis',
    participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Can we meet tomorrow at the library?',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
    productTitle: 'Nike Air Force 1',
    productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    isOnline: true
  }
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: 'sarah',
      text: 'Hi! I\'m interested in your Calculus textbook. Is it still available?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
      read: true
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Yes, it\'s still available! It\'s in excellent condition with minimal highlighting.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      type: 'text',
      read: true
    },
    {
      id: '3',
      senderId: 'sarah',
      text: 'Great! Could you send me more photos of the inside pages?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'text',
      read: true
    },
    {
      id: '4',
      senderId: 'sarah',
      text: 'Is the textbook still available?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
      read: false
    }
  ],
  '2': [
    {
      id: '1',
      senderId: 'mike',
      text: 'Thanks for the quick delivery! The MacBook works perfectly.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
      read: true
    }
  ],
  '3': [
    {
      id: '1',
      senderId: 'emma',
      text: 'Hi! Are these shoes still available? They look perfect for my size.',
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
      type: 'text',
      read: true
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Yes they are! They\'re size 10 and in great condition.',
      timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000),
      type: 'text',
      read: true
    },
    {
      id: '3',
      senderId: 'emma',
      text: 'Perfect! Can we meet tomorrow at the library?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: 'text',
      read: false
    }
  ]
};

export function ChatWindow({ setCurrentPage, selectedConversationId }: ChatWindowProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(selectedConversationId || null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      read: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), message]
    }));

    setNewMessage('');

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate auto-response for demo
      const autoResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: conversations.find(c => c.id === selectedChat)?.participantName.toLowerCase().replace(' ', '') || 'user',
        text: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        type: 'text',
        read: false
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), autoResponse]
      }));
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h`;
    
    return date.toLocaleDateString();
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">Chat with buyers and sellers</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage('dashboard')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="bg-card border border-border rounded-2xl h-full">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-card-foreground">Conversations</h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${
                        selectedChat === conversation.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.participantAvatar} />
                            <AvatarFallback>
                              {conversation.participantName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-card"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">
                              {conversation.participantName}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs opacity-75 truncate">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs opacity-50 mt-1">
                            {formatTime(conversation.lastMessageTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="bg-card border border-border rounded-2xl h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedConversation.participantAvatar} />
                            <AvatarFallback>
                              {selectedConversation.participantName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {selectedConversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-card"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">
                            {selectedConversation.participantName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversation.isOnline ? 'Online' : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="rounded-xl">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-xl">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-xl">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Context */}
                    {selectedConversation.productTitle && (
                      <div className="mt-3 p-3 bg-accent rounded-xl">
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedConversation.productImage}
                            alt={selectedConversation.productTitle}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{selectedConversation.productTitle}</p>
                            <p className="text-xs text-muted-foreground">Discussing this item</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-2xl ${
                              message.senderId === 'me'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-accent text-accent-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 opacity-75`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-accent text-accent-foreground p-3 rounded-2xl">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 flex items-center space-x-2 bg-input-background rounded-xl px-3">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="border-0 bg-transparent focus-visible:ring-0"
                        />
                        <Button variant="ghost" size="sm">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}